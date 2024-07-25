import { Result } from "./result";
import { Point } from "./point";
import { ListFields } from "./fields";

export type Flow = {
  result: Result;
  points: Point[];
  fields: ListFields;
};
