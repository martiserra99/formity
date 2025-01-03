import { Cursor } from "./cursor";
import { ListEntries } from "./entries";

/**
 * Represents the progression of steps completed in a multi-step form.
 *
 * @property cursors An array of `Cursor` objects. The last cursor in the array represents the current position with the associated values.
 * @property entries A `ListEntries` object that contains the values entered at each step of the form.
 */
export type Flow = {
  cursors: Cursor[];
  entries: ListEntries;
};
