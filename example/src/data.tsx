import type { Value } from "expry";

import Code from "./components/user-interface/code";
import Button from "./components/user-interface/button";

interface DataProps {
  data: Value;
  onStart: () => void;
}

export default function Data({ data, onStart }: DataProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-0 lg:p-8">
      <div className="w-[115%] max-w-md shrink-0 space-y-4">
        <div className="scrollbar-hide max-h-96 w-full overflow-auto rounded-3xl border border-neutral-800 bg-neutral-950 p-3">
          <Code code={data} />
        </div>
        <Button onClick={onStart}>Start Again</Button>
      </div>
    </div>
  );
}
