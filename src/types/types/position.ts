export type Position = ListPosition | CondPosition | LoopPosition;
export type ListPosition = ["list", number];
export type CondPosition = ["cond", ["then" | "else", number]];
export type LoopPosition = ["loop", number];
