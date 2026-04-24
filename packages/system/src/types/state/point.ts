import type { Position } from "./position";

/**
 * Represents a specific position within a multi-step form and its associated inputs.
 *
 * @property path An array of `Position` objects that define the position within a multi-step form.
 * @property inputs An object containing the inputs associated with the position.
 */
export type Point = {
  path: Position[];
  inputs: Record<string, unknown>;
};
