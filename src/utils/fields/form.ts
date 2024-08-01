import { Value } from "expry";

import { FormFields } from "../../types/fields";

export namespace FormFieldsUtils {
  export function get(form: FormFields, name: string, keys: string[], defaultValue: Value): Value {
    let current = form[name];
    for (const key of keys) {
      if (key in current.keys) {
        current = current.keys[key];
      } else {
        return defaultValue;
      }
    }
    if (current.data === undefined) return defaultValue;
    return current.data;
  }

  export function set(form: FormFields, name: string, keys: string[], data: Value): FormFields {
    let updated =
      name in form
        ? { ...form, [name]: { data: form[name].data, keys: { ...form[name].keys } } }
        : { ...form, [name]: { data: undefined, keys: {} } };
    let current = updated[name];
    for (const key of keys) {
      if (key in current.keys) {
        const name = current.keys[key];
        const copy = { data: name.data, keys: { ...name.keys } };
        current.keys[key] = copy;
        current = copy;
      } else {
        const name = { data: undefined, keys: {} };
        current.keys[key] = name;
        current = name;
      }
    }
    current.data = data;
    return updated;
  }
}
