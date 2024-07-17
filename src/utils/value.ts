import { Components, Params, Render } from '../types';
import { State } from '../types/state';
import { Value } from '../types/value';

export function getValue<T extends Params, U extends Render>(
  state: State,
  components: Components<T>
): Value<U> {
  return { type: 'return', return: {} };
}
