export type Position = ListPosition | CondPosition | LoopPosition;
export type ListPosition = number;
export type CondPosition = ['then' | 'else', number];
export type LoopPosition = number;
