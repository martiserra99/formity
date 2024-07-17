export type DefaultValues =
  | ListDefaultValues
  | CondDefaultValues
  | LoopDefaultValues;

export type ListDefaultValues = {
  [key: number]: DefaultValues | NameDefaultValues;
};

export type CondDefaultValues = {
  then: { [key: number]: DefaultValues | NameDefaultValues };
  else: { [key: number]: DefaultValues | NameDefaultValues };
};

export type LoopDefaultValues = {
  [key: number]: DefaultValues | NameDefaultValues;
};

export type NameDefaultValues = {
  [key: string]: DepsDefaultValues;
};

export type DepsDefaultValues = {
  [key: string | number]: { data: unknown; deps: DepsDefaultValues };
};
