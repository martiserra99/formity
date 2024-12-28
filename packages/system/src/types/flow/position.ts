export type Position = ListPosition | CondPosition | LoopPosition;

export type ListPosition = {
  type: "list";
  slot: number;
};

export type CondPosition = {
  type: "cond";
  path: "then" | "else";
  slot: number;
};

export type LoopPosition = {
  type: "loop";
  slot: number;
};
