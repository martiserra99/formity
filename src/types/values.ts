export type UnitValuesType = FlowValuesType | FormValuesType;

export type FlowValuesType = ListValuesType | CondValuesType | LoopValuesType;

export type ListValuesType = {
  type: "flow";
  flow: "list";
  data: { [key: number]: UnitValuesType };
};

export type CondValuesType = {
  type: "flow";
  flow: "cond";
  data: {
    then: { [key: number]: UnitValuesType };
    else: { [key: number]: UnitValuesType };
  };
};

export type LoopValuesType = {
  type: "flow";
  flow: "loop";
  data: { [key: number]: UnitValuesType };
};

export type FormValuesType = {
  type: "form";
  data: { [key: string]: NameValuesType };
};

export type NameValuesType = { value: Value | undefined; dependencies: { [key: Dependency]: NameValuesType } };

export type Value = unknown;

export type Dependency = string | number;
