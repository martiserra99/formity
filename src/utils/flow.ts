import { Variables } from "expry";

import { Flow } from "../types/flow";

import { FormSchema, ListSchema } from "../types/schema";

import { FormSchemaUtils } from "./schema/step.form";
import { FlowSchemaUtils } from "./schema/flow";
import { FlowFields, ListFields } from "../types/fields";
import { FlowFieldsUtils } from "./fields/flow";

export namespace FlowUtils {
  export function getFlow(flow: Flow, schema: ListSchema, formData: Variables): Flow {
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
  }
}
