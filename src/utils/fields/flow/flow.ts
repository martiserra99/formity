import { Value } from "expry";
import { mapis } from "mapis";

import { ItemFields, FlowFields, FormFields } from "../../../types/fields";
import { Position } from "../../../types/position";

import { PositionUtils } from "../../position/position";

import { FormFieldsUtils } from "../form";

import { ListFieldsUtils } from "./types/list";
import { CondFieldsUtils } from "./types/cond";
import { LoopFieldsUtils } from "./types/loop";

export namespace FlowFieldsUtils {
  export function get(flow: FlowFields, path: Position[], name: string, keys: string[], defaultValue: Value): Value {
    let current: ItemFields = flow;
    for (const position of path) {
      const flow = current as FlowFields;
      const element = getItemFields(flow, position);
      if (element === undefined) return defaultValue;
      current = element;
    }
    const form = current as FormFields;
    return FormFieldsUtils.get(form, name, keys, defaultValue);
  }

  export function set(flow: FlowFields, path: Position[], name: string, keys: string[], value: Value): FlowFields {
    let updated: FlowFields = copy(flow);
    let current: FlowFields = updated;
    for (let i = 0; i < path.length - 1; i++) {
      const position = path[i];
      const element = getItemFields(current, position);
      if (element) {
        const next = element as FlowFields;
        const copyNext = copy(next);
        setItemFields(current, position, copyNext);
        current = copyNext;
      } else {
        const next: FlowFields = PositionUtils.createFlowFields(position);
        setItemFields(current, position, next);
        current = next;
      }
    }
    const position = path[path.length - 1];
    const element = getItemFields(current, position);
    if (element) {
      const form = element as FormFields;
      setItemFields(current, position, FormFieldsUtils.set(form, name, keys, value));
    } else {
      const form: FormFields = { [name]: { data: undefined, keys: {} } };
      setItemFields(current, position, FormFieldsUtils.set(form, name, keys, value));
    }
    return updated;
  }

  const copy = mapis<FlowFields, [], ["type"], [], FlowFields>([], ["type"], {
    list: ListFieldsUtils.clone,
    cond: CondFieldsUtils.clone,
    loop: LoopFieldsUtils.clone,
  });

  const getItemFields = mapis<FlowFields, [], ["type"], [Position], ItemFields | undefined>([], ["type"], {
    list: ListFieldsUtils.getItemFields,
    cond: CondFieldsUtils.getItemFields,
    loop: LoopFieldsUtils.getItemFields,
  });

  const setItemFields = mapis<FlowFields, [], ["type"], [Position, ItemFields], void>([], ["type"], {
    list: ListFieldsUtils.setItemFields,
    cond: CondFieldsUtils.setItemFields,
    loop: LoopFieldsUtils.setItemFields,
  });
}
