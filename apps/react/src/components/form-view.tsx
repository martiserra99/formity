import type { ReactElement } from "react";
import type { UseFormProps } from "react-hook-form";

import { FormProvider, useForm } from "react-hook-form";

import { useController } from "../controller";

interface FormViewProps {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  children: ReactElement;
}

export default function FormView({
  defaultValues,
  resolver,
  children,
}: FormViewProps) {
  const form = useForm({ defaultValues, resolver });
  const { onNext } = useController();
  return (
    <form onSubmit={form.handleSubmit(onNext)} className="h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
