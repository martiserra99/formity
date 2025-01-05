import type { ElementType, ComponentProps, ReactNode } from "react";

import { cn } from "../../utils";

type InputProps<E extends ElementType> = Omit<ComponentProps<E>, "as"> & {
  as?: E;
  children?: ReactNode;
  className?: ReactNode;
};

export default function Input<T extends ElementType>({
  as,
  children,
  className,
  ...props
}: InputProps<T>) {
  const As = as || "div";
  return (
    <As
      data-cy="input"
      className={cn(
        "block w-full rounded-full border border-neutral-800 bg-neutral-950 px-7 py-4 text-left text-base text-white",
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}
