import type { Schema, Form, Return, Variables } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormView,
  FormLayout,
  Row,
  TextField,
  Next,
  Back,
} from "../components";

import { Controller } from "../controller";

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
        render: ({ values, onNext, onBack, getFlow, setFlow }) => (
          <Controller
            step="name-surname"
            onNext={onNext}
            onBack={onBack}
            getFlow={getFlow}
            setFlow={setFlow}
          >
            <FormView
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
              <FormLayout
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
                button={<Next>Next</Next>}
                back={<Back />}
              />
            </FormView>
          </Controller>
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
