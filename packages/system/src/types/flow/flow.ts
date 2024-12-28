import { Cursor } from "./cursor";
import { ListEntries } from "./entries";

export type Flow = {
  cursors: Cursor[];
  entries: ListEntries;
};
