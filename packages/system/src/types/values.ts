export type ItemValues =
  | FlowValues
  | FormValues
  | YieldValues
  | ReturnValues
  | VariablesValues;

export type FlowValues = ListValues | CondValues | LoopValues;

export type ListValues = ItemValues[];

export type CondValues = {
  type: "cond";
  cond: {
    then: ListValues;
    else: ListValues;
  };
};

export type LoopValues = {
  type: "loop";
  loop: {
    do: ListValues;
  };
};

export type FormValues = {
  type: "form";
  form: object;
};

export type YieldValues = {
  type: "yield";
  yield: object;
};

export type ReturnValues = {
  type: "return";
  return: object;
};

export type VariablesValues = {
  type: "variables";
  variables: object;
};
