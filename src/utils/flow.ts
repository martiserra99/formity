import { Variables } from "expry";

import { Flow } from "../types/flow";

import { FormSchema, ListSchema, StepSchema } from "../types/schema";
import { FlowFields, ListFields } from "../types/fields";

import { StepSchemaUtils } from "./schema/step";
import { FlowSchemaUtils } from "./schema/flow";
import { FlowFieldsUtils } from "./fields/flow";
import { FormSchemaUtils } from "./schema/step.form";
import { Result } from "../types/result";

export const FlowUtils = {
  getResult(flow: Flow, schema: ListSchema): Result {
    const { path, variables } = flow.points[flow.points.length - 1];
    const nested = FlowSchemaUtils.find(schema, path) as StepSchema;
    return StepSchemaUtils.result(nested, variables);
  },

  getFlow(flow: Flow, schema: ListSchema, formData: Variables): Flow {
    const stop = flow.points[flow.points.length - 1];
    const path = stop.path;
    const variables = stop.variables;
    const form = FlowSchemaUtils.find(schema, path) as FormSchema;
    const keys = FormSchemaUtils.keys(form, variables);
    let fields = flow.fields as FlowFields;
    for (const [name, value] of Object.entries(formData)) {
      fields = FlowFieldsUtils.set(fields, path, name, keys(name), value);
    }
    return { ...flow, fields: fields as ListFields };
  },
};
