import type { ReactNode } from "react";

import Button from "../user-interface/button";

interface ButtonProps {
  children: ReactNode;
  cy?: string;
}

export default function Next({ children, cy }: ButtonProps) {
  return <Button cy={cy}>{children}</Button>;
}
