import { expry, Expression, Variables } from "expry";

import {
  UnitSchemaType,
  FlowSchemaType,
  ListSchemaType,
  CondSchemaType,
  LoopSchemaType,
  ItemSchemaType,
  FormSchemaType,
  ReturnSchemaType,
  VariablesSchemaType,
} from "../types/schema";

import { CondPosition, ListPosition, LoopPosition, Position } from "../types/position";

export abstract class UnitSchema<T extends UnitSchemaType = UnitSchemaType> {
  protected schema: T;

  constructor(schema: T) {
    this.schema = schema;
  }

  static create(schema: UnitSchemaType): UnitSchema {
    if (ListSchema.is(schema)) return new ListSchema(schema);
    if (CondSchema.is(schema)) return new CondSchema(schema);
    if (LoopSchema.is(schema)) return new LoopSchema(schema);
    if (FormSchema.is(schema)) return new FormSchema(schema);
    if (ReturnSchema.is(schema)) return new ReturnSchema(schema);
    if (VariablesSchema.is(schema)) return new VariablesSchema(schema);
    throw new Error("Invalid schema");
  }
}

export abstract class FlowSchema<T extends FlowSchemaType = FlowSchemaType> extends UnitSchema<T> {
  constructor(schema: T) {
    super(schema);
  }

  getSchema(path: Position[]): UnitSchema {
    let selected: UnitSchema = this;
    for (const position of path) {
      selected = this.getSchemaPosition(position) as FlowSchema;
    }
    return selected;
  }

  abstract getIntoPosition(variables: Variables): Position | null;

  abstract getNextPosition(position: Position, variables: Variables): Position | null;

  protected abstract getSchemaPosition(position: Position): UnitSchema;
}

export class ListSchema extends FlowSchema<ListSchemaType> {
  constructor(schema: ListSchemaType) {
    super(schema);
  }

  static is(schema: UnitSchemaType): schema is ListSchemaType {
    return Array.isArray(schema);
  }

  getIntoPosition(): ListPosition | null {
    if (this.schema.length > 0) return ["list", 0];
    return null;
  }

  getNextPosition(position: ListPosition): ListPosition | null {
    const [_, index] = position;
    if (index < this.schema.length - 1) return ["list", index + 1];
    return null;
  }

  protected getSchemaPosition(position: ListPosition): UnitSchema {
    const [_, index] = position;
    return UnitSchema.create(this.schema[index]);
  }
}

export class CondSchema extends FlowSchema<CondSchemaType> {
  constructor(schema: CondSchemaType) {
    super(schema);
  }

  static is(schema: UnitSchemaType): schema is CondSchemaType {
    return "cond" in schema;
  }

  getIntoPosition(variables: Variables): CondPosition | null {
    if (expry(this.schema.cond.if, variables)) {
      if (this.schema.cond.then.length > 0) {
        return ["cond", ["then", 0]];
      }
    } else {
      if (this.schema.cond.else.length > 0) {
        return ["cond", ["else", 0]];
      }
    }
    return null;
  }

  getNextPosition(position: CondPosition): CondPosition | null {
    const [_, [branch, index]] = position;
    if (index < this.schema.cond[branch].length - 1) {
      return ["cond", [branch, index + 1]];
    }
    return null;
  }

  protected getSchemaPosition(position: CondPosition): UnitSchema {
    const [_, [branch, index]] = position;
    return UnitSchema.create(this.schema.cond[branch][index]);
  }
}

export class LoopSchema extends FlowSchema<LoopSchemaType> {
  constructor(schema: LoopSchemaType) {
    super(schema);
  }

  static is(schema: UnitSchemaType): schema is LoopSchemaType {
    return "loop" in schema;
  }

  getIntoPosition(variables: Variables): LoopPosition | null {
    if (expry(this.schema.loop.while, variables)) {
      if (this.schema.loop.do.length > 0) return ["loop", 0];
    }
    return null;
  }

  getNextPosition(position: LoopPosition, variables: Variables): LoopPosition | null {
    const [_, index] = position;
    if (index < this.schema.loop.do.length - 1) return ["loop", index + 1];
    if (expry(this.schema.loop.while, variables)) return ["loop", 0];
    return null;
  }

  protected getSchemaPosition(position: LoopPosition): UnitSchema {
    const [_, index] = position;
    return UnitSchema.create(this.schema.loop.do[index]);
  }
}

export abstract class ItemSchema<T extends ItemSchemaType = ItemSchemaType> extends UnitSchema<T> {
  constructor(schema: T) {
    super(schema);
  }
}

export class FormSchema extends ItemSchema<FormSchemaType> {
  constructor(schema: FormSchemaType) {
    super(schema);
  }

  static is(schema: UnitSchemaType): schema is FormSchemaType {
    return "form" in schema;
  }

  get defaultValues(): Expression {
    return this.schema.form.defaultValues;
  }

  get resolver(): Expression {
    return this.schema.form.resolver;
  }

  get render(): Expression {
    return this.schema.form.render;
  }
}

export class ReturnSchema extends ItemSchema<ReturnSchemaType> {
  constructor(schema: ReturnSchemaType) {
    super(schema);
  }

  static is(schema: UnitSchemaType): schema is ReturnSchemaType {
    return "return" in schema;
  }

  get return(): Expression {
    return this.schema.return;
  }
}

export class VariablesSchema extends ItemSchema<VariablesSchemaType> {
  constructor(schema: VariablesSchemaType) {
    super(schema);
  }

  static is(schema: UnitSchemaType): schema is VariablesSchemaType {
    return "variables" in schema;
  }

  get variables(): Expression {
    return this.schema.variables;
  }
}