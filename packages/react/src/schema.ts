import type { ReactNode } from "react";
import type { Schema as SystemSchema, Values } from "@formity/system";

/**
 * Defines the structure and behavior of a multi-step form.
 */
export type Schema<
  T extends Values,
  U extends object = object,
  V extends object = object
> = SystemSchema<ReactNode, T, U, V>;
