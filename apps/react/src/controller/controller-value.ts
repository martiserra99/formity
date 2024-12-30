import type { OnNext, OnBack, GetFlow, SetFlow } from "@formity/react";

export interface ControllerValue {
  onNext: OnNext;
  onBack: OnBack;
  getFlow: GetFlow;
  setFlow: SetFlow;
}
