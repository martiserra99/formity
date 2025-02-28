import type { Point } from "./point";
import type { Inputs } from "./inputs";

/**
 * Represents the progression of steps completed in a multi-step form.
 *
 * @property points An array of `Point` objects. The last point in the array represents the current position with the associated values.
 * @property inputs An `Inputs` object that contains the values entered at each step of the form.
 */
export type State = {
  points: Point[];
  inputs: Inputs;
};
