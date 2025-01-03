import type { Position } from "./position";

/**
 * Represents a specific position within a multi-step form and its associated values.
 *
 * @property path An array of `Position` objects that define the position within the multi-step form.
 * @property values An object containing the values associated with the position.
 */
export type Cursor = {
  path: Position[];
  values: object;
};
