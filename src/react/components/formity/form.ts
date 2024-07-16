import { DefaultValues, Resolver } from 'react-hook-form';

export interface FormProps<T extends object> {
  defaultValues: DefaultValues<object>;
  resolver: Resolver;
  render: (values: T) => React.ReactElement;
  onSubmit: (formData: object) => void;
  onBack: () => void;
}
