import * as React from 'react';

import { ReactElement, useState, useMemo, useCallback } from 'react';

import { Params, Render, Components, FormProps } from './types';

import { ListSchema } from './types/schema';
import { FormValue } from './types/value';

import {
  getInitialState,
  getNextState,
  getPreviousState,
} from './utils/navigate';

import { getValue } from './utils/value';

interface FormityProps<T extends Params, U extends Render> {
  components: Components<T>;
  form: (props: FormProps<U>) => ReactElement;
  schema: ListSchema;
  onSubmit: (data: unknown) => void;
}

export function Formity<T extends Params, U extends Render>({
  components,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const [state, setState] = useState(() => getInitialState(schema));

  const form = useMemo(() => getValue(state, components), [
    state,
    components,
  ]) as FormValue<U>;

  const handleSubmit = useCallback((data: unknown) => {
    const nextState = getNextState(schema, state, data);
    const value = getValue(nextState, components);
    if (value.type === 'return') onSubmit(value.return);
    else setState(state);
  }, []);

  const handleBack = useCallback((data: unknown) => {
    const previousState = getPreviousState(schema, state, data);
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
