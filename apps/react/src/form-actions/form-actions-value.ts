import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

export interface FormActionsValue<T extends Record<string, unknown>> {
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  getState: GetState<T>;
  setState: SetState;
}
