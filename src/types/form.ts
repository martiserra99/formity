import { UseFormProps } from "react-hook-form";
import { ReactElement } from "react";
import { Variables } from "expry";

export interface FormProps<T extends Variables> {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  render: (values: T) => ReactElement;
  onSubmit: (formData: Variables) => void;
  onBack: (formData: Variables) => void;
}
