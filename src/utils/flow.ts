import { Variables } from "expry";

import { Flow } from "../types/flow";

import { FormSchema, ListSchema } from "../types/schema";
import { FlowFields, ListFields } from "../types/fields";

import { FlowFieldsUtils } from "./fields/flow/flow";
import { FormSchemaUtils } from "./schema/step/types/form";
import { FlowSchemaUtils } from "./schema/flow/flow";

export namespace FlowUtils {
  export function getFlow(flow: Flow, schema: ListSchema, formData: Variables): Flow {
    const point = flow.points[flow.points.length - 1];
    const path = point.path;
    const variables = point.variables;
    const form = FlowSchemaUtils.find(schema, path) as FormSchema;
    const nameKeys = FormSchemaUtils.nameKeys(form, variables);
    let current: FlowFields = flow.fields;
    for (const [name, value] of Object.entries(formData)) {
      current = FlowFieldsUtils.set(current, path, name, nameKeys(name), value);
    }
    return { ...flow, fields: current as ListFields };
  }
}
