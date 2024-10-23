import type {
  Components,
  Step,
  DefaultValues,
  Resolver,
  OnNext,
  OnBack,
} from "formity";
import type { Value } from "expry";

import { Fragment } from "react";

import Screen from "src/components/screen";
import Form from "src/components/form";
import FormLayout from "src/components/form-layout";
import Next from "src/components/navigation/next";
import Back from "src/components/navigation/back";
import Row from "src/components/user-interface/row";
import TextField from "src/components/react-hook-form/text-field";
import NumberField from "src/components/react-hook-form/number-field";
import Listbox from "src/components/react-hook-form/listbox";
import YesNo from "src/components/react-hook-form/yes-no";
import Select from "src/components/react-hook-form/select";
import MultiSelect from "src/components/react-hook-form/multi-select";

type Parameters = {
  screen: {
    progress: { total: number; current: number };
    children: Value;
  };
  form: {
    step: Step;
    defaultValues: DefaultValues;
    resolver: Resolver;
    onNext: OnNext;
    children: Value;
  };
  formLayout: {
    heading: string;
    description: string;
    fields: Value[];
    button: Value;
    back?: Value;
  };
  next: {
    text: string;
  };
  back: {
    onBack: OnBack;
  };
  row: {
    items: Value[];
  };
  textField: {
    name: string;
    label: string;
    cy: string;
  };
  numberField: {
    name: string;
    label: string;
    cy: string;
  };
  listbox: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    cy: string;
  };
  yesNo: {
    name: string;
    label: string;
    cy: string;
  };
  select: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    direction: "x" | "y";
    cy: string;
  };
  multiSelect: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    direction: "x" | "y";
    cy: string;
  };
};

const components: Components<Parameters> = {
  screen: ({ progress, children }, render) => (
    <Screen progress={progress}>{render(children)}</Screen>
  ),
  form: ({ step, defaultValues, resolver, onNext, children }, render) => (
    <Form
      step={step}
      defaultValues={defaultValues}
      resolver={resolver}
      onNext={onNext}
    >
      {render(children)}
    </Form>
  ),
  formLayout: ({ heading, description, fields, button, back }, render) => (
    <FormLayout
      heading={heading}
      description={description}
      fields={fields.map((field, index) => (
        <Fragment key={index}>{render(field)}</Fragment>
      ))}
      button={render(button)}
      back={back ? render(back) : undefined}
    />
  ),
  next: ({ text }) => <Next>{text}</Next>,
  back: ({ onBack }) => <Back onBack={onBack} />,
  row: ({ items }, render) => (
    <Row
      items={items.map((item, index) => (
        <Fragment key={index}>{render(item)}</Fragment>
      ))}
    />
  ),
  textField: ({ name, label, cy }) => (
    <TextField name={name} label={label} cy={cy} />
  ),
  numberField: ({ name, label, cy }) => (
    <NumberField name={name} label={label} cy={cy} />
  ),
  listbox: ({ name, label, options, cy }) => (
    <Listbox name={name} label={label} options={options} cy={cy} />
  ),
  yesNo: ({ name, label, cy }) => <YesNo name={name} label={label} cy={cy} />,
  select: ({ name, label, options, direction, cy }) => (
    <Select
      name={name}
      label={label}
      options={options}
      direction={direction}
      cy={cy}
    />
  ),
  multiSelect: ({ name, label, options, direction, cy }) => (
    <MultiSelect
      name={name}
      label={label}
      options={options}
      direction={direction}
      cy={cy}
    />
  ),
};

export default components;
