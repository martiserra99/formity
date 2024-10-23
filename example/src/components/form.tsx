import type { ReactElement } from "react";
import type { Step, DefaultValues, Resolver, OnNext, Variables } from "formity";

import { forwardRef, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  step: Step;
  defaultValues: DefaultValues;
  resolver: Resolver;
  onNext: OnNext;
  children: ReactElement;
}

export default function Form({
  step,
  defaultValues,
  resolver,
  onNext,
  children,
}: FormProps) {
  return (
    <Component
      key={step}
      defaultValues={defaultValues}
      resolver={resolver}
      onNext={onNext}
    >
      {children}
    </Component>
  );
}

interface ComponentProps {
  defaultValues: DefaultValues;
  resolver: Resolver;
  onNext: OnNext;
  children: ReactElement;
}

const Component = forwardRef<HTMLFormElement, ComponentProps>(
  function Component({ defaultValues, resolver, onNext, children }, ref) {
    const form = useForm({ defaultValues, resolver });

    const handleSubmit = useCallback((formData: Variables) => {
      onNext(formData);
    }, []);

    return (
      <form
        ref={ref}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="h-full"
      >
        <FormProvider {...form}>{children}</FormProvider>
      </form>
    );
  }
);
