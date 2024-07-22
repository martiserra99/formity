import { UseFormProps } from "react-hook-form";
import { Variables } from "expry";

export type DefaultValues = UseFormProps["defaultValues"];
export type Resolver = UseFormProps["resolver"];
export type OnNext = (formData: Variables) => void;
export type OnBack = (formData: Variables) => void;
export type Key = number;
