import { useCallback } from "react";

import { Formity, OnYield, OnReturn } from "@formity/react";

import { schema, Values } from "./schema";

export default function App() {
  const onYield = useCallback<OnYield<Values>>((values) => {
    console.log("yield");
    console.log(values);
  }, []);

  const onReturn = useCallback<OnReturn<Values>>((values) => {
    console.log("return");
    console.log(values);
  }, []);

  return (
    <Formity<Values> schema={schema} onYield={onYield} onReturn={onReturn} />
  );
}
