import { expry, Variables } from "expry";

import { ReturnSchema, ItemSchema } from "../../../../types/schema";
import { ReturnResult } from "../../../../types/result";

export namespace ReturnSchemaUtils {
  export function is(schema: ItemSchema): schema is ReturnSchema {
    return "return" in schema;
  }

  export function result(schema: ReturnSchema, variables: Variables): ReturnResult {
    return {
      type: "return",
      return: expry(schema.return, variables) as ReturnResult["return"],
    };
  }
}
