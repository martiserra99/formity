import { ReactElement } from 'react';
import { UseFormProps } from 'react-hook-form';

import { RenderValues } from './form';

export type Data<T extends RenderValues> = FormData<T> | ReturnData;

export type FormData<T extends RenderValues> = {
  type: 'form';
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
};

export type ReturnData = { type: 'return'; return: unknown };
