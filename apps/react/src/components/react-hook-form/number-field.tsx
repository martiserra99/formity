import { useFormContext, Controller } from "react-hook-form";

import TextField from "../fields/text-field";

interface NumberFieldProps {
  name: string;
  label: string;
}

export default function NumberField({ name, label }: NumberFieldProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          type="number"
          label={label}
          value={String(field.value)}
          onChange={(value) => field.onChange(value === "" ? 0 : Number(value))}
          error={error}
        />
      )}
    />
  );
}
