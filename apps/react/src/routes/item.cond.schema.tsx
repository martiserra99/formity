import type { Schema, Form, Cond, Return } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormView,
  FormLayout,
  YesNo,
  MultiSelect,
  Listbox,
  Next,
  Back,
} from "../components";

import { Controller } from "../controller";

export type Values = [
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

export const schema: Schema<Values> = [
  {
    form: {
      values: () => ({
        softwareDeveloper: [true, []],
      }),
      render: ({ values, onNext, onBack, getFlow, setFlow }) => (
        <Controller
          step="softwareDeveloper"
          onNext={onNext}
          onBack={onBack}
          getFlow={getFlow}
          setFlow={setFlow}
        >
          <FormView
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                softwareDeveloper: z.boolean(),
              })
            )}
          >
            <FormLayout
              heading="Are you a software developer?"
              description="We would like to know if you are a software developer"
              fields={[
                <YesNo
                  key="softwareDeveloper"
                  name="softwareDeveloper"
                  label="Software Developer"
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
    cond: {
      if: ({ softwareDeveloper }) => softwareDeveloper,
      then: [
        {
          form: {
            values: () => ({
              languages: [[], []],
            }),
            render: ({ values, onNext, onBack, getFlow, setFlow }) => (
              <Controller
                step="languages"
                onNext={onNext}
                onBack={onBack}
                getFlow={getFlow}
                setFlow={setFlow}
              >
                <FormView
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      languages: z.array(z.string()),
                    })
                  )}
                >
                  <FormLayout
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
                    button={<Next>Next</Next>}
                    back={<Back />}
                  />
                </FormView>
              </Controller>
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
                    button={<Next>Next</Next>}
                    back={<Back />}
                  />
                </FormView>
              </Controller>
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
