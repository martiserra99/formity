import { ReactElement } from 'react';
import { UseFormProps } from 'react-hook-form';

import { Render } from '../types';

export type Value<T extends Render> = FormValue<T> | ReturnValue;

export interface FormValue<T extends Render> {
  type: 'form';
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
}

export interface ReturnValue {
  type: 'return';
  return: unknown;
}
