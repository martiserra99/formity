import { ExpressionVariables } from "expry";

import { Position } from "../types/position";

export class Point {
  public path: Position[];
  public variables: ExpressionVariables;

  constructor(path: Position[], variables: ExpressionVariables) {
    this.path = path;
    this.variables = variables;
  }

  get parentPath(): Position[] {
    return this.path.slice(0, -1);
  }
}
