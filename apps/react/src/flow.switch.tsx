import type { Flow, s } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  Layout,
  TextField,
  Listbox,
  NextButton,
  BackButton,
} from "./components";

import { FormControls } from "./form-controls";

export type SwitchShape = {
  render: React.ReactNode;
  schema: [
    s.Form<{ interested: string }>,
    s.Switch<{
      branches: [
        [
          s.Form<{ whyYes: string }>,
          s.Return<{ interested: "yes"; whyYes: string }>,
        ],
        [
          s.Form<{ whyNot: string }>,
          s.Return<{ interested: "no"; whyNot: string }>,
        ],
        [
          s.Form<{ whyMaybe: string }>,
          s.Return<{ interested: "maybe"; whyMaybe: string }>,
        ],
      ];
      default: [
        s.Form<{ whyNotSure: string }>,
        s.Return<{ interested: "notSure"; whyNotSure: string }>,
      ];
    }>,
  ];
  inputs: Record<never, never>;
  params: Record<never, never>;
};

export const switchFlow: Flow<SwitchShape> = [
  {
    form: {
      values: () => ({
        interested: ["yes", []],
      }),
      render: ({ values, ...rest }) => (
        <FormControls step="interested" {...rest}>
          <Form
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                interested: z.string(),
              }),
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
          </Form>
        </FormControls>
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
                  <FormControls step="whyYes" {...rest}>
                    <Form
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyYes: z.string(),
                        }),
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
                    </Form>
                  </FormControls>
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
                  <FormControls step="whyNot" {...rest}>
                    <Form
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyNot: z.string(),
                        }),
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
                    </Form>
                  </FormControls>
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
                  <FormControls step="whyMaybe" {...rest}>
                    <Form
                      defaultValues={values}
                      resolver={zodResolver(
                        z.object({
                          whyMaybe: z.string(),
                        }),
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
                    </Form>
                  </FormControls>
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
              <FormControls step="whyNotSure" {...rest}>
                <Form
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      whyNotSure: z.string(),
                    }),
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
                </Form>
              </FormControls>
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
