import { StepResult } from "./result";
import { Point } from "./point";
import { ListFields } from "./fields";

export type Flow = {
  result: StepResult;
  points: Point[];
  fields: ListFields;
};
