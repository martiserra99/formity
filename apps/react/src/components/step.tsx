import type { ReactElement } from "react";
import type { UseFormProps } from "react-hook-form";

import { FormProvider, useForm } from "react-hook-form";

import { useMultiStep } from "../multi-step";

interface StepProps {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  children: ReactElement;
}

export default function Step({ defaultValues, resolver, children }: StepProps) {
  const form = useForm({ defaultValues, resolver });
  const { onNext } = useMultiStep();
  return (
    <form onSubmit={form.handleSubmit(onNext)} className="h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
