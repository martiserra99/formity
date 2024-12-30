import { useCallback, useState } from "react";

import { Formity, OnReturn, ReturnValues } from "@formity/react";

import { Data } from "./components";

import { schema, Values } from "./schema";

export default function App() {
  const [values, setValues] = useState<ReturnValues<Values> | null>(null);

  const onReturn = useCallback<OnReturn<Values>>((values) => {
    setValues(values);
  }, []);

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return <Formity<Values> schema={schema} onReturn={onReturn} />;
}
