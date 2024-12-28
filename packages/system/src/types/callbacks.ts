import type { Flow } from "./flow/flow";

export type OnNext = (values: object) => void;
export type OnBack = (values: object) => void;
export type GetFlow = (values: object) => Flow;
export type SetFlow = (flow: Flow) => void;
