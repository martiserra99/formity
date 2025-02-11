import type { Schema, Cond, Form, Return } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Step,
  Layout,
  MultiSelect,
  Listbox,
  YesNo,
  NextButton,
  BackButton,
} from "../components";

import { MultiStep } from "../multi-step";

export type CondValues = [
  Form<{ softwareDeveloper: boolean }>,
  Cond<{
    then: [
      Form<{ languages: string[] }>,
      Return<{
        softwareDeveloper: boolean;
        languages: string[];
      }>
    ];
    else: [
      Form<{ interested: string }>,
      Return<{
        softwareDeveloper: boolean;
        interested: string;
      }>
    ];
  }>
];

export const condSchema: Schema<CondValues> = [
  {
    form: {
      values: () => ({
        softwareDeveloper: [true, []],
      }),
      render: ({ values, ...rest }) => (
        <MultiStep step="softwareDeveloper" {...rest}>
          <Step
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                softwareDeveloper: z.boolean(),
              })
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
          </Step>
        </MultiStep>
      ),
    },
  },
  {
    cond: {
      if: ({ softwareDeveloper }) => softwareDeveloper,
      then: [
        {
          form: {
            values: () => ({
              languages: [[], []],
            }),
            render: ({ values, ...rest }) => (
              <MultiStep step="languages" {...rest}>
                <Step
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      languages: z.array(z.string()),
                    })
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
                </Step>
              </MultiStep>
            ),
          },
        },
        {
          return: ({ softwareDeveloper, languages }) => ({
            softwareDeveloper,
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
                </Step>
              </MultiStep>
            ),
          },
        },
        {
          return: ({ softwareDeveloper, interested }) => ({
            softwareDeveloper,
            interested,
          }),
        },
      ],
    },
  },
];
