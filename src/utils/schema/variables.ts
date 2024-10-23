import { expry, Variables } from "expry";

import { VariablesSchema, ItemSchema } from "../../types/schema";

export const VariablesSchemaUtils = {
  is(schema: ItemSchema): schema is VariablesSchema {
    return "variables" in schema;
  },

  variables(schema: VariablesSchema, variables: Variables): Variables {
    return expry(schema.variables, variables) as Variables;
  },
};
