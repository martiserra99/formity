import { ListStruct, ItemStruct } from "../struct";

/**
 * Utility type that defines the structure of a condition element in a multi-step form.
 */
export type Condition<T extends { then: ListStruct; else: ListStruct }> = {
  type: "condition";
  condition: {
    then: T["then"];
    else: T["else"];
  };
};

/**
 * Utility type that defines the structure of a loop element in a multi-step form.
 */
export type Loop<T extends ListStruct> = {
  type: "loop";
  loop: {
    do: T;
  };
};

/**
 * Utility type that defines the structure of a switch element in a multi-step form.
 */
export type Switch<T extends { branches: ListStruct[]; default: ListStruct }> =
  {
    type: "switch";
    switch: {
      branches: T["branches"];
      default: T["default"];
    };
  };

/**
 * Utility type that defines the structure of a jump element in a multi-step form.
 */
export type Jump<T extends ItemStruct> = {
  type: "jump";
  jump: {
    at: T;
  };
};

/**
 * Utility type that defines the structure of a form element in a multi-step form.
 */
export type Form<T extends Record<string, unknown>> = {
  type: "form";
  form: {
    fields: T;
  };
};

/**
 * Utility type that defines the structure of a variables element in a multi-step form.
 */
export type Variables<T extends Record<string, unknown>> = {
  type: "variables";
  variables: T;
};

/**
 * Utility type that defines the structure of a yield element in a multi-step form.
 */
export type Yield<T extends { next: unknown[]; back: unknown[] }> = {
  type: "yield";
  yield: {
    next: T["next"];
    back: T["back"];
  };
};

/**
 * Utility type that defines the structure of a return element in a multi-step form.
 */
export type Return<T> = {
  type: "return";
  return: T;
};
