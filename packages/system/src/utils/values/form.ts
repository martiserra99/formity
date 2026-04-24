import type { FormValues, NameValues } from "../../types/state/values";

/**
 * Returns a value from `FormValues` by name and key path, falling back to `defaultValue`.
 */
export function get(
  form: FormValues,
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown,
): unknown {
  let current: NameValues = form[name];
  for (const key of keys) {
    if (key in current.keys) {
      current = current.keys[key];
    } else {
      return defaultValue;
    }
  }
  if (current.data.here) {
    return current.data.data;
  }
  return defaultValue;
}

/**
 * Returns a new `FormValues` object with the value at the given name and keys set to `data`.
 */
export function set(
  form: FormValues,
  name: string,
  keys: PropertyKey[],
  data: unknown,
): FormValues {
  const updated: FormValues = { ...form };
  if (name in form) {
    updated[name] = { ...form[name], keys: { ...form[name].keys } };
  } else {
    updated[name] = { data: { here: false }, keys: {} };
  }
  let current: NameValues = updated[name];
  for (const key of keys) {
    if (key in current.keys) {
      const name: NameValues = current.keys[key];
      const copy: NameValues = { ...name, keys: { ...name.keys } };
      current.keys[key] = copy;
      current = copy;
    } else {
      const name: NameValues = { data: { here: false }, keys: {} };
      current.keys[key] = name;
      current = name;
    }
  }
  current.data = { here: true, data };
  return updated;
}
