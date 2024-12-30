import type { ReactNode } from "react";
import type { OnNext, OnBack, GetFlow, SetFlow } from "@formity/react";

import { useMemo } from "react";

import { ControllerContext } from "./controller-context";

interface ControllerProps {
  step: string;
  onNext: OnNext;
  onBack: OnBack;
  getFlow: GetFlow;
  setFlow: SetFlow;
  children: ReactNode;
}

export function Controller({
  step,
  onNext,
  onBack,
  getFlow,
  setFlow,
  children,
}: ControllerProps) {
  const values = useMemo(
    () => ({
      onNext,
      onBack,
      getFlow,
      setFlow,
    }),
    [onNext, onBack, getFlow, setFlow]
  );

  return (
    <ControllerContext.Provider value={values}>
      <div key={step} className="h-full">
        {children}
      </div>
    </ControllerContext.Provider>
  );
}
