import { Expry } from 'expry';

import { Position } from './position';

export interface Point {
  path: Position[];
  vars: Record<string, Expry>;
}
