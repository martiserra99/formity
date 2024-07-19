import { Point } from "./point";
import { ListValues } from "./values";

import { Result } from "../types/result";

export class Flow {
  public result: Result;
  public points: Point[];
  public values: ListValues;

  constructor(result: Result, points: Point[], values: ListValues) {
    this.result = result;
    this.points = points;
    this.values = values;
  }
}
