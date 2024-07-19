import { Value } from "expry";
import { Position, ListPosition, CondPosition, LoopPosition } from "../types/position";

type Key = string | number;

export abstract class FlowValues {
  set(path: Position[], name: string, keys: Key[], value: Value): FlowValues {
    console.log(path, name, keys, value);
    return this;
  }

  get(path: Position[], name: string, keys: Key[], defaultValue: Value): Value {
    console.log(path, name, keys, defaultValue);
    return defaultValue;
  }

  protected getFormValues(path: Position[]): FormValues {
    let selected: FlowValues | FormValues = this;
    for (const position of path) {
      const flow = selected as FlowValues;
      selected = flow.at(position);
    }
    return selected as FormValues;
  }

  protected abstract at(position: Position): FlowValues | FormValues;
}

export class ListValues extends FlowValues {
  private map: Map<number, FlowValues | FormValues>;

  constructor() {
    super();
    this.map = new Map();
  }

  protected at(position: ListPosition): FlowValues | FormValues {
    const index = position[1];
    return this.map.get(index)!;
  }
}

export class CondValues extends FlowValues {
  private then: Map<number, FlowValues | FormValues>;
  private else: Map<number, FlowValues | FormValues>;

  constructor() {
    super();
    this.then = new Map();
    this.else = new Map();
  }

  protected at(position: CondPosition): FlowValues | FormValues {
    const [branch, index] = position[1];
    return this[branch].get(index)!;
  }
}

export class LoopValues extends FlowValues {
  private map: Map<number, FlowValues | FormValues>;

  constructor() {
    super();
    this.map = new Map();
  }

  protected at(position: LoopPosition): FlowValues | FormValues {
    const index = position[1];
    return this.map.get(index)!;
  }
}

export class FormValues {
  private names: Map<string, NameValues>;

  constructor() {
    this.names = new Map();
  }

  getNameValues(name: string): NameValues {
    return this.names.get(name)!;
  }
}

export class NameValues {
  private data: Value | undefined;
  private keys: Map<Key, NameValues>;

  constructor() {
    this.data = undefined;
    this.keys = new Map();
  }

  getValue(keys: Key[], defaultValue: Value): Value {
    let selected: NameValues = this;
    for (const key of keys) {
      selected = selected.get(key);
    }
    return selected.value(defaultValue);
  }

  setValue(keys: Key[], value: Value): NameValues {
    console.log(keys, value);
    return this;
  }

  get(key: Key): NameValues {
    return this.keys.get(key)!;
  }

  value(defaultValue: Value): Value {
    return this.data ?? defaultValue;
  }
}
