export type Position = ListPosition | CondPosition | LoopPosition;

export type ListPosition = {
  type: "list";
  index: number;
};

export type CondPosition = {
  type: "cond";
  branch: "then" | "else";
  index: number;
};

export type LoopPosition = {
  type: "loop";
  index: number;
};
