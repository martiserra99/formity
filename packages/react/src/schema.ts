import type { ReactNode } from "react";
import type { Schema as SystemSchema, Values } from "@formity/system";

export type Schema<
  T extends Values,
  U extends object = object,
  V extends object = object
> = SystemSchema<ReactNode, T, U, V>;
