import { useId } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

import { cn } from "../../utils";

import Field from "../user-interface/field";
import Input from "../user-interface/input";

interface CheckboxGroupProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  direction: "x" | "y";
  error: { message: string } | undefined;
}

export default function CheckboxGroup({
  label,
  value,
  onChange,
  options,
  direction,
  error,
}: CheckboxGroupProps) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error}>
      <div
        className={cn("peer grid grid-cols-1 gap-4", {
          "grid-cols-[repeat(auto-fit,minmax(theme(spacing.40),1fr))]":
            direction === "x",
        })}
      >
        {options.map((option) => (
          <Input
            key={option.value}
            as="button"
            props={{
              type: "button",
              value: option.value,
              onClick: () => {
                if (value.includes(option.value)) {
                  onChange(value.filter((v) => v !== option.value).sort());
                } else {
                  onChange([...value, option.value].sort());
                }
              },
            }}
            className={cn(
              "group flex cursor-pointer items-center gap-2 focus:outline-none",
              { "border-neutral-500": value.includes(option.value) },
              { "border-red-500": error }
            )}
          >
            {option.label}
            <CheckIcon
              className={cn(
                "pointer-events-none ml-auto size-5 fill-white/50",
                {
                  "fill-white/100": value.includes(option.value),
                }
              )}
            />
          </Input>
        ))}
      </div>
    </Field>
  );
}
