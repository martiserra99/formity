import { ListSchema } from '../types/schema';
import { State } from '../types/state';

export function getInitialState(schema: ListSchema): State {
  return {
    steps: [],
    defaultValues: {},
  };
}

export function getNextState(
  schema: ListSchema,
  state: State,
  data: unknown
): State {
  return state;
}

export function getPreviousState(
  schema: ListSchema,
  state: State,
  data: unknown
): State {
  return state;
}
