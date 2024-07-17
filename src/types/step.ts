import { Position } from './position';

export interface Step {
  path: Position[];
  vars: Record<string, unknown>;
}
