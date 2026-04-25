import type { ReactNode } from "react";
import type { DefaultValues, Resolver } from "react-hook-form";

import { FormProvider, useForm } from "react-hook-form";

import { useFormActions } from "../form-actions";

interface StepProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  children: ReactNode;
}

export default function Step<T extends Record<string, unknown>>({
  defaultValues,
  resolver,
  children,
}: StepProps<T>) {
  const form = useForm({ defaultValues, resolver });
  const { onNext } = useFormActions<T>();
  return (
    <form onSubmit={form.handleSubmit(onNext)} className="h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
