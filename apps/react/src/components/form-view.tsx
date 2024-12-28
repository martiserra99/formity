import type { ReactElement } from "react";
import type { OnNext } from "@formity/react";

import { FormProvider, useForm, UseFormProps } from "react-hook-form";

interface FormViewProps {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  onNext: OnNext;
  children: ReactElement;
}

export default function FormView({
  defaultValues,
  resolver,
  onNext,
  children,
}: FormViewProps) {
  const form = useForm({ defaultValues, resolver });
  return (
    <form onSubmit={form.handleSubmit(onNext)} className="h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
