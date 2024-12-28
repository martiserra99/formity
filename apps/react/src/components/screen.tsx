import type { ReactNode } from "react";

interface ScreenProps {
  progress: { total: number; current: number };
  children: ReactNode;
}

export default function Screen({ progress, children }: ScreenProps) {
  return (
    <div className="relative h-full w-full">
      <Progress total={progress.total} current={progress.current} />
      {children}
    </div>
  );
}

interface ProgressProps {
  total: number;
  current: number;
}

function Progress({ total, current }: ProgressProps) {
  return (
    <div className="absolute left-0 right-0 top-0 h-1 bg-indigo-500/50">
      <div
        className="h-full bg-indigo-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}
