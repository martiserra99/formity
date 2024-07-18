import { Point } from "./point";
import { ListValues } from "./values";

import { FormRenderValues } from "../types/form";
import { Result } from "../types/result";

export class Flow<T extends FormRenderValues> {
  public points: Point[];
  public values: ListValues;
  public result: Result<T>;

  constructor() {
    this.points = [];
    this.values = new ListValues();
    this.result = { type: "return", return: null };
  }
}
