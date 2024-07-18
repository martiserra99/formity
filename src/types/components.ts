import { ReactElement } from 'react';

export type ComponentsParams = Record<string, Record<string, unknown>>;

export type Components<T extends ComponentsParams> = {
  [K in keyof T]: (
    values: T[K],
    render: (component: unknown) => ReactElement
  ) => ReactElement;
};
