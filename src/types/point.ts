import { Variables } from "expry";

import { Position } from "./position";

export type Point = {
  path: Position[];
  variables: Variables;
};
