export type Values = ListValues;
export type FlowValues = ListValues | CondValues | LoopValues;
export type ListValues = { [key: number]: FlowValues | NameValues };
export type CondValues = {
  then: { [key: number]: FlowValues | NameValues };
  else: { [key: number]: FlowValues | NameValues };
};
export type LoopValues = { [key: number]: FlowValues | NameValues };
export type NameValues = { [key: string]: DepsValues };
export type DepsValues = {
  [key: string | number]: { data: unknown; deps: DepsValues };
};
