import * as React from 'react';

import { ReactElement, useState, useCallback } from 'react';

import { ListSchema } from '../../old/core/types/schema';

import Params from '../types/params';
import Values from '../types/values';

import Components from '../types/components';
import FormProps from '../types/form';
import { useMemo } from 'react';

interface State {}

interface Value {}

interface FormValue {}

interface FormValue {}

function getInitialState(schema: ListSchema): State {
  return {};
}

function getValue<T extends Params>(
  state: State,
  components: Components<T>
): Value {
  return {};
}

interface FormityProps<T extends Params, U extends Values> {
  components: Components<T>;
  form: (props: FormProps<U>) => ReactElement;
  schema: ListSchema;
  onSubmit: (data: unknown) => void;
}

export default function Formity<T extends Params, U extends Values>({
  components,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const [state, setState] = useState(() => getInitialState(schema));

  const form = useMemo(() => getValue(state, components), [
    state,
    components,
  ]) as FormValue<T, U>;

  const handleSubmit = useCallback((data: unknown) => {
    const state = getNextState(schema, data);
    const value = getValue(state);
    if (value.type === 'return') onSubmit(value.return);
    else setState(state);
  }, []);

  const handleBack = useCallback((data: unknown) => {
    setState(getBackState(data));
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
