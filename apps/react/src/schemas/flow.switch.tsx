import type { Schema, Switch, Form, Return } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Step,
  Layout,
  TextField,
  Listbox,
  NextButton,
  BackButton,
} from "../components";

import { MultiStep } from "../multi-step";

export type SwitchValues = [
  Form<{ interested: string }>,
  Switch<{
    branches: [
      [Form<{ whyYes: string }>, Return<{ interested: "yes"; whyYes: string }>],
      [Form<{ whyNot: string }>, Return<{ interested: "no"; whyNot: string }>],
      [
        Form<{ whyMaybe: string }>,
        Return<{ interested: "maybe"; whyMaybe: string }>
      ]
    ];
    default: [
      Form<{ whyNotSure: string }>,
      Return<{ interested: "notSure"; whyNotSure: string }>
    ];
  }>
];

export const switchSchema: Schema<SwitchValues> = [
  {
    form: {
      values: () => ({
        interested: ["yes", []],
      }),
      render: ({ values, ...rest }) => (
        <MultiStep step="interested" {...rest}>
          <Step
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                interested: z.string(),
              })
            )}
          >
            <Layout
              heading="Would you be interested in learning how to code?"
              description="Having coding skills can be very beneficial"
              fields={[
                <Listbox
                  key="interested"
                  name="interested"
                  label="Interested"
                  options={[
                    {
                      value: "yes",
                      label: "Yes, that sounds good.",
                    },
                    {
                      value: "no",
                      label: "No, it is not for me.",
                    },
                    {
                      value: "maybe",
                      label: "Maybe in another time.",
                    },
                    {
                      value: "notSure",
                      label: "I am not sure.",
                    },
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
  {
    switch: {
      branches: [
        {
          case: ({ interested }) => interested === "yes",
          then: [
            {
              form: {
                values: () => ({
                  whyYes: ["", []],
                }),
                render: ({ values, ...rest }) => (
                  <MultiStep step="whyYes" {...rest}>
                    <Step
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyYes: z.string(),
                        })
                      )}
                    >
                      <Layout
                        heading="Why are you interested?"
                        description="We would like to know why you are interested"
                        fields={[
                          <TextField key="whyYes" name="whyYes" label="Why?" />,
                        ]}
                        button={<NextButton>Next</NextButton>}
                        back={<BackButton />}
                      />
                    </Step>
                  </MultiStep>
                ),
              },
            },
            {
              return: ({ whyYes }) => ({
                interested: "yes",
                whyYes,
              }),
            },
          ],
        },
        {
          case: ({ interested }) => interested === "no",
          then: [
            {
              form: {
                values: () => ({
                  whyNot: ["", []],
                }),
                render: ({ values, ...rest }) => (
                  <MultiStep step="whyNot" {...rest}>
                    <Step
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyNot: z.string(),
                        })
                      )}
                    >
                      <Layout
                        heading="Why are you not interested?"
                        description="We would like to know why you are not interested"
                        fields={[
                          <TextField key="whyNot" name="whyNot" label="Why?" />,
                        ]}
                        button={<NextButton>Next</NextButton>}
                        back={<BackButton />}
                      />
                    </Step>
                  </MultiStep>
                ),
              },
            },
            {
              return: ({ whyNot }) => ({
                interested: "no",
                whyNot,
              }),
            },
          ],
        },
        {
          case: ({ interested }) => interested === "maybe",
          then: [
            {
              form: {
                values: () => ({
                  whyMaybe: ["", []],
                }),
                render: ({ values, ...rest }) => (
                  <MultiStep step="whyMaybe" {...rest}>
                    <Step
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyMaybe: z.string(),
                        })
                      )}
                    >
                      <Layout
                        heading="Why are you maybe interested?"
                        description="We would like to know why you are maybe interested"
                        fields={[
                          <TextField
                            key="whyMaybe"
                            name="whyMaybe"
                            label="Why?"
                          />,
                        ]}
                        button={<NextButton>Next</NextButton>}
                        back={<BackButton />}
                      />
                    </Step>
                  </MultiStep>
                ),
              },
            },
            {
              return: ({ whyMaybe }) => ({
                interested: "maybe",
                whyMaybe,
              }),
            },
          ],
        },
      ],
      default: [
        {
          form: {
            values: () => ({
              whyNotSure: ["", []],
            }),
            render: ({ values, ...rest }) => (
              <MultiStep step="whyNotSure" {...rest}>
                <Step
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      whyNotSure: z.string(),
                    })
                  )}
                >
                  <Layout
                    heading="Why are you not sure?"
                    description="We would like to know why you are not sure"
                    fields={[
                      <TextField
                        key="whyNotSure"
                        name="whyNotSure"
                        label="Why?"
                      />,
                    ]}
                    button={<NextButton>Next</NextButton>}
                    back={<BackButton />}
                  />
                </Step>
              </MultiStep>
            ),
          },
        },
        {
          return: ({ whyNotSure }) => ({
            interested: "notSure",
            whyNotSure,
          }),
        },
      ],
    },
  },
];
