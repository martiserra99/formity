import { UseFormProps } from 'react-hook-form';
import { ReactElement } from 'react';

export type RenderValues = Record<string, unknown>;

export interface FormProps<T extends RenderValues> {
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
  onSubmit: (formData: unknown) => void;
  onBack: (formData: unknown) => void;
}
