import { Variables } from "expry";

import { Position } from "./position";

export type Step = {
  path: Position[];
  variables: Variables;
};
