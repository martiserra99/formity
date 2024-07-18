import { expry, Expression, ExpressionVariables } from "expry";

import {
  UnitSchemaType,
  ListSchemaType,
  CondSchemaType,
  LoopSchemaType,
  FormSchemaType,
  ReturnSchemaType,
  VariablesSchemaType,
} from "../types/schema";

import { CondPosition, ListPosition, LoopPosition, Position } from "../types/position";

export class UnitSchema {
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

export abstract class FlowSchema extends UnitSchema {
  get(path: Position[]): UnitSchema {
    let selected: UnitSchema = this;
    for (const position of path) {
      selected = this.find(position) as FlowSchema;
    }
    return selected;
  }

  abstract into(variables: ExpressionVariables): Position | null;

  abstract next(position: Position, variables: ExpressionVariables): Position | null;

  protected abstract find(position: Position): UnitSchema;
}

export class ListSchema extends FlowSchema {
  private list: UnitSchema[];

  constructor(schema: ListSchemaType) {
    super();
    this.list = schema.map(unit => UnitSchema.create(unit));
  }

  static is(schema: UnitSchemaType): schema is ListSchemaType {
    return Array.isArray(schema);
  }

  into(): ListPosition | null {
    if (this.list.length > 0) return ["list", 0];
    return null;
  }

  next(position: ListPosition): ListPosition | null {
    const index = position[1];
    if (index < this.list.length - 1) return ["list", index + 1];
    return null;
  }

  protected find(position: ListPosition): UnitSchema {
    const index = position[1];
    return this.list[index];
  }
}

export class CondSchema extends FlowSchema {
  private if: Expression;
  private then: UnitSchema[];
  private else: UnitSchema[];

  constructor(schema: CondSchemaType) {
    super();
    this.if = schema.cond.if;
    this.then = schema.cond.then.map(unit => UnitSchema.create(unit));
    this.else = schema.cond.else.map(unit => UnitSchema.create(unit));
  }

  static is(schema: UnitSchemaType): schema is CondSchemaType {
    return "cond" in schema;
  }

  into(variables: ExpressionVariables): CondPosition | null {
    if (expry(this.if, variables)) {
      if (this.then.length > 0) {
        return ["cond", ["then", 0]];
      }
    } else {
      if (this.else.length > 0) {
        return ["cond", ["else", 0]];
      }
    }
    return null;
  }

  next(position: CondPosition): CondPosition | null {
    const [branch, index] = position[1];
    if (index < this[branch].length - 1) {
      return ["cond", [branch, index + 1]];
    }
    return null;
  }

  protected find(position: CondPosition): UnitSchema {
    const [branch, index] = position[1];
    return this[branch][index];
  }
}

export class LoopSchema extends FlowSchema {
  private while: Expression;
  private do: UnitSchema[];

  constructor(schema: LoopSchemaType) {
    super();
    this.while = schema.loop.while;
    this.do = schema.loop.do.map(unit => UnitSchema.create(unit));
  }

  static is(schema: UnitSchemaType): schema is LoopSchemaType {
    return "loop" in schema;
  }

  into(variables: ExpressionVariables): LoopPosition | null {
    if (expry(this.while, variables)) {
      if (this.do.length > 0) return ["loop", 0];
    }
    return null;
  }

  next(position: LoopPosition, variables: ExpressionVariables): LoopPosition | null {
    const index = position[1];
    if (index < this.do.length - 1) return ["loop", index + 1];
    if (expry(this.while, variables)) return ["loop", 0];
    return null;
  }

  protected find(position: LoopPosition): UnitSchema {
    const index = position[1];
    return this.do[index];
  }
}

export class ItemSchema extends UnitSchema {
  // Empty
}

export class FormSchema extends ItemSchema {
  readonly defaultValues: Expression;
  readonly resolver: Expression;
  readonly render: Expression;

  constructor(schema: FormSchemaType) {
    super();
    this.defaultValues = schema.form.defaultValues;
    this.resolver = schema.form.resolver;
    this.render = schema.form.render;
  }

  static is(schema: UnitSchemaType): schema is FormSchemaType {
    return "form" in schema;
  }
}

export class ReturnSchema extends ItemSchema {
  readonly return: Expression;

  constructor(schema: ReturnSchemaType) {
    super();
    this.return = schema.return;
  }

  static is(schema: UnitSchemaType): schema is ReturnSchemaType {
    return "return" in schema;
  }
}

export class VariablesSchema extends ItemSchema {
  readonly variables: Expression;

  constructor(schema: VariablesSchemaType) {
    super();
    this.variables = schema.variables;
  }

  static is(schema: UnitSchemaType): schema is VariablesSchemaType {
    return "variables" in schema;
  }
}

export { ListSchema as Schema };
