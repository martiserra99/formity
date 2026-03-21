import { ListValues } from "./values";

/**
 * Utility type that defines the structure and values of a condition element in a multi-step form.
 */
export type Cond<T extends { then: ListValues; else: ListValues }> = {
  type: "cond";
  cond: {
    then: T["then"];
    else: T["else"];
  };
};

/**
 * Utility type that defines the structure and values of a loop element in a multi-step form.
 */
export type Loop<T extends ListValues> = {
  type: "loop";
  loop: {
    do: T;
  };
};

/**
 * Utility type that defines the structure and values of a switch element in a multi-step form.
 */
export type Switch<T extends { branches: ListValues[]; default: ListValues }> =
  {
    type: "switch";
    switch: {
      branches: T["branches"];
      default: T["default"];
    };
  };

/**
 * Utility type that defines the values of a form element in a multi-step form.
 */
export type Form<T extends Record<string, unknown>> = {
  type: "form";
  form: T;
};

/**
 * Utility type that defines the values of a yield element in a multi-step form.
 */
export type Yield<T extends { next: unknown[]; back: unknown[] }> = {
  type: "yield";
  yield: {
    next: T["next"];
    back: T["back"];
  };
};

/**
 * Utility type that defines the values of a return element in a multi-step form.
 */
export type Return<T> = {
  type: "return";
  return: T;
};

/**
 * Utility type that defines the values of a variables element in a multi-step form.
 */
export type Variables<T extends Record<string, unknown>> = {
  type: "variables";
  variables: T;
};
