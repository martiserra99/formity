import { Value } from "expry";

export type PathFields = FlowFields | FormFields;

export type FlowFields = ListFields | CondFields | LoopFields;

export type ListFields = ["list", { [key: string]: PathFields }];

export type CondFields = [
  "cond",
  {
    then: { [key: string]: PathFields };
    else: { [key: string]: PathFields };
  }
];

export type LoopFields = ["loop", { [key: string]: PathFields }];

export type FormFields = { [key: string]: NameFields };

export type NameFields = { data: Value; keys: { [key: string]: NameFields } };

// let current: FlowFields | FormFields = flowFields;
// for (const position of path) {
//   const currentFlowFields = current as FlowFields;
//   current = flowFieldsUtils(currentFlowFields).at(position);
//   if (!current) return value;
// }
// let currentNameFields = current as FormFields;
// for (const key of keys) {
//   currentNameFields = currentNameFields.keys[key];
//   if (!currentNameFields) return value;
// }

// import { Value } from "expry";
// import { CondPosition, ListPosition, LoopPosition, FlowPosition } from "../position";

// export type FlowFields = ListFields | CondFields | LoopFields;

// export type ListFields = ["list", { [key: string]: FlowFields | FormFields }];

// export type CondFields = [
//   "cond",
//   {
//     then: { [key: string]: FlowFields | FormFields };
//     else: { [key: string]: FlowFields | FormFields };
//   }
// ];

// export type LoopFields = ["loop", { [key: string]: FlowFields | FormFields }];

// export type FormFields = { [key: string]: NameFields };

// export type NameFields = { data: Value; keys: { [key: string]: NameFields } };

// namespace FlowFieldsUtils {
//   export function set(
//     formValues: FlowFields,
//     path: FlowPosition[],
//     name: string,
//     keys: string[]
//   ): FlowFields {
//     return formValues;
//   }

//   export function get(params: {
//     formValues: FlowFields;
//     path: FlowPosition[];
//     name: string;
//     keys: string[];
//     defaultValue: string;
//   }): Value {
//     const { formValues, path, keys } = params;
//     const formFields = getFromPath({ formValues, path }) as FormFields;
//     const name = formFields[params.name];
//     const item = keys.reduce((item, key) => item.keys[key], name);
//     return item.data;
//   }

//   export function getFromPath(params: {
//     formValues: FlowFields;
//     path: FlowPosition[];
//   }): FlowFields | FormFields {
//     return params.path.reduce((formValues: FlowFields | FormFields, position: FlowPosition) => {
//       return getFromPosition({
//         formValues: formValues as FlowFields,
//         position,
//       });
//     }, params.formValues);
//   }

//   function getFromPosition(params: {
//     formValues: FlowFields;
//     position: FlowPosition;
//   }): FlowFields | FormFields {
//     if (params.formValues[0] === "list") {
//       const formValues = params.formValues;
//       const position = params.position as ListPosition;
//       return ListFieldsUtils.getFromPosition({ formValues, position });
//     }
//     if (params.formValues[0] === "cond") {
//       const formValues = params.formValues;
//       const position = params.position as CondPosition;
//       return CondFieldsUtils.getFromPosition({ formValues, position });
//     }
//     if (params.formValues[0] === "loop") {
//       const formValues = params.formValues;
//       const position = params.position as LoopPosition;
//       return LoopFieldsUtils.getFromPosition({ formValues, position });
//     }
//     throw new Error(`Unknown position type: ${params.position[0]}`);
//   }
// }

// namespace ListFieldsUtils {
//   export function getFromPosition(params: {
//     formValues: ListFields;
//     position: ListPosition;
//   }): FlowFields | FormFields {
//     const index = params.position[1];
//     return params.formValues[1][index];
//   }
// }

// namespace CondFieldsUtils {
//   export function getFromPosition(params: {
//     formValues: CondFields;
//     position: CondPosition;
//   }): FlowFields | FormFields {
//     const [branch, index] = params.position[1];
//     return params.formValues[1][branch][index];
//   }
// }

// namespace LoopFieldsUtils {
//   export function getFromPosition(params: {
//     formValues: LoopFields;
//     position: LoopPosition;
//   }): FlowFields | FormFields {
//     const index = params.position[1];
//     return params.formValues[1][index];
//   }
// }
