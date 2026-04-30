export type Join<T extends Record<string, unknown>[]> = T extends [
  infer U,
  ...infer V extends Record<string, unknown>[],
]
  ? U & Join<V>
  : unknown;
