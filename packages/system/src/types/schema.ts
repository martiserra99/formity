import type { Struct } from "./struct";

export type Schema<Render = unknown> = {
  render: Render;
  struct: Struct;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};
