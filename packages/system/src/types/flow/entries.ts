/**
 * These types define the values entered at each step of a multi-step form.
 * They ensure that values are preserved when navigating back to a previously
 * completed step.
 */

export type ItemEntries = FlowEntries | FormEntries;

export type FlowEntries = ListEntries | CondEntries | LoopEntries;

export type ListEntries = {
  type: "list";
  list: { [position: number]: ItemEntries };
};

export type CondEntries = {
  type: "cond";
  then: { [position: number]: ItemEntries };
  else: { [position: number]: ItemEntries };
};

export type LoopEntries = {
  type: "loop";
  list: { [position: number]: ItemEntries };
};

export type FormEntries = { [key: string]: NameEntries };

export type NameEntries = {
  data: { here: true; data: unknown } | { here: false };
  keys: { [key: PropertyKey]: NameEntries };
};
