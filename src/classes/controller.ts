import { Variables } from "Expry";

import { Components, Parameters } from "../types/components";
import { ListSchemaType } from "../types/schema";

import { ListSchema, FlowSchema, VariablesSchema, FormSchema, StopSchema } from "./schema";
import { Flow } from "./flow";
import { Position } from "../types/position";
import { Point } from "./point";
import { FlowValues, ListValues } from "./values";

export class Controller<T extends Parameters> {
  private schema: ListSchema;
  private components: Components<T>;

  constructor(schema: ListSchemaType, components: Components<T>) {
    this.schema = new ListSchema(schema);
    this.components = components;
  }

  initial(): Flow {
    const path = this.initialPath(this.schema) as Position[];
    const point = this.nearestStopPoint(new Point(path, {}));
    const values = new ListValues();
    const schema = this.schema.find(point.path) as FormSchema<T>;
    const result = schema.getResult(point.variables, this.components, values, path);
    return new Flow(result, [point], values);
  }

  private initialPath(schema: FlowSchema): Position[] | null {
    let position = schema.into({});
    while (position) {
      const path = this.initialPathFromPosition(schema, position);
      if (path) return path;
      position = schema.next(position, {});
    }
    return null;
  }

  private initialPathFromPosition(schema: FlowSchema, position: Position): Position[] | null {
    const unit = schema.find([position]);
    if (unit instanceof FlowSchema) {
      const path = this.initialPath(unit);
      if (path) return [position, ...path];
      else return null;
    }
    return [position];
  }

  next(flow: Flow, formData: Variables): Flow {
    const values = this.updateValues(flow, formData);
    return this.navigateNext(flow, values, formData);
  }

  private navigateNext(flow: Flow, values: FlowValues, formData: Variables) {
    const last = flow.points[flow.points.length - 1];
    const vars = { ...last.variables, ...formData };
    const next = this.nearestStopPoint(this.nextPoint(new Point(last.path, vars)));
    const schema = this.schema.find(next.path) as StopSchema<T>;
    const result = schema.getResult(next.variables, this.components, values, next.path);
    return new Flow(result, [...flow.points, next], values);
  }

  previous(flow: Flow, formData: Variables): Flow {
    const values = this.updateValues(flow, formData);
    return this.navigatePrevious(flow, values);
  }

  private navigatePrevious(flow: Flow, values: FlowValues) {
    const previous = flow.points.slice(0, -1);
    const last = previous[previous.length - 1];
    const schema = this.schema.find(last.path) as FormSchema<T>;
    const result = schema.getResult(last.variables, this.components, values, last.path);
    return new Flow(result, previous, values);
  }

  private updateValues(flow: Flow, formData: Variables): FlowValues {
    const point = flow.points[flow.points.length - 1];
    const form = this.schema.find(point.path) as FormSchema<T>;
    const nameKeys = form.getNameKeys(point.variables);
    let values = flow.values;
    for (const [name, value] of Object.entries(formData)) {
      values = values.set(point.path, name, nameKeys(name), value);
    }
    return values;
  }

  private nearestStopPoint(point: Point): Point {
    let selected = point;
    while (this.schema.find(selected.path) instanceof VariablesSchema) {
      const step = this.schema.find(selected.path) as VariablesSchema;
      const variables = step.getVariables(selected.variables);
      selected = new Point(selected.parentPath, { ...selected.variables, ...variables });
      selected = this.nextPoint(selected);
    }
    return selected;
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
    const flow = this.schema.find(point.parentPath) as FlowSchema;
    const position = flow.next(point.position, point.variables);
    if (position) {
      const path = [...point.parentPath, position];
      return new Point(path, point.variables);
    }
    return null;
  }

  private nextFlowPointInto(point: Point): Point | null {
    const unit = this.schema.find(point.path);
    if (unit instanceof FlowSchema) {
      const position = unit.into(point.variables);
      if (position) {
        const path = [...point.path, position];
        const next = new Point(path, point.variables);
        const into = this.nextFlowPointInto(next);
        if (into) return into;
        return this.nextFlowPoint(next);
      }
      return null;
    }
    return point;
  }

  private parentPoint(point: Point): Point {
    return new Point(point.parentPath, point.variables);
  }
}
