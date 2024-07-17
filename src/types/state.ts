import { Step } from './step';
import { ListDefaultValues } from './default-values';

export interface State {
  steps: Step[];
  defaultValues: ListDefaultValues;
}
