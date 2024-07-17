import * as React from 'react';

import { ReactElement, useState, useMemo, useCallback } from 'react';

import { Components, Params } from './types/components';
import { FormProps, Render } from './types/form';

import { Schema } from './types/schema';
import { FormData } from './types/data';

import { getInitialState, getNextState, getPreviousState } from './utils/state';
import { getData } from './utils/data';

interface FormityProps<T extends Params, U extends Render> {
  components: Components<T>;
  form: (props: FormProps<U>) => ReactElement;
  schema: Schema;
  onSubmit: (data: unknown) => void;
}

export function Formity<T extends Params, U extends Render>({
  components,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const [state, setState] = useState(() => getInitialState(schema));

  const form = useMemo(() => getData(components, schema, state), [
    components,
    schema,
    state,
  ]) as FormData<U>;

  const handleSubmit = useCallback((formData: unknown) => {
    const nextState = getNextState(schema, state, formData);
    const data = getData(components, schema, nextState);
    if (data.type === 'return') onSubmit(data.return);
    else setState(nextState);
  }, []);

  const handleBack = useCallback((formData: unknown) => {
    const previousState = getPreviousState(schema, state, formData);
    setState(previousState);
  }, []);

  return (
    <Form
      defaultValues={form.defaultValues}
      resolver={form.resolver}
      render={form.render}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}
