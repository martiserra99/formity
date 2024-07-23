import { Value } from "expry";

import {
  PathFields,
  FlowFields,
  ListFields,
  CondFields,
  LoopFields,
  FormFields,
  NameFields,
} from "../types/types/fields";
import { CondPosition, ListPosition, LoopPosition, Position } from "../types/position";

export namespace FlowFieldsUtils {
  export function getFieldValue(params: {
    flowFields: FlowFields;
    path: Position[];
    name: string;
    keys: string[];
  }): Value | undefined {
    const { flowFields, path, name, keys } = params;
    const formFields = FlowFieldsUtils.getFormFields({ flowFields, path });
    if (!formFields) return undefined;
    const nameFields = FormFieldsUtils.getNameFields({ formFields, name });
    if (!nameFields) return undefined;
    const fieldValue = NameFieldsUtils.getFieldValue({ nameFields, keys });
    if (!fieldValue) return undefined;
    return fieldValue;
  }

  export function getFormFields(params: { flowFields: FlowFields; path: Position[] }): FormFields | undefined {
    let current: PathFields = params.flowFields;
    for (const position of params.path) {
      const result = getPathFields({ flowFields: current as FlowFields, position });
      if (!result) return undefined;
      current = result;
    }
    return current as FormFields;
  }

  export function getPathFields(params: { flowFields: FlowFields; position: Position }): PathFields | undefined {
    const { flowFields, position } = params;
    if (flowFields[0] === "list") {
      return ListFieldsUtils.getPathFields({ listFields: flowFields, position: position as ListPosition });
    }
    if (flowFields[0] === "cond") {
      return CondFieldsUtils.getPathFields({ condFields: flowFields, position: position as CondPosition });
    }
    if (flowFields[0] === "loop") {
      return LoopFieldsUtils.getPathFields({ loopFields: flowFields, position: position as LoopPosition });
    }
    throw new Error("Invalid flow fields");
  }
}

namespace ListFieldsUtils {
  export function getPathFields(params: { listFields: ListFields; position: ListPosition }): PathFields | undefined {
    const { listFields, position } = params;
    const index = position[1];
    if (index in listFields[1]) listFields[1][index];
    return undefined;
  }
}

namespace CondFieldsUtils {
  export function getPathFields(params: { condFields: CondFields; position: CondPosition }): PathFields | undefined {
    const { condFields, position } = params;
    const [branch, index] = position[1];
    if (index in condFields[1][branch]) return condFields[1][branch][index];
    return undefined;
  }
}

namespace LoopFieldsUtils {
  export function getPathFields(params: { loopFields: LoopFields; position: LoopPosition }): PathFields | undefined {
    const { loopFields, position } = params;
    const index = position[1];
    if (index in loopFields[1]) return loopFields[1][index];
    return undefined;
  }
}

namespace FormFieldsUtils {
  export function getNameFields(params: { formFields: FormFields; name: string }): NameFields | undefined {
    const { formFields, name } = params;
    if (name in formFields) return formFields[name];
    return undefined;
  }
}

namespace NameFieldsUtils {
  export function getFieldValue(params: { nameFields: NameFields; keys: string[] }): Value | undefined {
    let current = params.nameFields;
    for (const key of params.keys) {
      if (key in current.keys) current = current.keys[key];
      else return undefined;
    }
    return current.data;
  }
}
