import { Point } from "./point";
import { ListValues } from "./values";

import { Result } from "../types/result";

export class Flow {
  public result: Result;
  public points: Point[];
  public values: ListValues;

  constructor(points: Point[], values: ListValues) {
    this.points = points;
    this.values = values;
    this.result = this.getResult(points, values);
  }

  private getResult(points: Point[], values: ListValues): Result {
    return { type: "return", return: null };
  }
}
