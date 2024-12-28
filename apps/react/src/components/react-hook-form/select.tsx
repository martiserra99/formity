import { useFormContext, Controller } from "react-hook-form";

import RadioGroup from "../fields/radio-group";

interface SelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  direction: "x" | "y";
}

export default function Select({ name, label, options, direction }: SelectProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
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
