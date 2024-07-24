import { Variables } from "expry";

import { StepSchema, ItemSchema } from "../../../../types/new/schema";
import { StepResult } from "../../../../types/new/flow/result";
import { ListFields } from "../../../../types/new/flow/fields";
import { Position } from "../../../../types/new/flow/position";
import { Components, Parameters } from "../../../../types/new/components";

import { FormSchemaUtils } from "./form";
import { ReturnSchemaUtils } from "./return";

export namespace StepSchemaUtils {
  export function is(schema: ItemSchema): schema is StepSchema {
    return FormSchemaUtils.is(schema) || ReturnSchemaUtils.is(schema);
  }

  export function getResult<T extends Parameters>(
    schema: StepSchema,
    variables: Variables,
    components: Components<T>,
    fields: ListFields,
    path: Position[]
  ): StepResult {
    if (FormSchemaUtils.is(schema)) return FormSchemaUtils.getResult(schema, variables, components, fields, path);
    if (ReturnSchemaUtils.is(schema)) return ReturnSchemaUtils.getResult(schema, variables);
    throw new Error("Invalid schema");
  }
}
