import { ExpressionValue } from "expry";
import { Position, ListPosition, CondPosition, LoopPosition } from "../types/position";

type Key = string | number;

export abstract class FlowValues {
  get(path: Position[], name: string, keys: Key[], defaultValue: ExpressionValue): ExpressionValue {
    return defaultValue;
  }

  set(path: Position[], name: string, keys: Key[], value: ExpressionValue) {
    return this;
  }

  protected formValues(path: Position[]): FormValues {
    let selected: FlowValues | FormValues = this;
    for (const position of path) {
      const flow = selected as FlowValues;
      selected = flow.find(position);
    }
    return selected as FormValues;
  }

  protected abstract find(position: Position): FlowValues | FormValues;
}

export class ListValues extends FlowValues {
  private map: Map<number, FlowValues | FormValues>;

  constructor() {
    super();
    this.map = new Map();
  }

  protected find(position: ListPosition): FlowValues | FormValues {
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

  protected find(position: CondPosition): FlowValues | FormValues {
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

  protected find(position: LoopPosition): FlowValues | FormValues {
    const index = position[1];
    return this.map.get(index)!;
  }
}

export class FormValues {
  private names: Map<string, NameValues>;

  constructor() {
    this.names = new Map();
  }

  nameValues(name: string): NameValues {
    return this.names.get(name)!;
  }
}

export class NameValues {
  private data: ExpressionValue | undefined;
  private keys: Map<Key, NameValues>;

  constructor() {
    this.data = undefined;
    this.keys = new Map();
  }

  get(keys: Key[]): NameValues {
    let selected: NameValues = this;
    for (const key of keys) {
      selected = selected.find(key);
    }
    return selected;
  }

  set(keys: Key[], value: ExpressionValue): NameValues {
    return this;
  }

  find(key: Key): NameValues {
    return this.keys.get(key)!;
  }

  value(defaultValue: ExpressionValue): ExpressionValue {
    return this.data ?? defaultValue;
  }
}

export { ListValues as Values };
