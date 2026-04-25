import type { Flow, s } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, Layout, Row, TextField, NextButton } from "./components";

import type { Render } from "./render";

export type ListSchema = [
  s.Variables<{ fullName: string }>,
  [
    s.Form<{ name: string; surname: string }>,
    [s.Variables<{ fullName: string }>],
  ],
  s.Return<{ fullName: string }>,
];

export const listFlow: Flow<Render, ListSchema> = [
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
        render: ({ values }) => ({
          step: "nameSurname",
          Form: () => (
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
          ),
        }),
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
