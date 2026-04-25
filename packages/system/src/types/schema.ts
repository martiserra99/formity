/**
 * This type is meant to be extended and is used to define the structure of a multi-step form.
 */
export type Schema = ListSchema;

/**
 * This type is meant to be extended and is used to define the structure of an element in a multi-step form.
 */
export type ItemSchema =
  | NestSchema
  | FormSchema
  | VariablesSchema
  | YieldSchema
  | ReturnSchema;

/**
 * This type is meant to be extended and is used to define the structure of a nest element in a multi-step form.
 */
export type NestSchema =
  | ListSchema
  | ConditionSchema
  | LoopSchema
  | SwitchSchema
  | JumpSchema;

/**
 * This type is meant to be extended and is used to define the structure of a list element in a multi-step form.
 */
export type ListSchema = ItemSchema[];

/**
 * This type is meant to be extended and is used to define the structure of a condition element in a multi-step form.
 */
export type ConditionSchema = {
  type: "condition";
  condition: {
    then: ListSchema;
    else: ListSchema;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a loop element in a multi-step form.
 */
export type LoopSchema = {
  type: "loop";
  loop: {
    do: ListSchema;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a switch element in a multi-step form.
 */
export type SwitchSchema = {
  type: "switch";
  switch: {
    branches: ListSchema[];
    default: ListSchema;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a jump element in a multi-step form.
 */
export type JumpSchema = {
  type: "jump";
  jump: {
    at: FormSchema;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a form element in a multi-step form.
 */
export type FormSchema = {
  type: "form";
  form: {
    values: Record<string, unknown>;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a variables element in a multi-step form.
 */
export type VariablesSchema = {
  type: "variables";
  variables: Record<string, unknown>;
};

/**
 * This type is meant to be extended and is used to define the structure of a yield element in a multi-step form.
 */
export type YieldSchema = {
  type: "yield";
  yield: {
    next: unknown[];
    back: unknown[];
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a return element in a multi-step form.
 */
export type ReturnSchema = {
  type: "return";
  return: unknown;
};
