import { useCallback, useState } from "react";

import {
  Schema,
  Values,
  OnYield,
  YieldValues,
  OnReturn,
  ReturnValues,
} from "@formity/react";

import { Form } from "./form";
import { Data } from "./components";

interface AppProps<T extends Values> {
  schema: Schema<T>;
}

export default function App<T extends Values>({ schema }: AppProps<T>) {
  const [values, setValues] = useState<ReturnValues<Values> | null>(null);

  const onYield = useCallback<OnYield<Values>>(
    (values: YieldValues<Values>) => {
      console.log(values);
    },
    []
  );

  const onReturn = useCallback<OnReturn<Values>>(
    (values: ReturnValues<Values>) => {
      setValues(values);
    },
    []
  );

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return <Form<T> schema={schema} onYield={onYield} onReturn={onReturn} />;
}
