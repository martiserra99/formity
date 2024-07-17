import type { UseFormProps } from 'react-hook-form';
import type { ReactElement } from 'react';

import Values from './values';

interface FormProps<T extends Values> {
  defaultValues: UseFormProps['defaultValues'];
  resolver: UseFormProps['resolver'];
  render: (values: T) => ReactElement;
  onSubmit: (data: unknown) => void;
  onBack: () => void;
}

export default FormProps;
