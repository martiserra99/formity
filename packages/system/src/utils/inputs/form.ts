import type { FormInputs, NameInputs } from "../../types/state/inputs";

/**
 * Returns the value that is in the given `FormInputs` object using the following parameters:
 *
 * - `name`: The name of the value within the `FormInputs` object.
 * - `keys`: The list of keys that is used to access the value within the `FormInputs` object.
 * - `defaultValue`: The default value to return if the value is not found.
 *
 * @param form The `FormInputs` object.
 * @param name The name of the value within the `FormInputs` object.
 * @param keys The list of keys that is used to access the value within the `FormInputs` object.
 * @param defaultValue The default value to return if the value is not found.
 * @returns The value that is in the given `FormInputs` object or the default value if the value is not found.
 */
export function get(
  form: FormInputs,
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown
): unknown {
  let current: NameInputs = form[name];
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
 * Sets the value in the given `FormInputs` object using the following parameters:
 *
 * - `name`: The name of the value within the `FormInputs` object.
 * - `keys`: The list of keys that is used to access the value within the `FormInputs` object.
 * - `data`: The value to set.
 *
 * @param form The `FormInputs` object.
 * @param name The name of the value within the `FormInputs` object.
 * @param keys The list of keys that is used to access the value within the `FormInputs` object.
 * @param data The value to set.
 * @returns The updated `FormInputs` object.
 */
export function set(
  form: FormInputs,
  name: string,
  keys: PropertyKey[],
  data: unknown
): FormInputs {
  const updated: FormInputs = { ...form };
  if (name in form) {
    updated[name] = { ...form[name], keys: { ...form[name].keys } };
  } else {
    updated[name] = { data: { here: false }, keys: {} };
  }
  let current: NameInputs = updated[name];
  for (const key of keys) {
    if (key in current.keys) {
      const name: NameInputs = current.keys[key];
      const copy: NameInputs = { ...name, keys: { ...name.keys } };
      current.keys[key] = copy;
      current = copy;
    } else {
      const name: NameInputs = { data: { here: false }, keys: {} };
      current.keys[key] = name;
      current = name;
    }
  }
  current.data = { here: true, data };
  return updated;
}
