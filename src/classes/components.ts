import { ComponentsType, ComponentsParams } from "../types/components";

export class Components<T extends ComponentsParams> {
  constructor(components: ComponentsType<T>) {
    console.log(components);
  }
}
