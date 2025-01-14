import type { ItemSchema, SwitchSchema } from "../../types/schema/basic";
import type { Position, SwitchPosition } from "../../types/state/position";

/**
 * Type guard for `SwitchSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `SwitchSchema` object.
 */
export function is(schema: ItemSchema): schema is SwitchSchema {
  return "switch" in schema;
}

/**
 * Returns the initial position for the given `SwitchSchema` object if there is an initial position, otherwise it returns `null`.
 *
 * @param schema A `SwitchSchema` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(schema: SwitchSchema, values: object): Position | null {
  for (let i = 0; i < schema.switch.branches.length; i++) {
    const branch = schema.switch.branches[i];
    if (branch.case(values)) {
      if (branch.then.length > 0) {
        return { type: "switch", branch: i, slot: 0 };
      }
      return null;
    }
  }
  if (schema.switch.default.length > 0) {
    return { type: "switch", branch: -1, slot: 0 };
  }
  return null;
}

/**
 * Returns the next position for the given `SwitchSchema` object if there is a next position, otherwise it returns `null`.
 *
 * @param schema A `SwitchSchema` object.
 * @param position A `Position` object representing the current position.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(
  schema: SwitchSchema,
  position: Position
): Position | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (slot < schema.switch.branches[branch].then.length - 1) {
      return { type: "switch", branch, slot: slot + 1 };
    }
    return null;
  }
  if (slot < schema.switch.default.length - 1) {
    return { type: "switch", branch: -1, slot: slot + 1 };
  }
  return null;
}

/**
 * Returns the `ItemSchema` object at the given position within the given `SwitchSchema` object.
 *
 * @param schema The `SwitchSchema` object.
 * @param position The position within the `SwitchSchema` object.
 * @returns The `ItemSchema` object at the given position within the `SwitchSchema` object.
 */
export function at(schema: SwitchSchema, position: Position): ItemSchema {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    return schema.switch.branches[branch].then[slot];
  }
  return schema.switch.default[slot];
}
