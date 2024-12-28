import type { ReactNode } from "react";

import Button from "../user-interface/button";

interface ButtonProps {
  children: ReactNode;
}

export default function Next({ children }: ButtonProps) {
  return <Button>{children}</Button>;
}
