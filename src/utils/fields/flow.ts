import { Value } from "expry";
import { mapis } from "mapis";

import { ItemFields, FlowFields, FormFields } from "../../types/fields";
import { Position } from "../../types/position";

import { FormFieldsUtils } from "./form";

import { ListFieldsUtils } from "./flow.list";
import { CondFieldsUtils } from "./flow.cond";
import { LoopFieldsUtils } from "./flow.loop";

export namespace FlowFieldsUtils {
  export function get(flow: FlowFields, path: Position[], name: string, keys: string[], defaultValue: Value): Value {
    let current: ItemFields = flow;
    for (const position of path) {
      const flow = current as FlowFields;
      const element = getItem(flow, position);
      if (element === undefined) return defaultValue;
      current = element;
    }
    const form = current as FormFields;
    return FormFieldsUtils.get(form, name, keys, defaultValue);
  }

  export function set(flow: FlowFields, path: Position[], name: string, keys: string[], value: Value): FlowFields {
    let updated: FlowFields = clone(flow);
    let current: FlowFields = updated;
    for (let i = 0; i < path.length - 1; i++) {
      const position = path[i];
      const item = getItem(current, position);
      if (item) {
        const next = item as FlowFields;
        const cloned = clone(next);
        setItem(current, position, cloned);
        current = cloned;
      } else {
        const next = newFlow(position);
        setItem(current, position, next);
        current = next;
      }
    }
    const position = path[path.length - 1];
    const item = getItem(current, position);
    if (item) {
      const form = item as FormFields;
      setItem(current, position, FormFieldsUtils.set(form, name, keys, value));
    } else {
      const form: FormFields = { [name]: { data: undefined, keys: {} } };
      setItem(current, position, FormFieldsUtils.set(form, name, keys, value));
    }
    return updated;
  }

  const clone = mapis<FlowFields, [], ["type"], [], FlowFields>([], ["type"], {
    list: ListFieldsUtils.clone,
    cond: CondFieldsUtils.clone,
    loop: LoopFieldsUtils.clone,
  });

  const newFlow = mapis<Position, [], ["type"], [], FlowFields>([], ["type"], {
    list: ListFieldsUtils.newFlow,
    cond: CondFieldsUtils.newFlow,
    loop: LoopFieldsUtils.newFlow,
  });

  const getItem = mapis<FlowFields, [], ["type"], [Position], ItemFields | undefined>([], ["type"], {
    list: ListFieldsUtils.getItem,
    cond: CondFieldsUtils.getItem,
    loop: LoopFieldsUtils.getItem,
  });

  const setItem = mapis<FlowFields, [], ["type"], [Position, ItemFields], void>([], ["type"], {
    list: ListFieldsUtils.setItem,
    cond: CondFieldsUtils.setItem,
    loop: LoopFieldsUtils.setItem,
  });
}
