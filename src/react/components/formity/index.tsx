import * as React from 'react';

import { Schema } from '../../../core/types/schema';

import { Components } from './components';
import { FormProps } from './form';

export { Components, FormProps };

interface FormityProps<T extends object, U extends object> {
  components: Components<T>;
  form: (props: FormProps<U>) => React.ReactElement;
  schema: Schema;
  onSubmit: (formData: object) => void;
}

export default function Formity<T extends object, U extends object>({
  components,
  form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  console.log(components, form, schema, onSubmit);
  return <>HOLA</>;
}
