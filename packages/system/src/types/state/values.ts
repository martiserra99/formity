/**
 * Values entered in the forms that are within a multi-step form.
 */
export type Values = ListValues;

/**
 * Union of `NestValues` and `FormValues`.
 */
export type ItemValues = NestValues | FormValues;

/**
 * Values entered in the forms that are within a nest element.
 */
export type NestValues =
  | ListValues
  | ConditionValues
  | LoopValues
  | SwitchValues
  | JumpValues;

/**
 * Values entered in the forms that are within a list.
 */
export type ListValues = {
  type: "list";
  list: { [position: number]: ItemValues };
};

/**
 * Values entered in the forms that are within a condition.
 */
export type ConditionValues = {
  type: "condition";
  then: { [position: number]: ItemValues };
  else: { [position: number]: ItemValues };
};

/**
 * Values entered in the forms that are within a loop.
 */
export type LoopValues = {
  type: "loop";
  list: { [position: number]: ItemValues };
};

/**
 * Values entered in the forms that are within a switch.
 */
export type SwitchValues = {
  type: "switch";
  branches: { [position: number]: { [position: number]: ItemValues } };
  default: { [position: number]: ItemValues };
};

/**
 * Values entered in the forms that are within a jump.
 */
export type JumpValues = {
  type: "jump";
  item: ItemValues | undefined;
};

/**
 * Values entered in a form.
 */
export type FormValues = { [key: string]: NameValues };

/**
 * Values entered in a single form field.
 */
export type NameValues = {
  data: { here: true; data: unknown } | { here: false };
  keys: { [key: PropertyKey]: NameValues };
};
