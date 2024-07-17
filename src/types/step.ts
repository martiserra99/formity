import { Position } from '../old/core/types/position';

export interface Step {
  path: Position[];
  vars: Record<string, unknown>;
}
