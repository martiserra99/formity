import { Expry } from 'expry';
import { ReactElement } from 'react';

export interface FormValue<T extends Record<string, unknown>> {
  type: 'form';
  defaultValues: Record<string, unknown>;
  resolver: Record<string, [Expry, string][]>;
  render: (values: T) => ReactElement;
}

export interface ReturnValue {
  type: 'return';
  return: unknown;
}
