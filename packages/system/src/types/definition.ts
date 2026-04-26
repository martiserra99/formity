import type { Schema } from "./schema";

export type Definition = {
  render: unknown;
  schema: Schema;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};
