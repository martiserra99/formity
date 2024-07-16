import { Expry } from 'expry';

export interface FormValue {
  type: 'form';
  defaultValues: Record<string, Expry>;
  resolver: Record<string, [Expry, string][]>;
  render: Expry;
}

export interface ReturnValue {
  type: 'return';
  return: Expry;
}

export interface VariablesValue {
  type: 'variables';
  variables: Record<string, Expry>;
}
