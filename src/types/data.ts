import { ReactElement } from 'react';
import { UseFormProps } from 'react-hook-form';

import { Render } from './form';

export type Data<T extends Render> = FormData<T> | ReturnData;

export type FormData<T extends Render> = {
  type: 'form';
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
};

export type ReturnData = { type: 'return'; return: unknown };
