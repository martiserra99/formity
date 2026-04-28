import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

export interface FormControlsValue<T extends Record<string, unknown>> {
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  getState: GetState<T>;
  setState: SetState;
}
