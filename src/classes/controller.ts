import { Variables } from "Expry";

import { Components, Parameters } from "../types/components";
import { ListSchemaType } from "../types/schema";

import { ListSchema, FlowSchema } from "./schema";
import { Flow } from "./flow";
import { Position } from "../types/position";
import { Point } from "./point";
import { ListValues } from "./values";

export class Controller<T extends Parameters> {
  private schema: ListSchema;
  private components: Components<T>;

  constructor(schema: ListSchemaType, components: Components<T>) {
    this.schema = new ListSchema(schema);
    this.components = components;
  }

  initial(): Flow {
    const path = this.initialPath(this.schema);
    const point = new Point(path, {});
    this.toBreakpoint(point);
    return new Flow([], new ListValues());
  }

  private initialPath(schema: FlowSchema): Position[] {
    let position = schema.into({});
    while (position) {
      const path = this.initialPathFromPosition(schema, position);
      if (path) return path;
      position = schema.next(position, {});
    }
    return [];
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

  private toBreakpoint(point: Point): Point {
    // let nextPoint = point;
    // while (nextPoint instanceof PointVariables) {
    //   nextPoint = this.nextPointStep(nextPoint);
    // }
    // return nextPoint as PointStop;
    return point;
  }

  next(flow: Flow, variables: Variables): Flow {
    return flow;
  }

  previous(flow: Flow, variables: Variables): Flow {
    return flow;
  }
}
