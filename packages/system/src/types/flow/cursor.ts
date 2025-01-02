/**
 * The `Cursor` type represents a specific position within a multi-step form
 * and its associated values. It provides the following properties:
 *
 * - `path`: An array of `Position` objects that define the position within the multi-step form.
 * - `values`: An object containing the data associated with the position.
 */

import type { Position } from "./position";

export type Cursor = {
  path: Position[];
  values: object;
};
