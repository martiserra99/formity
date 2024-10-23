import { expry, Variables } from "expry";

import { ReturnSchema, ItemSchema } from "../../types/schema";
import { ReturnResult } from "../../types/result";

export const ReturnSchemaUtils = {
  is(schema: ItemSchema): schema is ReturnSchema {
    return "return" in schema;
  },

  result(schema: ReturnSchema, variables: Variables): ReturnResult {
    return {
      type: "return",
      return: expry(schema.return, variables) as ReturnResult["return"],
    };
  },
};
