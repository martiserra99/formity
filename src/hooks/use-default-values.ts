import { useMemo } from "react";

import { DefaultValues } from "../types/form";
import { FormResult } from "../types/result";
import { ListFields } from "../types/fields";
import { Position } from "../types/position";

import { FlowFieldsUtils } from "../utils/fields/flow";

export function useDefaultValues(
  form: FormResult,
  path: Position[],
  fields: ListFields
): DefaultValues {
  return useMemo(() => {
    return Object.fromEntries(
      Object.entries(form.defaultValues).map(([name, [value, keys]]) => {
        return [name, FlowFieldsUtils.get(fields, path, name, keys, value)];
      })
    );
  }, [form, path, fields]);
}
