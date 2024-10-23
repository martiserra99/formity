import type { ReactNode } from "react";

interface RowProps {
  items: ReactNode[];
}

export default function Row({ items }: RowProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(theme(spacing.40),1fr))] gap-4">
      {items}
    </div>
  );
}
