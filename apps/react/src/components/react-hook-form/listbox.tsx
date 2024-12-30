import { useFormContext, Controller } from "react-hook-form";

import BaseListbox from "../fields/listbox";

interface ListboxProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function Listbox({ name, label, options }: ListboxProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <BaseListbox label={label} value={field.value} onChange={field.onChange} options={options} error={error} />
      )}
    />
  );
}
