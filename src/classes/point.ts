import { Variables } from "expry";

import { Position } from "../types/position";

export class Point {
  public path: Position[];
  public variables: Variables;

  constructor(path: Position[], variables: Variables) {
    this.path = path;
    this.variables = variables;
  }

  get parentPath(): Position[] {
    return this.path.slice(0, -1);
  }
}
