/**
 * Field values entered in the forms that are within a multi-step form.
 */
export type Memory = ListMemory;

/**
 * Union of `NestMemory` and `FormMemory`.
 */
export type ItemMemory = NestMemory | FormMemory;

/**
 * Field values entered in the forms that are within a nest element.
 */
export type NestMemory =
  | ListMemory
  | ConditionMemory
  | LoopMemory
  | SwitchMemory
  | JumpMemory;

/**
 * Field values entered in the forms that are within a list.
 */
export type ListMemory = {
  type: "list";
  list: { [position: number]: ItemMemory };
};

/**
 * Field values entered in the forms that are within a condition.
 */
export type ConditionMemory = {
  type: "condition";
  then: { [position: number]: ItemMemory };
  else: { [position: number]: ItemMemory };
};

/**
 * Field values entered in the forms that are within a loop.
 */
export type LoopMemory = {
  type: "loop";
  do: { [position: number]: ItemMemory };
};

/**
 * Field values entered in the forms that are within a switch.
 */
export type SwitchMemory = {
  type: "switch";
  branches: { [position: number]: { [position: number]: ItemMemory } };
  default: { [position: number]: ItemMemory };
};

/**
 * Field values entered in the forms that are within a jump.
 */
export type JumpMemory = {
  type: "jump";
  at: ItemMemory | undefined;
};

/**
 * Field values entered in a form.
 */
export type FormMemory = { [key: string]: NameMemory };

/**
 * Field values entered in a single form field.
 */
export type NameMemory = {
  data: { here: true; data: unknown } | { here: false };
  keys: { [key: PropertyKey]: NameMemory };
};
