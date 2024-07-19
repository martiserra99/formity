import { expry, Value, Variables } from "expry";

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
import { Result, FormResult, ReturnResult } from "../types/result";
import { Components, Parameters } from "../types/components";
import { FlowValues } from "./values";

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
  find(path: Position[]): UnitSchema {
    let selected: UnitSchema = this;
    for (const position of path) {
      const flow = selected as FlowSchema;
      selected = flow.at(position);
    }
    return selected;
  }

  abstract into(variables: Variables): Position | null;

  abstract next(position: Position, variables: Variables): Position | null;

  protected abstract at(position: Position): UnitSchema;
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

  protected at(position: ListPosition): UnitSchema {
    const index = position[1];
    return this.list[index];
  }
}

export class CondSchema extends FlowSchema {
  private if: Value;
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

  into(variables: Variables): CondPosition | null {
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

  protected at(position: CondPosition): UnitSchema {
    const [branch, index] = position[1];
    return this[branch][index];
  }
}

export class LoopSchema extends FlowSchema {
  private while: Value;
  private do: UnitSchema[];

  constructor(schema: LoopSchemaType) {
    super();
    this.while = schema.loop.while;
    this.do = schema.loop.do.map(unit => UnitSchema.create(unit));
  }

  static is(schema: UnitSchemaType): schema is LoopSchemaType {
    return "loop" in schema;
  }

  into(variables: Variables): LoopPosition | null {
    if (expry(this.while, variables)) {
      if (this.do.length > 0) return ["loop", 0];
    }
    return null;
  }

  next(position: LoopPosition, variables: Variables): LoopPosition | null {
    const index = position[1];
    if (index < this.do.length - 1) return ["loop", index + 1];
    if (expry(this.while, variables)) return ["loop", 0];
    return null;
  }

  protected at(position: LoopPosition): UnitSchema {
    const index = position[1];
    return this.do[index];
  }
}

export abstract class StepSchema extends UnitSchema {
  // Empty
}

export abstract class StopSchema<T extends Parameters> extends StepSchema {
  abstract getResult(variables: Variables, components: Components<T>, values: FlowValues, path: Position[]): Result;
}

type Key = string | number;
type DefaultValues = Record<string, [Value, Key[]]>;
type Resolver = Record<string, [Value, string][]>;

export class FormSchema<T extends Parameters> extends StopSchema<T> {
  private defaultValues: Value;
  private resolver: Value;
  private render: Value;

  constructor(schema: FormSchemaType) {
    super();
    this.defaultValues = schema.form.defaultValues;
    this.resolver = schema.form.resolver;
    this.render = schema.form.render;
  }

  static is(schema: UnitSchemaType): schema is FormSchemaType {
    return "form" in schema;
  }

  getNameKeys(variables: Variables): (name: string) => Key[] {
    const defaultValues = expry(this.defaultValues, variables) as DefaultValues;
    return (name: string) => defaultValues[name][1];
  }

  getResult(variables: Variables, components: Components<T>, values: FlowValues, path: Position[]): FormResult {
    return {
      type: "form",
      defaultValues: this.getDefaultValues(variables, values, path),
      resolver: this.getResolver(variables),
      render: this.getRender(variables, components),
    };
  }

  private getDefaultValues(variables: Variables, values: FlowValues, path: Position[]): FormResult["defaultValues"] {
    const defaultValues = expry(this.defaultValues, variables) as DefaultValues;
    return Object.fromEntries(
      Object.entries(defaultValues).map(([name, [value, keys]]) => {
        return [name, values.get(path, name, keys, value)];
      })
    );
  }

  private getResolver(variables: Variables): FormResult["resolver"] {
    const resolver = expry(this.resolver, variables) as Resolver;
    return (values: Variables) => {
      const errors: Record<string, { type: string; message: string }> = {};
      for (const [name, validations] of Object.entries(resolver)) {
        const error = validations.find(([expr]) => !expry(expr, values));
        if (error) errors[name] = { type: "validation", message: error[1] };
      }
      return { values, errors };
    };
  }

  private getRender(variables: Variables, components: Components<T>): FormResult["render"] {
    const callback = (value: Value) => {
      const object = value as Record<string, Value>;
      const [key] = Object.keys(object);
      const component = components[key];
      const values = object[key] as T[string];
      return component(values, callback);
    };
    return (values: Variables) => {
      const render = expry(this.render, { ...variables, ...values });
      return callback(render);
    };
  }
}

export class ReturnSchema<T extends Parameters> extends StopSchema<T> {
  private return: Value;

  constructor(schema: ReturnSchemaType) {
    super();
    this.return = schema.return;
  }

  static is(schema: UnitSchemaType): schema is ReturnSchemaType {
    return "return" in schema;
  }

  getResult(variables: Variables): ReturnResult {
    return {
      type: "return",
      return: expry(this.return, variables),
    };
  }
}

export class VariablesSchema extends StepSchema {
  private variables: Value;

  constructor(schema: VariablesSchemaType) {
    super();
    this.variables = schema.variables;
  }

  static is(schema: UnitSchemaType): schema is VariablesSchemaType {
    return "variables" in schema;
  }

  getVariables(variables: Variables): Variables {
    return expry(this.variables, variables) as Variables;
  }
}
