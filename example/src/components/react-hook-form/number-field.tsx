import { useFormContext, Controller } from "react-hook-form";

import TextField from "../fields/text-field";

interface NumberFieldProps {
  name: string;
  label: string;
  cy: string;
}

export default function NumberField({ name, label, cy }: NumberFieldProps) {
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
          value={field.value === "" ? "" : String(field.value)}
          onChange={(value) =>
            field.onChange(value === "" ? "" : Number(value))
          }
          error={error}
          cy={cy}
        />
      )}
    />
  );
}
