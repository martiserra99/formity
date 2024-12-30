import Code from "./user-interface/code";
import Button from "./user-interface/button";

interface DataProps {
  data: unknown;
  onStart: () => void;
}

export default function Data({ data, onStart }: DataProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-md shrink-0 space-y-4">
        <div className="scrollbar-hide max-h-96 w-full overflow-auto rounded-3xl border border-neutral-800 bg-neutral-950 p-3">
          <Code code={data} />
        </div>
        <Button type="button" onClick={onStart}>
          Start Again
        </Button>
      </div>
    </div>
  );
}
