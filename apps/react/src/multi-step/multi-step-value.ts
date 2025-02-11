import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

export interface MultiStepValue {
  onNext: OnNext;
  onBack: OnBack;
  getState: GetState;
  setState: SetState;
}
