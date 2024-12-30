import { useFormContext, Controller } from "react-hook-form";

import BaseTextField from "../fields/text-field";

interface TextFieldProps {
  name: string;
  label: string;
}

export default function TextField({ name, label }: TextFieldProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <BaseTextField type="text" label={label} value={field.value} onChange={field.onChange} error={error} />
      )}
    />
  );
}
