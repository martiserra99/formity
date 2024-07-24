import { Variables } from "expry";

import { Components, Parameters } from "../../types/new/components";
import { FlowSchema, ListSchema, StepSchema, FormSchema, VariablesSchema } from "../../types/new/schema";
import { Flow } from "../../types/new/flow/flow";
import { Point } from "../../types/new/flow/point";
import { Position } from "../../types/new/flow/position";
import { ListFields } from "../../types/new/flow/fields";

import { FlowSchemaUtils } from "./schema/flow";
import { StepSchemaUtils } from "./schema/step";
import { VariablesSchemaUtils } from "./schema/variables";

export class Controller<T extends Parameters> {
  constructor(private schema: ListSchema, private components: Components<T>) {}

  initial(): Flow {
    const path = this.initialPath(this.schema) as Position[];
    const point = this.nearestStopPoint({ path, variables: {} });
    const fields: ListFields = { type: "list", list: {} };
    const schema = FlowSchemaUtils.find(this.schema, point.path) as FormSchema;
    const result = StepSchemaUtils.getResult(schema, point.variables, this.components, fields, path);
    return { result, points: [point], fields };
  }

  private initialPath(schema: FlowSchema): Position[] | null {
    let position = FlowSchemaUtils.into(schema, {});
    while (position) {
      const path = this.initialPathFromPosition(schema, position);
      if (path) return path;
      position = FlowSchemaUtils.next(schema, position, {});
    }
    return null;
  }

  private initialPathFromPosition(schema: FlowSchema, position: Position): Position[] | null {
    const item = FlowSchemaUtils.find(schema, [position]);
    if (FlowSchemaUtils.is(item)) {
      const path = this.initialPath(item);
      if (path) return [position, ...path];
      else return null;
    }
    return [position];
  }

  next(flow: Flow, formData: Variables): Flow {
    // const values = this.updateValues(flow, formData);
    return this.navigateNext(flow, { type: "list", list: [] }, formData);
  }

  private navigateNext(flow: Flow, fields: ListFields, formData: Variables) {
    const last = flow.points[flow.points.length - 1];
    const vars = { ...last.variables, ...formData };
    const next = this.nearestStopPoint(this.nextPoint({ path: last.path, variables: vars }));
    const schema = FlowSchemaUtils.find(this.schema, next.path) as StepSchema;
    const result = StepSchemaUtils.getResult(schema, next.variables, this.components, fields, next.path);
    return { result, points: [...flow.points, next], fields };
  }

  previous(flow: Flow, _formData: Variables): Flow {
    // const values = this.updateValues(flow, formData);
    return this.navigatePrevious(flow, { type: "list", list: [] });
  }

  private navigatePrevious(flow: Flow, fields: ListFields) {
    const prev = flow.points.slice(0, -1);
    const last = prev[prev.length - 1];
    const schema = FlowSchemaUtils.find(this.schema, last.path) as FormSchema;
    const result = StepSchemaUtils.getResult(schema, last.variables, this.components, fields, last.path);
    return { result, points: prev, fields };
  }

  // private updateValues(flow: Flow, formData: Variables): FlowValues {
  //   const point = flow.points[flow.points.length - 1];
  //   const form = this.schema.find(point.path) as FormSchema<T>;
  //   const nameKeys = form.getNameKeys(point.variables);
  //   let values = flow.values;
  //   for (const [name, value] of Object.entries(formData)) {
  //     values = values.set(point.path, name, nameKeys(name), value);
  //   }
  //   return values;
  // }

  private nearestStopPoint(point: Point): Point {
    let current = point;
    while (VariablesSchemaUtils.is(FlowSchemaUtils.find(this.schema, current.path))) {
      const schema = FlowSchemaUtils.find(this.schema, current.path) as VariablesSchema;
      const variables = VariablesSchemaUtils.getVariables(schema, current.variables);
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
    return { path: point.path.slice(0, -1), variables: point.variables };
  }
}
