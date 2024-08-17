import { Variables } from "expry";

import { FlowSchema, ListSchema, StepSchema, FormSchema, VariablesSchema } from "../types/schema";
import { Flow } from "../types/flow";
import { Point } from "../types/point";
import { Position } from "../types/position";
import { FlowFields, ListFields } from "../types/fields";
import { FormResult } from "../types/result";

import { FlowSchemaUtils } from "../utils/schema/flow";
import { StepSchemaUtils } from "../utils/schema/step";
import { FormSchemaUtils } from "../utils/schema/step.form";
import { VariablesSchemaUtils } from "../utils/schema/variables";
import { FlowFieldsUtils } from "../utils/fields/flow";

export class Controller {
  constructor(private schema: ListSchema) {}

  initial(variables: Variables = {}): Flow {
    const path = this.initialPath();
    const stop = this.nearestStopPoint({ path, variables });
    const form = this.getForm(stop.path);
    const fields: ListFields = { type: "list", list: {} };
    const result: FormResult = StepSchemaUtils.result(form, stop.variables) as FormResult;
    return { result, points: [stop], fields };
  }

  private initialPath(): Position[] {
    const path = this.initialPathSchema(this.schema);
    if (path) return path;
    throw new Error("The schema is malformed");
  }

  private initialPathSchema(schema: FlowSchema): Position[] | null {
    let position = FlowSchemaUtils.into(schema, {});
    while (position) {
      const path = this.initialPathPosition(schema, position);
      if (path) return path;
      position = FlowSchemaUtils.next(schema, position, {});
    }
    return null;
  }

  private initialPathPosition(schema: FlowSchema, position: Position): Position[] | null {
    const item = FlowSchemaUtils.find(schema, [position]);
    if (FlowSchemaUtils.is(item)) {
      const path = this.initialPathSchema(item);
      if (path) return [position, ...path];
      else return null;
    }
    return [position];
  }

  private nearestStopPoint(point: Point): Point {
    let current = point;
    while (VariablesSchemaUtils.is(FlowSchemaUtils.find(this.schema, current.path))) {
      const schema = FlowSchemaUtils.find(this.schema, current.path) as VariablesSchema;
      const variables = VariablesSchemaUtils.variables(schema, current.variables);
      current = { path: current.path, variables: { ...current.variables, ...variables } };
      current = this.nextPoint(current);
    }
    return current;
  }

  private nextPoint(point: Point): Point {
    const selected = this.nextFlowPoint(point);
    if (selected) return selected;
    return this.nextPoint(this.parentPoint(point));
  }

  private nextFlowPoint(point: Point): Point | null {
    const next = this.nextFlowPointNext(point);
    if (next) {
      const into = this.nextFlowPointInto(next);
      if (into) return into;
      return this.nextFlowPoint(next);
    }
    return null;
  }

  private nextFlowPointNext(point: Point): Point | null {
    const flow = FlowSchemaUtils.find(this.schema, point.path.slice(0, -1)) as FlowSchema;
    const position = FlowSchemaUtils.next(flow, point.path[point.path.length - 1], point.variables);
    if (position) {
      const path = [...point.path.slice(0, -1), position];
      return { path, variables: point.variables };
    }
    return null;
  }

  private nextFlowPointInto(point: Point): Point | null {
    const item = FlowSchemaUtils.find(this.schema, point.path);
    if (FlowSchemaUtils.is(item)) {
      const position = FlowSchemaUtils.into(item, point.variables);
      if (position) {
        const path = [...point.path, position];
        const next = { path, variables: point.variables };
        const into = this.nextFlowPointInto(next);
        if (into) return into;
        return this.nextFlowPoint(next);
      }
      return null;
    }
    return point;
  }

  private parentPoint(point: Point): Point {
    if (point.path.length > 1) return { path: point.path.slice(0, -1), variables: point.variables };
    throw new Error("The schema is malformed");
  }

  private getForm(path: Position[]): FormSchema {
    const schema = FlowSchemaUtils.find(this.schema, path);
    if (FormSchemaUtils.is(schema)) return schema;
    throw new Error("The schema is malformed");
  }

  next(flow: Flow, formData: Variables): Flow {
    const fields = this.updateFields(flow, formData);
    return this.navigateNext(flow, fields, formData);
  }

  private updateFields(flow: Flow, formData: Variables): ListFields {
    const stop = flow.points[flow.points.length - 1];
    const form = FlowSchemaUtils.find(this.schema, stop.path) as FormSchema;
    const keys = FormSchemaUtils.keys(form, stop.variables);
    let fields = flow.fields as FlowFields;
    for (const [name, value] of Object.entries(formData)) {
      fields = FlowFieldsUtils.set(fields, stop.path, name, keys(name), value);
    }
    return fields as ListFields;
  }

  private navigateNext(flow: Flow, fields: ListFields, formData: Variables) {
    const last = flow.points[flow.points.length - 1];
    const vars = { ...last.variables, ...formData };
    const next = this.nearestStopPoint(this.nextPoint({ path: last.path, variables: vars }));
    const schema = FlowSchemaUtils.find(this.schema, next.path) as StepSchema;
    const result = StepSchemaUtils.result(schema, next.variables);
    return { result, points: [...flow.points, next], fields };
  }

  previous(flow: Flow, formData: Variables): Flow {
    const fields = this.updateFields(flow, formData);
    return this.navigatePrevious(flow, fields);
  }

  private navigatePrevious(flow: Flow, fields: ListFields): Flow {
    const prev = flow.points.slice(0, -1);
    const last = prev[prev.length - 1];
    const schema = FlowSchemaUtils.find(this.schema, last.path) as FormSchema;
    const result = StepSchemaUtils.result(schema, last.variables);
    return { result, points: prev, fields };
  }
}
