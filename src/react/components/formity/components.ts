import { Schema } from '../../../core/types/schema';

export type Components<T extends object> = {
  [K in keyof T]: (
    values: T[K],
    render: (schema: Schema) => React.ReactElement
  ) => React.ReactElement;
};
