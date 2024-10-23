import { Variables } from "expry";

import { StepSchema, ItemSchema } from "../../types/schema";
import { Result } from "../../types/result";

import { FormSchemaUtils } from "./step.form";
import { ReturnSchemaUtils } from "./step.return";

export const StepSchemaUtils = {
  is(schema: ItemSchema): schema is StepSchema {
    return FormSchemaUtils.is(schema) || ReturnSchemaUtils.is(schema);
  },

  result(schema: StepSchema, variables: Variables): Result {
    if (FormSchemaUtils.is(schema)) {
      return FormSchemaUtils.result(schema, variables);
    }
    if (ReturnSchemaUtils.is(schema)) {
      return ReturnSchemaUtils.result(schema, variables);
    }
    throw new Error("Invalid schema");
  },
};
