import { expry, Variables } from "expry";

import { ReturnSchema, ItemSchema } from "../../../../../types/new/schema";
import { ReturnResult } from "../../../../../types/new/flow/result";

export namespace ReturnSchemaUtils {
  export function is(schema: ItemSchema): schema is ReturnSchema {
    return "return" in schema;
  }

  export function getResult(schema: ReturnSchema, variables: Variables): ReturnResult {
    return { type: "return", return: expry(schema.return, variables) };
  }
}
