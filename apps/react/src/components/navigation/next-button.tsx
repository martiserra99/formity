import type { ReactNode } from "react";

import Button from "../user-interface/button";

interface NextButtonProps {
  children: ReactNode;
}

export default function NextButton({ children }: NextButtonProps) {
  return <Button>{children}</Button>;
}
