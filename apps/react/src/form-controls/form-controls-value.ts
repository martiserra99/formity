import type { Next, Back, GetState, SetState } from "@formity/react";

export interface FormControlsValue<T extends Record<string, unknown>> {
  next: Next<T>;
  back: Back<T>;
  getState: GetState<T>;
  setState: SetState;
}
