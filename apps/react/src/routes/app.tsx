import { useCallback, useState } from "react";

import {
  Formity,
  OnYield,
  YieldValues,
  OnReturn,
  ReturnValues,
} from "@formity/react";

import { Data } from "../components";

import { schema, Values } from "./app.schema";

export default function App() {
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

  return (
    <Formity<Values> schema={schema} onYield={onYield} onReturn={onReturn} />
  );
}
