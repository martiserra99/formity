import { Position, ListPosition, CondPosition, LoopPosition } from "../types/position";

import {
  UnitValuesType,
  FlowValuesType,
  ListValuesType,
  CondValuesType,
  LoopValuesType,
  FormValuesType,
  NameValuesType,
  Dependency,
  Value,
} from "../types/values";

export abstract class UnitValues<T extends UnitValuesType = UnitValuesType> {
  protected values: T;

  constructor(values: T) {
    this.values = values;
  }

  static create(values: UnitValuesType): UnitValues {
    if (FlowValues.is(values)) return FlowValues.create(values);
    if (FormValues.is(values)) return FormValues.create(values);
    throw new Error("Invalid values");
  }
}

export abstract class FlowValues<T extends FlowValuesType = FlowValuesType> extends UnitValues<T> {
  constructor(values: T) {
    super(values);
  }

  static create(values: FlowValuesType): FlowValues {
    if (ListValues.is(values)) return new ListValues(values);
    if (CondValues.is(values)) return new CondValues(values);
    if (LoopValues.is(values)) return new LoopValues(values);
    throw new Error("Invalid values");
  }

  static is(values: UnitValuesType): values is FlowValuesType {
    return values.type === "flow";
  }

  getValue(path: Position[], name: string, dependencies: Dependency[], defaultValue: Value): Value {
    const formValues = this.getFormValues(path);
    return formValues.getValue(name, dependencies, defaultValue);
  }

  protected getFormValues(path: Position[]): FormValues {
    return path.reduce((values: UnitValues, position: Position) => {
      const flow = values as FlowValues;
      return flow.getDirectValues(position);
    }, this) as FormValues;
  }

  protected abstract getDirectValues(position: Position): UnitValues;
}

export class ListValues extends FlowValues<ListValuesType> {
  constructor(values: ListValuesType) {
    super(values);
  }

  static is(values: FlowValuesType): values is ListValuesType {
    return values.flow === "list";
  }

  protected getDirectValues(position: ListPosition): UnitValues {
    const [_, index] = position;
    return UnitValues.create(this.values.data[index]);
  }
}

export class CondValues extends FlowValues<CondValuesType> {
  constructor(values: CondValuesType) {
    super(values);
  }

  static is(values: FlowValuesType): values is CondValuesType {
    return values.flow === "cond";
  }

  protected getDirectValues(position: CondPosition): UnitValues {
    const [_, [branch, index]] = position;
    return UnitValues.create(this.values.data[branch][index]);
  }
}

export class LoopValues extends FlowValues<LoopValuesType> {
  constructor(values: LoopValuesType) {
    super(values);
  }

  static is(values: FlowValuesType): values is LoopValuesType {
    return values.flow === "loop";
  }

  protected getDirectValues(position: LoopPosition): UnitValues {
    const [_, index] = position;
    return UnitValues.create(this.values.data[index]);
  }
}

export class FormValues extends UnitValues<FormValuesType> {
  constructor(values: FormValuesType) {
    super(values);
  }

  static create(values: FormValuesType): FormValues {
    return new FormValues(values);
  }

  static is(values: UnitValuesType): values is FormValuesType {
    return values.type === "form";
  }

  getValue(name: string, dependencies: Dependency[], defaultValue: Value): Value {
    const nameValues = this.getNameValues(name);
    return nameValues.getValue(dependencies, defaultValue);
  }

  setValue(name: string, dependencies: Dependency[], value: Value): FormValues {
    const nameValues = this.getNameValues(name);
    return new FormValues({ ...this.values });
  }

  protected getNameValues(name: string): NameValues {
    return new NameValues(this.values.data[name]);
  }
}

export class NameValues {
  public values: NameValuesType;

  constructor(values: NameValuesType) {
    this.values = values;
  }

  getValue(dependencies: Dependency[], defaultValue: Value): Value {
    let selected = this.values;
    for (const dependency of dependencies) {
      selected = selected.dependencies[dependency];
    }
    return selected.value ?? defaultValue;
  }

  setValue(dependencies: Dependency[], value: Value): NameValues {
    const values = { ...this.values };
    let selected = values;
    for (const dependency of dependencies) {
      values.dependencies[dependency] = { ...values.dependencies[dependency] };
      selected = values.dependencies[dependency];
    }
    selected.value = value;
    return new NameValues(values);
  }
}
