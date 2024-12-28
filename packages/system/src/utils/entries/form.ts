import type { FormEntries, NameEntries } from "../../types/flow/entries";

export function get(
  form: FormEntries,
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown
): unknown {
  let current: NameEntries = form[name];
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

export function set(
  form: FormEntries,
  name: string,
  keys: PropertyKey[],
  data: unknown
): FormEntries {
  const updated: FormEntries = { ...form };
  if (name in form) {
    updated[name] = { ...form[name], keys: { ...form[name].keys } };
  } else {
    updated[name] = { data: { here: false }, keys: {} };
  }
  let current: NameEntries = updated[name];
  for (const key of keys) {
    if (key in current.keys) {
      const name: NameEntries = current.keys[key];
      const copy: NameEntries = { ...name, keys: { ...name.keys } };
      current.keys[key] = copy;
      current = copy;
    } else {
      const name: NameEntries = { data: { here: false }, keys: {} };
      current.keys[key] = name;
      current = name;
    }
  }
  current.data = { here: true, data };
  return updated;
}
