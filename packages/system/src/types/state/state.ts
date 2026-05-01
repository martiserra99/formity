import type { Point } from "./point";
import type { Memory } from "./memory";

/**
 * Represents the progression of steps completed in a multi-step form.
 *
 * @property points An array of `Point` objects. The last point in the array represents the current position with the associated values.
 * @property memory An object that contains the field values entered at each step of the form.
 */
export type State = {
  points: Point[];
  memory: Memory;
};
