import type { Schema, Form, Return, Variables } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormView, FormLayout, TextField, Next } from "../components";

import { Controller } from "../controller";

export type Values = [
  Form<{ name: string; surname: string }>,
  Variables<{ fullName: string }>,
  Return<{ fullName: string }>
];

export const schema: Schema<Values> = [
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
                name: z.string(),
                surname: z.string(),
              })
            )}
          >
            <FormLayout
              heading="What is your name?"
              description="We would like to know what is your name"
              fields={[
                <TextField key="name" name="name" label="Name" />,
                <TextField key="surname" name="surname" label="Surname" />,
              ]}
              button={<Next>Next</Next>}
            />
          </FormView>
        </Controller>
      ),
    },
  },
  {
    variables: ({ name, surname }) => ({
      fullName: `${name} ${surname}`,
    }),
  },
  {
    return: ({ fullName }) => ({
      fullName,
    }),
  },
];
