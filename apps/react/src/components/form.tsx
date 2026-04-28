import type { ReactNode } from "react";
import type { DefaultValues, Resolver } from "react-hook-form";

import { FormProvider, useForm } from "react-hook-form";

import { useFormControls } from "../form-controls";

interface FormProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  children: ReactNode;
}

export default function Form<T extends Record<string, unknown>>({
  defaultValues,
  resolver,
  children,
}: FormProps<T>) {
  const form = useForm({ defaultValues, resolver });
  const { onNext } = useFormControls<T>();
  return (
    <form onSubmit={form.handleSubmit(onNext)} className="h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
