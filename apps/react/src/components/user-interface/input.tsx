/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType } from "react";

import { cn } from "../../utils";

interface InputProps<T extends ElementType> {
  as: T;
  props?: any;
  children?: React.ReactNode;
  className?: React.ReactNode;
}

export default function Input<T extends ElementType>({
  as: Component,
  props,
  children,
  className,
}: InputProps<T>) {
  return (
    <Component
      className={cn(
        "block w-full rounded-full border border-neutral-800 bg-neutral-950 px-7 py-4 text-left text-base text-white",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
