import { useId } from "react";
import {
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { cn } from "../../utils";

import Field from "../user-interface/field";
import Input from "../user-interface/input";

interface ListboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error: { message: string } | undefined;
}

export default function Listbox({
  label,
  value,
  onChange,
  options,
  error,
}: ListboxProps) {
  const id = useId();
  const option = options.find((option) => option.value === value)!;
  return (
    <Field id={id} label={label} error={error}>
      <HeadlessListbox value={value} onChange={onChange}>
        <Input
          as={ListboxButton}
          className={cn(
            "flex items-center gap-2 focus:outline-none data-[active]:border-neutral-500",
            {
              "border-red-500 data-[active]:border-red-500": error,
            }
          )}
        >
          {option.label}
          <ChevronDownIcon
            className="pointer-events-none ml-auto size-6 fill-white/50"
            aria-hidden="true"
          />
        </Input>
        <ListboxOptions
          anchor="bottom"
          transition
          className="w-[var(--button-width)] rounded-3xl border border-neutral-800 bg-neutral-950 px-1 py-1 [--anchor-gap:8px] focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="group relative z-10 flex cursor-default select-none items-center gap-2 rounded-full px-3 py-2 data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm text-white">{option.label}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HeadlessListbox>
    </Field>
  );
}
