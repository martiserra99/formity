import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils";

export default function Button({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      data-cy="button"
      className={cn(
        "block w-full rounded-full bg-indigo-500 px-6 py-4 text-base text-white hover:bg-indigo-400",
        "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-black",
        "disabled:bg-indigo-500 disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
