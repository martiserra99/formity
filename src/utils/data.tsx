import * as React from 'react';

import { UseFormProps } from 'react-hook-form';
import { ReactElement } from 'react';
import { expry, Expr, Vars } from 'expry';

import { Components, Params } from '../types/components';
import { Render } from '../types/form';

import { Data, FormData, ReturnData } from '../types/data';
import { Schema, FormSchema, ReturnSchema } from '../types/schema';
import { State } from '../types/state';
import { Step } from '../types/step';
import { Values } from '../types/values';

import { getValue } from './values';

type DefaultValuesSchema = Record<string, [unknown, (number | string)[]]>;

export function getData<T extends Params, U extends Render>(
  components: Components<T>,
  schema: Schema,
  state: State
): Data<U> {
  return getDataFromStep(
    components,
    schema,
    state.steps[state.steps.length - 1],
    state.values
  );
}

function getDataFromStep<T extends Params, U extends Render>(
  components: Components<T>,
  schema: Schema,
  step: Step,
  values: Values
): Data<U> {
  const item = getItemSchema(schema, step);
  const vars = step.vars;
  if ('return' in item) return getReturnData(item, vars);
  return getFormData(components, item, step, values);
}

function getItemSchema(schema: Schema, step: Step): FormSchema | ReturnSchema {
  console.log(schema, step);
  return { return: '' };
}

function getReturnData(schema: ReturnSchema, vars: Vars): ReturnData {
  console.log(schema, vars);
  return { type: 'return', return: '' };
}

function getFormData<T extends Params, U extends Render>(
  components: Components<T>,
  schema: FormSchema,
  step: Step,
  values: Values
): FormData<U> {
  return {
    type: 'form',
    defaultValues: getDefaultValues(schema.form.defaultValues, step, values),
    resolver: getResolver(schema.form.resolver, step.vars),
    render: getRender(components, schema.form.render, step.vars),
  };
}

function getDefaultValues(
  expr: Expr,
  step: Step,
  values: Values
): UseFormProps['defaultValues'] {
  const defaultValues = expry(expr, step.vars) as DefaultValuesSchema;
  return Object.fromEntries(
    Object.entries(defaultValues).map(([key, [data, deps]]) => [
      key,
      getValue(values, step.path, key, deps, data),
    ])
  );
  return {};
}

function getResolver(expr: Expr, vars: Vars): UseFormProps['resolver'] {
  console.log(expr, vars);
  return () => ({ values: {}, errors: {} });
}

function getRender<T extends Params, U extends Render>(
  components: Components<T>,
  expr: Expr,
  vars: Vars
): (values: U) => ReactElement {
  console.log(components, expr, vars);
  return () => <></>;
}
