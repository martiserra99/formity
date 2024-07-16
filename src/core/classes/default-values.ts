import { Expry } from 'expry';
import { Spot } from '../types/spot';

export class DefaultValues {
  constructor() {}

  set(path: Spot[], name: string, deps: Expry[], value: Expry) {
    return null as any;
  }

  get(path: Spot[], name: string, deps: Expry[]): Expry {
    return null as any;
  }
}
