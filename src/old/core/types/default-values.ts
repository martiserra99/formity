export type FlowDefaultValues =
  | ListDefaultValues
  | CondDefaultValues
  | LoopDefaultValues;

export type ListDefaultValues = {
  [key: number]: FlowDefaultValues | NameDefaultValues;
};

export type CondDefaultValues = {
  then: { [key: number]: FlowDefaultValues | NameDefaultValues };
  else: { [key: number]: FlowDefaultValues | NameDefaultValues };
};

export type LoopDefaultValues = {
  [key: number]: FlowDefaultValues | NameDefaultValues;
};

export type NameDefaultValues = {
  [key: string]: DepsDefaultValues;
};

export type DepsDefaultValues = {
  [key: string | number]: { data: unknown; deps: DepsDefaultValues };
};
