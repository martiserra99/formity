import type { Flow, s } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, Layout, Select, NextButton, BackButton } from "./components";

import { FormControls } from "./form-controls";

export type LoopSchema = {
  render: React.ReactNode;
  struct: [
    s.Variables<{ languages: { value: string; question: string }[] }>,
    s.Variables<{
      i: number;
      languagesRatings: { name: string; rating: string }[];
    }>,
    s.Loop<
      [
        s.Variables<{ language: { value: string; question: string } }>,
        s.Form<{ rating: string }>,
        s.Variables<{
          i: number;
          languagesRatings: { name: string; rating: string }[];
        }>,
      ]
    >,
    s.Return<{ languagesRatings: { name: string; rating: string }[] }>,
  ];
  inputs: Record<never, never>;
  params: Record<never, never>;
};

export const loopFlow: Flow<LoopSchema> = [
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
            fields: ({ language }) => ({
              rating: ["love-it", [language.value]],
            }),
            render: ({ fields, values, ...rest }) => (
              <FormControls step={`rating-${values.language.value}`} {...rest}>
                <Form
                  defaultValues={fields}
                  resolver={zodResolver(
                    z.object({
                      rating: z.string(),
                    }),
                  )}
                >
                  <Layout
                    heading={values.language.question}
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
                    back={values.i > 0 ? <BackButton /> : undefined}
                  />
                </Form>
              </FormControls>
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
