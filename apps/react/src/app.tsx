import { useCallback, useState } from "react";

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

import type { Render } from "./render";

interface AppProps<T extends Schema> {
  flow: Flow<Render, T>;
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
