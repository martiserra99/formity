import { expry, Variables } from "expry";

import { ReturnSchema, StepSchema } from "../../../../types/new/schema";
import { ReturnResult } from "../../../../types/new/flow/result";

export namespace ReturnSchemaUtils {
  export function is(schema: StepSchema): schema is ReturnSchema {
    return "return" in schema;
  }

  export function getState(schema: ReturnSchema, variables: Variables): ReturnResult {
    return { type: "return", return: expry(schema.return, variables) };
  }
}
