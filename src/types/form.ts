import { UseFormProps } from 'react-hook-form';
import { ReactElement } from 'react';

export type Render = Record<string, unknown>;

export interface FormProps<T extends Render> {
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
  onSubmit: (data: unknown) => void;
  onBack: (data: unknown) => void;
}
