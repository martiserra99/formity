import { Expry } from 'expry';
import { Position } from '../types/position';

export class DefaultValues {
  constructor() {}

  set(path: Position[], name: string, deps: Expry[], value: Expry) {
    return null as any;
  }

  get(path: Position[], name: string, deps: Expry[]): Expry {
    return null as any;
  }
}
