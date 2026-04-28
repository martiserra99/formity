import type { Flow, s } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  Layout,
  MultiSelect,
  Listbox,
  YesNo,
  NextButton,
  BackButton,
} from "./components";

import { FormControls } from "./form-controls";

export type ConditionDefinition = {
  render: React.ReactNode;
  schema: [
    s.Form<{ softwareDeveloper: boolean }>,
    s.Condition<{
      then: [
        s.Form<{ languages: string[] }>,
        s.Return<{
          softwareDeveloper: true;
          languages: string[];
        }>,
      ];
      else: [
        s.Form<{ interested: string }>,
        s.Return<{
          softwareDeveloper: false;
          interested: string;
        }>,
      ];
    }>,
  ];
  inputs: Record<never, never>;
  params: Record<never, never>;
};

export const conditionFlow: Flow<ConditionDefinition> = [
  {
    form: {
      values: () => ({
        softwareDeveloper: [true, []],
      }),
      render: ({ values, ...rest }) => (
        <FormControls step="softwareDeveloper" {...rest}>
          <Form
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                softwareDeveloper: z.boolean(),
              }),
            )}
          >
            <Layout
              heading="Are you a software developer?"
              description="We would like to know if you are a software developer"
              fields={[
                <YesNo
                  key="softwareDeveloper"
                  name="softwareDeveloper"
                  label="Software Developer"
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
    condition: {
      if: ({ softwareDeveloper }) => softwareDeveloper,
      then: [
        {
          form: {
            values: () => ({
              languages: [[], []],
            }),
            render: ({ values, ...rest }) => (
              <FormControls step="languages" {...rest}>
                <Form
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      languages: z.array(z.string()),
                    }),
                  )}
                >
                  <Layout
                    heading="What are your favourite programming languages?"
                    description="We would like to know which of the following programming languages you like the most"
                    fields={[
                      <MultiSelect
                        key="languages"
                        name="languages"
                        label="Languages"
                        options={[
                          { value: "javascript", label: "JavaScript" },
                          { value: "python", label: "Python" },
                          { value: "go", label: "Go" },
                        ]}
                        direction="y"
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
          return: ({ languages }) => ({
            softwareDeveloper: true,
            languages,
          }),
        },
      ],
      else: [
        {
          form: {
            values: () => ({
              interested: ["maybe", []],
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
                            value: "maybe",
                            label: "Maybe in another time.",
                          },
                          {
                            value: "yes",
                            label: "Yes, that sounds good.",
                          },
                          {
                            value: "no",
                            label: "No, it is not for me.",
                          },
                        ]}
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
          return: ({ interested }) => ({
            softwareDeveloper: false,
            interested,
          }),
        },
      ],
    },
  },
];
