import type { FormMemory, NameMemory } from "../../types/state/memory";

/**
 * Returns a value from `FormMemory` by name and key path, falling back to `defaultValue`.
 */
export function get(
  form: FormMemory,
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown,
): unknown {
  let current: NameMemory = form[name];
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
 * Returns a new `FormMemory` object with the value at the given name and keys set to `data`.
 */
export function set(
  form: FormMemory,
  name: string,
  keys: PropertyKey[],
  data: unknown,
): FormMemory {
  const updated: FormMemory = { ...form };
  if (name in form) {
    updated[name] = { ...form[name], keys: { ...form[name].keys } };
  } else {
    updated[name] = { data: { here: false }, keys: {} };
  }
  let current: NameMemory = updated[name];
  for (const key of keys) {
    if (key in current.keys) {
      const name: NameMemory = current.keys[key];
      const copy: NameMemory = { ...name, keys: { ...name.keys } };
      current.keys[key] = copy;
      current = copy;
    } else {
      const name: NameMemory = { data: { here: false }, keys: {} };
      current.keys[key] = name;
      current = name;
    }
  }
  current.data = { here: true, data };
  return updated;
}
