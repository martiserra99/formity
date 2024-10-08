import { Value } from "expry";

export type ItemFields = FlowFields | FormFields;

export type FlowFields = ListFields | CondFields | LoopFields;

export type ListFields = {
  type: "list";
  list: { [position: number]: ItemFields };
};

export type CondFields = {
  type: "cond";
  then: { [position: number]: ItemFields };
  else: { [position: number]: ItemFields };
};

export type LoopFields = {
  type: "loop";
  list: { [position: number]: ItemFields };
};

export type FormFields = { [key: string]: NameValues };

export type NameValues = {
  data: Value | null;
  keys: { [key: string]: NameValues };
};
