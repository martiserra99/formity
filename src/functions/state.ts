import { Schema } from '../types/schema';
import { State } from '../types/state';

import { getInitialStep, getNextStep } from './navigate';
import { setValues } from './values';

export function getInitialState(schema: Schema): State {
  return { steps: [getInitialStep(schema)], values: {} };
}

export function getNextState(
  schema: Schema,
  state: State,
  formData: unknown
): State {
  const step = state.steps[state.steps.length - 1];
  const values = state.values;
  return {
    steps: [...state.steps, getNextStep(schema, step, formData)],
    values: setValues(values, schema, step.path, formData),
  };
}

export function getPreviousState(
  schema: Schema,
  state: State,
  formData: unknown
): State {
  const step = state.steps[state.steps.length - 1];
  const values = state.values;
  return {
    steps: state.steps.slice(0, -1),
    values: setValues(values, schema, step.path, formData),
  };
}
