export type Spot = ListSpot | CondSpot | LoopSpot;
export type ListSpot = ['list', number];
export type CondSpot = ['cond', ['then' | 'else', number]];
export type LoopSpot = ['loop', number];
