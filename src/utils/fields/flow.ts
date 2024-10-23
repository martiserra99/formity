import { Value } from "expry";
import { mapsy } from "mapsy";

import { ItemFields, FlowFields, FormFields } from "../../types/fields";
import { Position } from "../../types/position";

import { FormFieldsUtils } from "./form";

import { ListFieldsUtils } from "./flow.list";
import { CondFieldsUtils } from "./flow.cond";
import { LoopFieldsUtils } from "./flow.loop";

export const FlowFieldsUtils = {
  get(
    flow: FlowFields,
    path: Position[],
    name: string,
    keys: string[],
    defaultValue: Value
  ): Value {
    let current: ItemFields = flow;
    for (const position of path) {
      const flow = current as FlowFields;
      const item = this.getItem(flow, position);
      if (item === null) return defaultValue;
      current = item;
    }
    const form = current as FormFields;
    return FormFieldsUtils.get(form, name, keys, defaultValue);
  },

  set(
    flow: FlowFields,
    path: Position[],
    name: string,
    keys: string[],
    value: Value
  ): FlowFields {
    const updated: FlowFields = this.clone(flow);
    let current: FlowFields = updated;
    for (let i = 0; i < path.length - 1; i++) {
      const position = path[i];
      const item = this.getItem(current, position);
      if (item) {
        const next = item as FlowFields;
        const cloned = this.clone(next);
        this.setItem(current, position, cloned);
        current = cloned;
      } else {
        const next = this.createFlow(path[i + 1]);
        this.setItem(current, position, next);
        current = next;
      }
    }
    const position = path[path.length - 1];
    const item = this.getItem(current, position);
    if (item) {
      const form = item as FormFields;
      this.setItem(
        current,
        position,
        FormFieldsUtils.set(form, name, keys, value)
      );
    } else {
      const form: FormFields = { [name]: { data: null, keys: {} } };
      this.setItem(
        current,
        position,
        FormFieldsUtils.set(form, name, keys, value)
      );
    }
    return updated;
  },

  clone: mapsy<{
    object: FlowFields;
    nested: [];
    subset: ["type"];
    params: [];
    return: FlowFields;
  }>([], ["type"], {
    list: ListFieldsUtils.clone,
    cond: CondFieldsUtils.clone,
    loop: LoopFieldsUtils.clone,
  }),

  createFlow: mapsy<{
    object: Position;
    nested: [];
    subset: ["type"];
    params: [];
    return: FlowFields;
  }>([], ["type"], {
    list: ListFieldsUtils.createFlow,
    cond: CondFieldsUtils.createFlow,
    loop: LoopFieldsUtils.createFlow,
  }),

  getItem: mapsy<{
    object: FlowFields;
    nested: [];
    subset: ["type"];
    params: [Position];
    return: ItemFields | null;
  }>([], ["type"], {
    list: ListFieldsUtils.getItem,
    cond: CondFieldsUtils.getItem,
    loop: LoopFieldsUtils.getItem,
  }),

  setItem: mapsy<{
    object: FlowFields;
    nested: [];
    subset: ["type"];
    params: [Position, ItemFields];
    return: void;
  }>([], ["type"], {
    list: ListFieldsUtils.setItem,
    cond: CondFieldsUtils.setItem,
    loop: LoopFieldsUtils.setItem,
  }),
};
