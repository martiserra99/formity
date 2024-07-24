import { Variables } from "expry";

import { StepSchema } from "../../../../types/new/schema";
import { StepResult } from "../../../../types/new/flow/result";
import { ListFields } from "../../../../types/new/flow/fields";
import { Position } from "../../../../types/new/flow/position";
import { Components, Parameters } from "../../../../types/new/components";

import { FormSchemaUtils } from "./form";
import { ReturnSchemaUtils } from "./return";

export namespace StepSchemaUtils {
  export function getState<T extends Parameters>(
    schema: StepSchema,
    variables: Variables,
    components: Components<T>,
    fields: ListFields,
    path: Position[]
  ): StepResult {
    if (FormSchemaUtils.is(schema)) return FormSchemaUtils.getState(schema, variables, components, fields, path);
    if (ReturnSchemaUtils.is(schema)) return ReturnSchemaUtils.getState(schema, variables);
    throw new Error("Invalid schema");
  }
}
