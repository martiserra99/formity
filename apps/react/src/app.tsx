import React, { useCallback, useState } from "react";

import {
  Flow,
  Struct,
  OnYield,
  OnReturn,
  YieldOutput,
  ReturnOutput,
} from "@formity/react";

import { MultiStepForm } from "./multi-step-form";
import { Data } from "./components";

type Schema = {
  render: React.ReactNode;
  struct: Struct;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

interface AppProps<T extends Schema> {
  flow: Flow<T>;
}

export default function App<T extends Schema>({ flow }: AppProps<T>) {
  const [values, setValues] = useState<ReturnOutput<Schema> | null>(null);

  const onYield = useCallback<OnYield<Schema>>(
    (values: YieldOutput<Schema>) => {
      console.log(values);
    },
    [],
  );

  const onReturn = useCallback<OnReturn<Schema>>(
    (values: ReturnOutput<Schema>) => {
      setValues(values);
    },
    [],
  );

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return <MultiStepForm<T> flow={flow} onYield={onYield} onReturn={onReturn} />;
}
