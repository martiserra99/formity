import type { Schema, Form, Yield, Return } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormView, FormLayout, TextField, Next, Back } from "../components";

import { Controller } from "../controller";

export type Values = [
  Form<{ name: string }>,
  Yield<{ name: string }>,
  Form<{ surname: string }>,
  Yield<{ surname: string }>,
  Return<{ name: string; surname: string }>
];

export const schema: Schema<Values> = [
  {
    form: {
      values: () => ({
        name: ["", []],
      }),
      render: ({ values, onNext, onBack, getFlow, setFlow }) => (
        <Controller
          step="name"
          onNext={onNext}
          onBack={onBack}
          getFlow={getFlow}
          setFlow={setFlow}
        >
          <FormView
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                name: z.string(),
              })
            )}
          >
            <FormLayout
              heading="What is your name?"
              description="We would like to know what is your name"
              fields={[<TextField key="name" name="name" label="Name" />]}
              button={<Next>Next</Next>}
            />
          </FormView>
        </Controller>
      ),
    },
  },
  {
    yield: ({ name }) => ({
      name,
    }),
  },
  {
    form: {
      values: () => ({
        surname: ["", []],
      }),
      render: ({ values, onNext, onBack, getFlow, setFlow }) => (
        <Controller
          step="surname"
          onNext={onNext}
          onBack={onBack}
          getFlow={getFlow}
          setFlow={setFlow}
        >
          <FormView
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                surname: z.string(),
              })
            )}
          >
            <FormLayout
              heading="What is your surname?"
              description="We would like to know what is your surname"
              fields={[
                <TextField key="surname" name="surname" label="Surname" />,
              ]}
              button={<Next>Next</Next>}
              back={<Back />}
            />
          </FormView>
        </Controller>
      ),
    },
  },
  {
    yield: ({ surname }) => ({
      surname,
    }),
  },
  {
    return: ({ name, surname }) => ({
      name,
      surname,
    }),
  },
];
