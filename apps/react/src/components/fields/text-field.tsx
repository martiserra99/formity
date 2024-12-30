import type { ChangeEvent } from "react";

import { useId } from "react";

import { cn } from "../../utils";

import Field from "../user-interface/field";
import Input from "../user-interface/input";

interface TextFieldProps {
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: { message: string } | undefined;
}

export default function TextField({
  type,
  label,
  value,
  onChange,
  error,
}: TextFieldProps) {
  const id = useId();
  return (
    <Field
      id={id}
      label={label}
      labelClassName={cn(
        "peer-placeholder-shown:top-[17px] peer-placeholder-shown:before:bg-transparent peer-focus:before:bg-neutral-950",
        "peer-placeholder-shown:text-base peer-focus:-top-[11px] peer-focus:text-sm"
      )}
      error={error}
    >
      <Input
        as="input"
        id={id}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        placeholder={label}
        className={cn(
          "peer placeholder-transparent focus:border-neutral-500 focus:outline-none focus:ring-transparent",
          { "border-red-500 focus:border-red-500": error }
        )}
      />
    </Field>
  );
}
