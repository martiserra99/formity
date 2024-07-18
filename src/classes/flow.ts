import { Point } from "./point";
import { Values } from "./values";

import { RenderValues } from "../types/form";
import { Result } from "../types/result";

export class Flow<T extends RenderValues> {
  public points: Point[];
  public values: Values;
  public result: Result<T>;

  constructor() {
    this.points = [];
    this.values = new Values();
    this.result = { type: "return", return: null };
  }
}
