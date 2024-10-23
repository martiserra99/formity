import { useFormContext, Controller } from "react-hook-form";

import RadioGroup from "../fields/radio-group";

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

interface YesNoProps {
  name: string;
  label: string;
  cy: string;
}

export default function YesNo({ name, label, cy }: YesNoProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          label={label}
          value={field.value ? "yes" : "no"}
          onChange={(value) => field.onChange(value === "yes" ? true : false)}
          options={options}
          direction="x"
          error={error}
          cy={cy}
        />
      )}
    />
  );
}
