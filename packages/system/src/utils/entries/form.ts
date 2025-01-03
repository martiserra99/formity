import type { FormEntries, NameEntries } from "../../types/flow/entries";

/**
 * Returns the value that is in the given `FormEntries` object using the following parameters:
 *
 * - `name`: The name of the value within the `FormEntries` object.
 * - `keys`: The list of keys that is used to access the value within the `FormEntries` object.
 * - `defaultValue`: The default value to return if the value is not found.
 *
 * @param form The `FormEntries` object.
 * @param name The name of the value within the `FormEntries` object.
 * @param keys The list of keys that is used to access the value within the `FormEntries` object.
 * @param defaultValue The default value to return if the value is not found.
 * @returns The value that is in the given `FormEntries` object or the default value if the value is not found.
 */
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

/**
 * Sets the value in the given `FormEntries` object using the following parameters:
 *
 * - `name`: The name of the value within the `FormEntries` object.
 * - `keys`: The list of keys that is used to access the value within the `FormEntries` object.
 * - `data`: The value to set.
 *
 * @param form The `FormEntries` object.
 * @param name The name of the value within the `FormEntries` object.
 * @param keys The list of keys that is used to access the value within the `FormEntries` object.
 * @param data The value to set.
 * @returns The updated `FormEntries` object.
 */
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
