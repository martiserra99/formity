import { UseFormProps } from 'react-hook-form';
import { ReactElement } from 'react';
import { Expry } from 'expry';

export type Params = Record<string, Record<string, Expry>>;
export type Render = Record<string, unknown>;

export type Components<T extends Params> = {
  [K in keyof T]: (
    values: T[K],
    render: (component: Expry) => ReactElement
  ) => ReactElement;
};

export interface FormProps<T extends Render> {
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
  onSubmit: (data: unknown) => void;
  onBack: (data: unknown) => void;
}
