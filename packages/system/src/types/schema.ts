import type { Struct } from "./struct";

export type Schema = {
  render: unknown;
  struct: Struct;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};
