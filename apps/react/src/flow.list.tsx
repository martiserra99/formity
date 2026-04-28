import type { Flow, s } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, Layout, Row, TextField, NextButton } from "./components";

import { FormControls } from "./form-controls";

export type ListDefinition = {
  render: React.ReactNode;
  schema: [
    s.Variables<{ fullName: string }>,
    [
      s.Form<{ name: string; surname: string }>,
      [s.Variables<{ fullName: string }>],
    ],
    s.Return<{ fullName: string }>,
  ];
  inputs: Record<never, never>;
  params: Record<never, never>;
};

export const listFlow: Flow<ListDefinition> = [
  {
    variables: () => ({
      fullName: "",
    }),
  },
  [
    {
      form: {
        values: () => ({
          name: ["", []],
          surname: ["", []],
        }),
        render: ({ values, ...rest }) => (
          <FormControls step="nameSurname" {...rest}>
            <Form
              defaultValues={values}
              resolver={zodResolver(
                z.object({
                  name: z
                    .string()
                    .min(1, { message: "Required" })
                    .max(20, { message: "Must be at most 20 characters" }),
                  surname: z
                    .string()
                    .min(1, { message: "Required" })
                    .max(20, { message: "Must be at most 20 characters" }),
                }),
              )}
            >
              <Layout
                heading="Tell us your name"
                description="We would want to know your name"
                fields={[
                  <Row
                    key="nameSurname"
                    items={[
                      <TextField key="name" name="name" label="Name" />,
                      <TextField
                        key="surname"
                        name="surname"
                        label="Surname"
                      />,
                    ]}
                  />,
                ]}
                button={<NextButton>Next</NextButton>}
              />
            </Form>
          </FormControls>
        ),
      },
    },
    [
      {
        variables: ({ name, surname }) => ({
          fullName: `${name} ${surname}`,
        }),
      },
    ],
  ],
  {
    return: ({ fullName }) => ({
      fullName,
    }),
  },
];
