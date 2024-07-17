import { Schema } from '../types/schema';
import { Step } from '../types/step';
import { Position } from '../types/position';

export function getInitialStep(schema: Schema): Step {
  return { path: getInitialPath(schema), vars: {} };
}

function getInitialPath(schema: Schema): Position[] {
  console.log('toInitialPath', schema);
  return [];
}

export function getNextStep(
  schema: Schema,
  step: Step,
  formData: unknown
): Step {
  console.log('getNextStep', schema, step, formData);
  return step;
}
