import { createContext, useContext } from "react";

import { Values } from "../types/form";

export const FormityContext = createContext<Values | null>(null);

export function useFormity() {
  const context = useContext(FormityContext);
  if (!context) throw new Error("useFormity must be used within Formity");
  return context;
}
