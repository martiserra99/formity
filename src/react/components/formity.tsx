import * as React from 'react';

import type { ListSchema } from '../../core/types/schema';

import { Flow } from '../../core/classes/flow';

import Params from '../types/params';
import Values from '../types/values';

import Components from '../types/components';
import FormProps from '../types/form';

interface FormityProps<T extends Params, U extends Values> {
  components: Components<T>;
  form: (props: FormProps<U>) => React.ReactElement;
  schema: ListSchema;
  onSubmit: (formData: object) => void;
}

export default function Formity<T extends Params, U extends Values>({
  components,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const flow = React.useState(() => new Flow(schema));
  return (
    <Form
      defaultValues={undefined}
      resolver={undefined}
      render={() => <></>}
      onSubmit={() => {}}
      onBack={() => {}}
    />
  );
}
