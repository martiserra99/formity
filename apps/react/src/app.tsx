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

type Definition = {
  render: React.ReactNode;
  schema: Schema;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

interface AppProps<T extends Definition> {
  flow: Flow<T>;
}

export default function App<T extends Definition>({ flow }: AppProps<T>) {
  const [values, setValues] = useState<ReturnOutput<Definition> | null>(null);

  const onYield = useCallback<OnYield<Definition>>(
    (values: YieldOutput<Definition>) => {
      console.log(values);
    },
    [],
  );

  const onReturn = useCallback<OnReturn<Definition>>(
    (values: ReturnOutput<Definition>) => {
      setValues(values);
    },
    [],
  );

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return <MultiStepForm<T> flow={flow} onYield={onYield} onReturn={onReturn} />;
}
