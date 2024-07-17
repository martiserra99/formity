import { ReactElement } from 'react';

export type Params = Record<string, Record<string, unknown>>;

export type Components<T extends Params> = {
  [K in keyof T]: (
    values: T[K],
    render: (component: unknown) => ReactElement
  ) => ReactElement;
};
