import type { Schema, Loop, Form, Return, Variables } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Step, Layout, Select, NextButton, BackButton } from "../components";

import { MultiStep } from "../multi-step";

export type LoopValues = [
  Variables<{ languages: { value: string; question: string }[] }>,
  Variables<{
    i: number;
    languagesRatings: { name: string; rating: string }[];
  }>,
  Loop<
    [
      Variables<{ language: { value: string; question: string } }>,
      Form<{ rating: string }>,
      Variables<{
        i: number;
        languagesRatings: { name: string; rating: string }[];
      }>
    ]
  >,
  Return<{ languagesRatings: { name: string; rating: string }[] }>
];

export const loopSchema: Schema<LoopValues> = [
  {
    variables: () => ({
      languages: [
        {
          value: "javascript",
          question: "What rating would you give to the JavaScript language?",
        },
        {
          value: "python",
          question: "What rating would you give to the Python language?",
        },
        {
          value: "go",
          question: "What rating would you give to the Go language?",
        },
      ],
    }),
  },
  {
    variables: () => ({
      i: 0,
      languagesRatings: [],
    }),
  },
  {
    loop: {
      while: ({ i, languages }) => i < languages.length,
      do: [
        {
          variables: ({ i, languages }) => ({
            language: languages[i],
          }),
        },
        {
          form: {
            values: ({ language }) => ({
              rating: ["love-it", [language.value]],
            }),
            render: ({ inputs, values, ...rest }) => (
              <MultiStep step={`rating-${inputs.language.value}`} {...rest}>
                <Step
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      rating: z.string(),
                    })
                  )}
                >
                  <Layout
                    heading={inputs.language.question}
                    description="We would like to know how much you like it"
                    fields={[
                      <Select
                        key="rating"
                        name="rating"
                        label="Rating"
                        options={[
                          { value: "love-it", label: "Love it" },
                          { value: "like-it-a-lot", label: "Like it a lot" },
                          { value: "it-is-okay", label: "It is okay" },
                        ]}
                        direction="y"
                      />,
                    ]}
                    button={<NextButton>Next</NextButton>}
                    back={inputs.i > 0 ? <BackButton /> : undefined}
                  />
                </Step>
              </MultiStep>
            ),
          },
        },
        {
          variables: ({ i, languagesRatings, language, rating }) => ({
            i: i + 1,
            languagesRatings: [
              ...languagesRatings,
              { name: language.value, rating },
            ],
          }),
        },
      ],
    },
  },
  {
    return: ({ languagesRatings }) => ({
      languagesRatings,
    }),
  },
];
