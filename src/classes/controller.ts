import { ListSchemaType } from "../types/schema";
import { ComponentsType, ComponentsParams } from "../types/components";
import { FormData, FormRenderValues } from "../types/form";

import { ListSchema } from "./schema";
import { Components } from "./components";
import { Flow } from "./flow";

export class Controller<T extends ComponentsParams, U extends FormRenderValues> {
  private schema: ListSchema;
  private components: Components<T>;

  constructor(schema: ListSchemaType, components: ComponentsType<T>) {
    this.schema = new ListSchema(schema);
    this.components = new Components<T>(components);
  }

  initial(): Flow<U> {
    return new Flow();
  }

  next(flow: Flow<U>, data: FormData): Flow<U> {
    return flow;
  }

  previous(flow: Flow<U>, data: FormData): Flow<U> {
    return flow;
  }
}
