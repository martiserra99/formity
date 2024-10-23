import type { Value } from "expry";
import type { ReactElement } from "react";

import { useState } from "react";

import Form from "./form";
import Data from "./data";

export default function App() {
  const [result, setResult] = useState<Value | null>(null);

  function handleReturn(result: Value) {
    setResult(result);
  }

  let component: ReactElement;

  if (result) {
    component = <Data data={result} onStart={() => setResult(null)} />;
  } else {
    component = <Form onReturn={handleReturn} />;
  }

  return (
    <div className="h-screen min-h-[800px] min-w-[800px] bg-black">
      {component}
    </div>
  );
}
