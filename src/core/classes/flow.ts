import { Expry } from 'expry';

import { Schema } from '../types/schema';
import { Point } from '../types/point';
import { FormValue, ReturnValue } from '../types/value';

import { DefaultValues } from './default-values';

export class Flow {
  private schema: Schema;
  private points: Point[];
  private defaultValues: DefaultValues;

  constructor(schema: Schema) {
    this.schema = schema;
    this.points = [];
    this.defaultValues = new DefaultValues();
  }

  initial(): FormValue {
    return null as any;
  }

  next(values: Record<string, Expry>): FormValue | ReturnValue {
    return null as any;
  }

  back(values: Record<string, Expry>): FormValue | ReturnValue {
    return null as any;
  }
}
