import type { Schema, Form, Return, Variables } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Step, Layout, Row, TextField, NextButton } from "../components";

import { MultiStep } from "../multi-step";

export type ListValues = [
  Variables<{ fullName: string }>,
  [Form<{ name: string; surname: string }>, [Variables<{ fullName: string }>]],
  Return<{ fullName: string }>
];

export const listSchema: Schema<ListValues> = [
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
          <MultiStep step="name-surname" {...rest}>
            <Step
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
                })
              )}
            >
              <Layout
                heading="Tell us your name"
                description="We would want to know your name"
                fields={[
                  <Row
                    key="name-surname"
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
            </Step>
          </MultiStep>
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
