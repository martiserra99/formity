import { ListValues } from "./values";

/**
 * Utility type that defines the structure and values of a condition element in a multi-step form.
 */
export type Cond<Values extends { then: ListValues; else: ListValues }> = {
  type: "cond";
  cond: {
    then: Values["then"];
    else: Values["else"];
  };
};

/**
 * Utility type that defines the structure and values of a loop element in a multi-step form.
 */
export type Loop<Values extends ListValues> = {
  type: "loop";
  loop: {
    do: Values;
  };
};

/**
 * Utility type that defines the structure and values of a switch element in a multi-step form.
 */
export type Switch<
  Values extends { branches: ListValues[]; default: ListValues }
> = {
  type: "switch";
  switch: {
    branches: Values["branches"];
    default: Values["default"];
  };
};

/**
 * Utility type that defines the values of a form element in a multi-step form.
 */
export type Form<Values extends object> = {
  type: "form";
  form: Values;
};

/**
 * Utility type that defines the values of a yield element in a multi-step form.
 */
export type Yield<Values extends object> = {
  type: "yield";
  yield: Values;
};

/**
 * Utility type that defines the values of a return element in a multi-step form.
 */
export type Return<Values extends object> = {
  type: "return";
  return: Values;
};

/**
 * Utility type that defines the values of a variables element in a multi-step form.
 */
export type Variables<Values extends object> = {
  type: "variables";
  variables: Values;
};
