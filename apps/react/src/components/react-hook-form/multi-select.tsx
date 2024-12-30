import { useFormContext, Controller } from "react-hook-form";

import CheckboxGroup from "../fields/checkbox-group";

interface MultiSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  direction: "x" | "y";
}

export default function MultiSelect({ name, label, options, direction }: MultiSelectProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CheckboxGroup
          label={label}
          value={field.value}
          onChange={field.onChange}
          options={options}
          direction={direction}
          error={error}
        />
      )}
    />
  );
}
