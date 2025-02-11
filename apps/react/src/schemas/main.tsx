import type {
  Schema,
  Cond,
  Loop,
  Form,
  Yield,
  Return,
  Variables,
} from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Step,
  Layout,
  Row,
  TextField,
  NumberField,
  MultiSelect,
  Listbox,
  Select,
  YesNo,
  NextButton,
  BackButton,
} from "../components";

import { MultiStep } from "../multi-step";

export type MainValues = [
  Form<{ name: string; surname: string; age: number }>,
  Yield<{
    next: [
      { type: "next"; data: { name: string } },
      { type: "next"; data: { surname: string } },
      { type: "next"; data: { age: number } }
    ];
    back: [
      { type: "back"; data: { name: string } },
      { type: "back"; data: { surname: string } },
      { type: "back"; data: { age: number } }
    ];
  }>,
  Form<{ softwareDeveloper: boolean }>,
  Yield<{
    next: [{ type: "next"; data: { softwareDeveloper: boolean } }];
    back: [{ type: "back"; data: { softwareDeveloper: boolean } }];
  }>,
  Cond<{
    then: [
      Variables<{
        languagesOptions: { value: string; label: string }[];
        questions: Record<string, string>;
      }>,
      Form<{ languages: string[] }>,
      Yield<{
        next: [{ type: "next"; data: { languages: string[] } }];
        back: [{ type: "back"; data: { languages: string[] } }];
      }>,
      Variables<{
        i: number;
        languagesRatings: { name: string; rating: string }[];
      }>,
      Loop<
        [
          Variables<{ language: string }>,
          Variables<{ question: string }>,
          Form<{ rating: string }>,
          Yield<{
            next: [{ type: "next"; data: { rating: string } }];
            back: [{ type: "back"; data: { rating: string } }];
          }>,
          Variables<{
            i: number;
            languagesRatings: { name: string; rating: string }[];
          }>
        ]
      >,
      Return<{
        fullName: string;
        age: number;
        softwareDeveloper: true;
        languages: { name: string; rating: string }[];
      }>
    ];
    else: [
      Form<{ interested: string }>,
      Yield<{
        next: [{ type: "next"; data: { interested: string } }];
        back: [{ type: "back"; data: { interested: string } }];
      }>,
      Return<{
        fullName: string;
        age: number;
        softwareDeveloper: false;
        interested: string;
      }>
    ];
  }>
];

export const mainSchema: Schema<MainValues> = [
  {
    form: {
      values: () => ({
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      }),
      render: ({ values, ...rest }) => (
        <MultiStep step="name" {...rest}>
          <Step
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                name: z
                  .string()
                  .min(1, { message: "Required" })
                  .max(20, { message: "Must be at most 20 characters" }),
                surname: z
                  .string()
                  .min(1, { message: "Required" })
                  .max(20, { message: "Must be at most 20 characters" }),
                age: z
                  .number()
                  .min(18, { message: "Minimum of 18 years old" })
                  .max(99, { message: "Maximum of 99 years old" }),
              })
            )}
          >
            <Layout
              heading="Tell us about yourself"
              description="We would want to know a little bit more about you"
              fields={[
                <Row
                  key="nameSurname"
                  items={[
                    <TextField key="name" name="name" label="Name" />,
                    <TextField key="surname" name="surname" label="Surname" />,
                  ]}
                />,
                <NumberField key="age" name="age" label="Age" />,
              ]}
              button={<NextButton>Next</NextButton>}
            />
          </Step>
        </MultiStep>
      ),
    },
  },
  {
    yield: {
      next: ({ name, surname, age }) => [
        { type: "next", data: { name } },
        { type: "next", data: { surname } },
        { type: "next", data: { age } },
      ],
      back: ({ name, surname, age }) => [
        { type: "back", data: { name } },
        { type: "back", data: { surname } },
        { type: "back", data: { age } },
      ],
    },
  },
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
              back={<BackButton />}
            />
          </Step>
        </MultiStep>
      ),
    },
  },
  {
    yield: {
      next: ({ softwareDeveloper }) => [
        { type: "next", data: { softwareDeveloper } },
      ],
      back: ({ softwareDeveloper }) => [
        { type: "back", data: { softwareDeveloper } },
      ],
    },
  },
  {
    cond: {
      if: ({ softwareDeveloper }) => softwareDeveloper,
      then: [
        {
          variables: () => ({
            languagesOptions: [
              { value: "javascript", label: "JavaScript" },
              { value: "python", label: "Python" },
              { value: "go", label: "Go" },
            ],
            questions: {
              javascript:
                "What rating would you give to the JavaScript language?",
              python: "What rating would you give to the Python language?",
              go: "What rating would you give to the Go language?",
            },
          }),
        },
        {
          form: {
            values: () => ({
              languages: [[], []],
            }),
            render: ({ inputs, values, ...rest }) => (
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
                        options={inputs.languagesOptions}
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
          yield: {
            next: ({ languages }) => [{ type: "next", data: { languages } }],
            back: ({ languages }) => [{ type: "back", data: { languages } }],
          },
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
                variables: ({ questions, language }) => ({
                  question: questions[language],
                }),
              },
              {
                form: {
                  values: ({ language }) => ({
                    rating: ["love-it", [language]],
                  }),
                  render: ({ inputs, values, ...rest }) => (
                    <MultiStep step={`rating-${inputs.language}`} {...rest}>
                      <Step
                        defaultValues={values}
                        resolver={zodResolver(
                          z.object({
                            rating: z.string(),
                          })
                        )}
                      >
                        <Layout
                          heading={inputs.question}
                          description="Since you said it is one of your favourite languages, we would like to know how much you like it"
                          fields={[
                            <Select
                              key="rating"
                              name="rating"
                              label="Rating"
                              options={[
                                {
                                  value: "love-it",
                                  label: "Love it",
                                },
                                {
                                  value: "like-it-a-lot",
                                  label: "Like it a lot",
                                },
                                {
                                  value: "it-is-okay",
                                  label: "It's okay",
                                },
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
                yield: {
                  next: ({ rating }) => [{ type: "next", data: { rating } }],
                  back: ({ rating }) => [{ type: "back", data: { rating } }],
                },
              },
              {
                variables: ({ i, languagesRatings, language, rating }) => ({
                  i: i + 1,
                  languagesRatings: [
                    ...languagesRatings,
                    { name: language, rating },
                  ],
                }),
              },
            ],
          },
        },
        {
          return: ({ name, surname, age, languagesRatings }) => ({
            fullName: `${name} ${surname}`,
            age,
            softwareDeveloper: true,
            languages: languagesRatings,
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
          yield: {
            next: ({ interested }) => [{ type: "next", data: { interested } }],
            back: ({ interested }) => [{ type: "back", data: { interested } }],
          },
        },
        {
          return: ({ name, surname, age, interested }) => ({
            fullName: `${name} ${surname}`,
            age,
            softwareDeveloper: false,
            interested,
          }),
        },
      ],
    },
  },
];
