/**
 * The `Flow` type represents the progression of steps completed in a multi-step form.
 * It encapsulates the following properties:
 *
 * - `cursors`: An array of `Cursor` objects, each indicating a specific position in the
 * multi-step form along with its associated values. The last cursor in the array represents
 * the current position.
 * - `entries`: A `ListEntries` object that stores the values entered at each step of the form.
 */

import { Cursor } from "./cursor";
import { ListEntries } from "./entries";

export type Flow = {
  cursors: Cursor[];
  entries: ListEntries;
};
