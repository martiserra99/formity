// import { Point } from "./point";
// import { FlowValues } from "./values";

// import { Result } from "../types/result";

// export class Flow {

//   public result: Result;
//   public points: Point[];
//   public values: FlowValues;

//   constructor(result: Result, points: Point[], values: FlowValues) {
//     this.result = result;
//     this.points = points;
//     this.values = values;
//   }
// }

import { Form, Return } from "./state";
import { Step } from "./step";
import { ListFields } from "./fields";

export type Flow = {
  state: Form | Return;
  steps: Step[];
  fields: ListFields;
};
