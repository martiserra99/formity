import React, { useCallback, useState } from "react";

import {
  Flow,
  Schema,
  OnYield,
  OnReturn,
  YieldOutput,
  ReturnOutput,
} from "@formity/react";

import { MultiStepForm } from "./multi-step-form";
import { Data } from "./components";

type Shape = {
  render: React.ReactNode;
  schema: Schema;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

interface AppProps<T extends Shape> {
  flow: Flow<T>;
}

export default function App<T extends Shape>({ flow }: AppProps<T>) {
  const [values, setValues] = useState<ReturnOutput<Shape> | null>(null);

  const onYield = useCallback<OnYield<Shape>>((values: YieldOutput<Shape>) => {
    console.log(values);
  }, []);

  const onReturn = useCallback<OnReturn<Shape>>(
    (values: ReturnOutput<Shape>) => {
      setValues(values);
    },
    [],
  );

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return <MultiStepForm<T> flow={flow} onYield={onYield} onReturn={onReturn} />;
}
