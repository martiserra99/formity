import type { Schema, Switch, Form, Return } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormView,
  FormLayout,
  TextField,
  Listbox,
  Next,
  Back,
} from "../components";

import { Controller } from "../controller";

export type SwitchValues = [
  Form<{ interested: string }>,
  Switch<{
    branches: [
      [
        Form<{ whyYes: string }>,
        Return<{ interested: string; whyYes: string }>
      ],
      [
        Form<{ whyNot: string }>,
        Return<{ interested: string; whyNot: string }>
      ],
      [
        Form<{ whyMaybe: string }>,
        Return<{ interested: string; whyMaybe: string }>
      ]
    ];
    default: [
      Form<{ whyNotSure: string }>,
      Return<{ interested: string; whyNotSure: string }>
    ];
  }>
];

export const switchSchema: Schema<SwitchValues> = [
  {
    form: {
      values: () => ({
        interested: ["yes", []],
      }),
      render: ({ values, onNext, onBack, getFlow, setFlow }) => (
        <Controller
          step="interested"
          onNext={onNext}
          onBack={onBack}
          getFlow={getFlow}
          setFlow={setFlow}
        >
          <FormView
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                interested: z.string(),
              })
            )}
          >
            <FormLayout
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
                      value: "not-sure",
                      label: "I am not sure.",
                    },
                  ]}
                />,
              ]}
              button={<Next>Next</Next>}
            />
          </FormView>
        </Controller>
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
                render: ({ values, onNext, onBack, getFlow, setFlow }) => (
                  <Controller
                    step="whyYes"
                    onNext={onNext}
                    onBack={onBack}
                    getFlow={getFlow}
                    setFlow={setFlow}
                  >
                    <FormView
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyYes: z.string(),
                        })
                      )}
                    >
                      <FormLayout
                        heading="Why are you interested?"
                        description="We would like to know why you are interested"
                        fields={[
                          <TextField key="whyYes" name="whyYes" label="Why?" />,
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
              return: ({ interested, whyYes }) => ({
                interested,
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
                render: ({ values, onNext, onBack, getFlow, setFlow }) => (
                  <Controller
                    step="whyNot"
                    onNext={onNext}
                    onBack={onBack}
                    getFlow={getFlow}
                    setFlow={setFlow}
                  >
                    <FormView
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyNot: z.string(),
                        })
                      )}
                    >
                      <FormLayout
                        heading="Why are you not interested?"
                        description="We would like to know why you are not interested"
                        fields={[
                          <TextField key="whyNot" name="whyNot" label="Why?" />,
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
              return: ({ interested, whyNot }) => ({
                interested,
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
                render: ({ values, onNext, onBack, getFlow, setFlow }) => (
                  <Controller
                    step="whyMaybe"
                    onNext={onNext}
                    onBack={onBack}
                    getFlow={getFlow}
                    setFlow={setFlow}
                  >
                    <FormView
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyMaybe: z.string(),
                        })
                      )}
                    >
                      <FormLayout
                        heading="Why are you maybe interested?"
                        description="We would like to know why you are maybe interested"
                        fields={[
                          <TextField
                            key="whyMaybe"
                            name="whyMaybe"
                            label="Why?"
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
            {
              return: ({ interested, whyMaybe }) => ({
                interested,
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
            render: ({ values, onNext, onBack, getFlow, setFlow }) => (
              <Controller
                step="whyNotSure"
                onNext={onNext}
                onBack={onBack}
                getFlow={getFlow}
                setFlow={setFlow}
              >
                <FormView
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      whyNotSure: z.string(),
                    })
                  )}
                >
                  <FormLayout
                    heading="Why are you not sure?"
                    description="We would like to know why you are not sure"
                    fields={[
                      <TextField
                        key="whyNotSure"
                        name="whyNotSure"
                        label="Why?"
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
        {
          return: ({ interested, whyNotSure }) => ({
            interested,
            whyNotSure,
          }),
        },
      ],
    },
  },
];
