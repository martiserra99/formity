import { Expry } from 'expry';

import { Spot } from './spot';

export interface Point {
  path: Spot[];
  vars: Record<string, Expry>;
}
