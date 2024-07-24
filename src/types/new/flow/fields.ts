import { Value } from "expry";

export type ElementFields = FlowFields | FormFields;

export type FlowFields = ListFields | CondFields;

export type ListFields = {
  type: "list";
  list: { [position: number]: ElementFields };
};

export type CondFields = {
  type: "cond";
  then: { [position: number]: ElementFields };
  else: { [position: number]: ElementFields };
};

export type FormFields = { [key: string]: NameValues };

export type NameValues = {
  data: Value | undefined;
  keys: { [key: string]: NameValues };
};
