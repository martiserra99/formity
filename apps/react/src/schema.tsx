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
  Screen,
  FormView,
  FormLayout,
  Row,
  TextField,
  NumberField,
  YesNo,
  Next,
  Back,
  MultiSelect,
  Select,
  Listbox,
} from "./components";

export type Values = [
  Form<{ name: string; surname: string; age: number }>,
  Yield<{ name: string; surname: string; age: number }>,
  Form<{ softwareDeveloper: boolean }>,
  Yield<{ softwareDeveloper: boolean }>,
  Cond<{
    then: [
      Variables<{
        languagesOptions: { value: string; label: string }[];
        questions: Record<string, string>;
      }>,
      Form<{ languages: string[] }>,
      Yield<{ languages: string[] }>,
      Variables<{
        i: number;
        languagesRatings: { name: string; rating: string }[];
      }>,
      Loop<
        [
          Variables<{ language: string }>,
          Variables<{ question: string }>,
          Form<{ rating: string }>,
          Yield<{ rating: string }>,
          Variables<{
            i: number;
            languagesRatings: { name: string; rating: string }[];
          }>
        ]
      >,
      Return<{
        fullName: string;
        age: number;
        softwareDeveloper: boolean;
        languages: { name: string; rating: string }[];
      }>
    ];
    else: [
      Form<{ interested: string }>,
      Yield<{ interested: string }>,
      Return<{
        fullName: string;
        age: number;
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
        name: ["", []],
        surname: ["", []],
        age: [0, []],
      }),
      render: ({ values, onNext }) => (
        <Screen key="name" progress={{ total: 3, current: 1 }}>
          <FormView
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                name: z
                  .string()
                  .min(1, { message: "Required" })
                  .max(20, { message: "Max 20 chars" }),
                surname: z
                  .string()
                  .min(1, { message: "Required" })
                  .max(20, { message: "Max 20 chars" }),
                age: z
                  .number()
                  .min(10, { message: "Min. 10" })
                  .max(99, { message: "Max. 99" }),
              })
            )}
            onNext={onNext}
          >
            <FormLayout
              heading="Tell us about yourself"
              description="We would want to know a little bit more about you"
              fields={[
                <Row
                  key="name-surname"
                  items={[
                    <TextField
                      key="name"
                      name="name"
                      label="Name"
                      cy="field-name"
                    />,
                    <TextField
                      key="surname"
                      name="surname"
                      label="Surname"
                      cy="field-surname"
                    />,
                  ]}
                />,
                <NumberField key="age" name="age" label="Age" cy="field-age" />,
              ]}
              button={<Next cy="next">Next</Next>}
            />
          </FormView>
        </Screen>
      ),
    },
  },
  {
    yield: ({ name, surname, age }) => ({
      name,
      surname,
      age,
    }),
  },
  {
    form: {
      values: () => ({
        softwareDeveloper: [true, []],
      }),
      render: ({ values, onNext, onBack }) => (
        <Screen key="softwareDeveloper" progress={{ total: 3, current: 2 }}>
          <FormView
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                softwareDeveloper: z.boolean(),
              })
            )}
            onNext={onNext}
          >
            <FormLayout
              heading="Are you a software developer?"
              description="We would like to know if you are a software developer"
              fields={[
                <YesNo
                  key="softwareDeveloper"
                  name="softwareDeveloper"
                  label="Software Developer"
                  cy="field-software-developer"
                />,
              ]}
              button={<Next cy="next">Next</Next>}
              back={<Back onBack={onBack} />}
            />
          </FormView>
        </Screen>
      ),
    },
  },
  {
    yield: ({ softwareDeveloper }) => ({
      softwareDeveloper,
    }),
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
              javascript: "What rating would you give to JavaScript?",
              python: "What rating would you give to Python?",
              go: "What rating would you give to Go?",
            },
          }),
        },
        {
          form: {
            values: () => ({
              languages: [[], []],
            }),
            render: ({ inputs, values, onNext, onBack }) => (
              <Screen key="languages" progress={{ total: 3, current: 3 }}>
                <FormView
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      languages: z.array(z.string()),
                    })
                  )}
                  onNext={onNext}
                >
                  <FormLayout
                    heading="What are your favourite programming languages?"
                    description="We would like to know which of the following programming languages you like the most"
                    fields={[
                      <MultiSelect
                        key="languages"
                        name="languages"
                        label="Languages"
                        options={inputs.languagesOptions}
                        direction="y"
                        cy="field-languages"
                      />,
                    ]}
                    button={<Next cy="next">Next</Next>}
                    back={<Back onBack={onBack} />}
                  />
                </FormView>
              </Screen>
            ),
          },
        },
        {
          yield: ({ languages }) => ({
            languages,
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
                variables: ({ questions, language }) => ({
                  question: questions[language],
                }),
              },
              {
                form: {
                  values: ({ language }) => ({
                    rating: ["love-it", [language]],
                  }),
                  render: ({ inputs, values, onNext, onBack }) => (
                    <Screen
                      key={`rating-${inputs.language}`}
                      progress={{
                        total: 3 + inputs.languages.length,
                        current: 4 + inputs.i,
                      }}
                    >
                      <FormView
                        defaultValues={values}
                        resolver={zodResolver(
                          z.object({
                            rating: z.string(),
                          })
                        )}
                        onNext={onNext}
                      >
                        <FormLayout
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
                              cy="field-rating"
                            />,
                          ]}
                          button={<Next cy="next">Next</Next>}
                          back={<Back onBack={onBack} />}
                        />
                      </FormView>
                    </Screen>
                  ),
                },
              },
              {
                yield: ({ rating }) => ({
                  rating,
                }),
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
          return: ({
            name,
            surname,
            age,
            softwareDeveloper,
            languagesRatings,
          }) => ({
            fullName: `${name} ${surname}`,
            age,
            softwareDeveloper,
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
            render: ({ values, onNext, onBack }) => (
              <Screen key="interested" progress={{ total: 3, current: 3 }}>
                <FormView
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      interested: z.string(),
                    })
                  )}
                  onNext={onNext}
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
                        cy="field-interested"
                      />,
                    ]}
                    button={<Next cy="next">Next</Next>}
                    back={<Back onBack={onBack} />}
                  />
                </FormView>
              </Screen>
            ),
          },
        },
        {
          yield: ({ interested }) => ({
            interested,
          }),
        },
        {
          return: ({ name, surname, age, softwareDeveloper, interested }) => ({
            fullName: `${name} ${surname}`,
            age,
            softwareDeveloper,
            interested,
          }),
        },
      ],
    },
  },
];
