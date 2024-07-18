import { ExpressionResult } from "expry";

import { ComponentsType, ComponentsParams } from "../types/components";
import { SchemaType } from "../types/schema";
import { RenderValues } from "../types/form";

import { Schema, ListSchema } from "./schema";
import { Components } from "./components";
import { Flow } from "./flow";

export class Controller<T extends ComponentsParams, U extends RenderValues> {
  private schema: Schema;
  private components: Components<T>;

  constructor(schema: SchemaType, components: ComponentsType<T>) {
    this.schema = new ListSchema(schema);
    this.components = new Components<T>(components);
  }

  initial(): Flow<U> {
    return new Flow();
  }

  next(flow: Flow<U>, data: ExpressionResult): Flow<U> {
    return flow;
  }

  previous(flow: Flow<U>, data: ExpressionResult): Flow<U> {
    return flow;
  }
}
