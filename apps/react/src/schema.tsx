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
} from "./components";

import { Controller } from "./controller";

export type Values = [
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

export const schema: Schema<Values> = [
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

// import type {
//   Schema,
//   Cond,
//   Loop,
//   Form,
//   Return,
//   Variables,
// } from "@formity/react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import {
//   FormView,
//   FormLayout,
//   Row,
//   TextField,
//   NumberField,
//   MultiSelect,
//   Listbox,
//   Select,
//   YesNo,
//   Next,
//   Back,
// } from "./components";

// import { Controller } from "./controller";

// export type Values = [
//   Form<{ name: string; surname: string; age: number }>,
//   Form<{ softwareDeveloper: boolean }>,
//   Cond<{
//     then: [
//       Variables<{
//         languagesOptions: { value: string; label: string }[];
//         questions: Record<string, string>;
//       }>,
//       Form<{ languages: string[] }>,
//       Variables<{
//         i: number;
//         languagesRatings: { name: string; rating: string }[];
//       }>,
//       Loop<
//         [
//           Variables<{ language: string }>,
//           Variables<{ question: string }>,
//           Form<{ rating: string }>,
//           Variables<{
//             i: number;
//             languagesRatings: { name: string; rating: string }[];
//           }>
//         ]
//       >,
//       Return<{
//         fullName: string;
//         age: number;
//         softwareDeveloper: boolean;
//         languages: { name: string; rating: string }[];
//       }>
//     ];
//     else: [
//       Form<{ interested: string }>,
//       Return<{
//         fullName: string;
//         age: number;
//         softwareDeveloper: boolean;
//         interested: string;
//       }>
//     ];
//   }>
// ];

// export const schema: Schema<Values> = [
//   {
//     form: {
//       values: () => ({
//         name: ["", []],
//         surname: ["", []],
//         age: [20, []],
//       }),
//       render: ({ values, onNext, onBack, getFlow, setFlow }) => (
//         <Controller
//           step="name"
//           onNext={onNext}
//           onBack={onBack}
//           getFlow={getFlow}
//           setFlow={setFlow}
//         >
//           <FormView
//             defaultValues={values}
//             resolver={zodResolver(
//               z.object({
//                 name: z
//                   .string()
//                   .min(1, { message: "Required" })
//                   .max(20, { message: "Must be at most 20 characters" }),
//                 surname: z
//                   .string()
//                   .min(1, { message: "Required" })
//                   .max(20, { message: "Must be at most 20 characters" }),
//                 age: z
//                   .number()
//                   .min(18, { message: "Minimum of 18 years old" })
//                   .max(99, { message: "Maximum of 99 years old" }),
//               })
//             )}
//           >
//             <FormLayout
//               heading="Tell us about yourself"
//               description="We would want to know a little bit more about you"
//               fields={[
//                 <Row
//                   key="name-surname"
//                   items={[
//                     <TextField key="name" name="name" label="Name" />,
//                     <TextField key="surname" name="surname" label="Surname" />,
//                   ]}
//                 />,
//                 <NumberField key="age" name="age" label="Age" />,
//               ]}
//               button={<Next>Next</Next>}
//             />
//           </FormView>
//         </Controller>
//       ),
//     },
//   },
//   {
//     form: {
//       values: () => ({
//         softwareDeveloper: [true, []],
//       }),
//       render: ({ values, onNext, onBack, getFlow, setFlow }) => (
//         <Controller
//           step="softwareDeveloper"
//           onNext={onNext}
//           onBack={onBack}
//           getFlow={getFlow}
//           setFlow={setFlow}
//         >
//           <FormView
//             defaultValues={values}
//             resolver={zodResolver(
//               z.object({
//                 softwareDeveloper: z.boolean(),
//               })
//             )}
//           >
//             <FormLayout
//               heading="Are you a software developer?"
//               description="We would like to know if you are a software developer"
//               fields={[
//                 <YesNo
//                   key="softwareDeveloper"
//                   name="softwareDeveloper"
//                   label="Software Developer"
//                 />,
//               ]}
//               button={<Next>Next</Next>}
//               back={<Back />}
//             />
//           </FormView>
//         </Controller>
//       ),
//     },
//   },
//   {
//     cond: {
//       if: ({ softwareDeveloper }) => softwareDeveloper,
//       then: [
//         {
//           variables: () => ({
//             languagesOptions: [
//               { value: "javascript", label: "JavaScript" },
//               { value: "python", label: "Python" },
//               { value: "go", label: "Go" },
//             ],
//             questions: {
//               javascript: "What rating would you give to JavaScript?",
//               python: "What rating would you give to Python?",
//               go: "What rating would you give to Go?",
//             },
//           }),
//         },
//         {
//           form: {
//             values: () => ({
//               languages: [[], []],
//             }),
//             render: ({ inputs, values, onNext, onBack, getFlow, setFlow }) => (
//               <Controller
//                 step="languages"
//                 onNext={onNext}
//                 onBack={onBack}
//                 getFlow={getFlow}
//                 setFlow={setFlow}
//               >
//                 <FormView
//                   defaultValues={values}
//                   resolver={zodResolver(
//                     z.object({
//                       languages: z.array(z.string()),
//                     })
//                   )}
//                 >
//                   <FormLayout
//                     heading="What are your favourite programming languages?"
//                     description="We would like to know which of the following programming languages you like the most"
//                     fields={[
//                       <MultiSelect
//                         key="languages"
//                         name="languages"
//                         label="Languages"
//                         options={inputs.languagesOptions}
//                         direction="y"
//                       />,
//                     ]}
//                     button={<Next>Next</Next>}
//                     back={<Back />}
//                   />
//                 </FormView>
//               </Controller>
//             ),
//           },
//         },
//         {
//           variables: () => ({
//             i: 0,
//             languagesRatings: [],
//           }),
//         },
//         {
//           loop: {
//             while: ({ i, languages }) => i < languages.length,
//             do: [
//               {
//                 variables: ({ i, languages }) => ({
//                   language: languages[i],
//                 }),
//               },
//               {
//                 variables: ({ questions, language }) => ({
//                   question: questions[language],
//                 }),
//               },
//               {
//                 form: {
//                   values: ({ language }) => ({
//                     rating: ["love-it", [language]],
//                   }),
//                   render: ({
//                     inputs,
//                     values,
//                     onNext,
//                     onBack,
//                     getFlow,
//                     setFlow,
//                   }) => (
//                     <Controller
//                       step={`rating-${inputs.language}`}
//                       onNext={onNext}
//                       onBack={onBack}
//                       getFlow={getFlow}
//                       setFlow={setFlow}
//                     >
//                       <FormView
//                         defaultValues={values}
//                         resolver={zodResolver(
//                           z.object({
//                             rating: z.string(),
//                           })
//                         )}
//                       >
//                         <FormLayout
//                           heading={inputs.question}
//                           description="Since you said it is one of your favourite languages, we would like to know how much you like it"
//                           fields={[
//                             <Select
//                               key="rating"
//                               name="rating"
//                               label="Rating"
//                               options={[
//                                 {
//                                   value: "love-it",
//                                   label: "Love it",
//                                 },
//                                 {
//                                   value: "like-it-a-lot",
//                                   label: "Like it a lot",
//                                 },
//                                 {
//                                   value: "it-is-okay",
//                                   label: "It's okay",
//                                 },
//                               ]}
//                               direction="y"
//                             />,
//                           ]}
//                           button={<Next>Next</Next>}
//                           back={<Back />}
//                         />
//                       </FormView>
//                     </Controller>
//                   ),
//                 },
//               },
//               {
//                 variables: ({ i, languagesRatings, language, rating }) => ({
//                   i: i + 1,
//                   languagesRatings: [
//                     ...languagesRatings,
//                     { name: language, rating },
//                   ],
//                 }),
//               },
//             ],
//           },
//         },
//         {
//           return: ({
//             name,
//             surname,
//             age,
//             softwareDeveloper,
//             languagesRatings,
//           }) => ({
//             fullName: `${name} ${surname}`,
//             age,
//             softwareDeveloper,
//             languages: languagesRatings,
//           }),
//         },
//       ],
//       else: [
//         {
//           form: {
//             values: () => ({
//               interested: ["maybe", []],
//             }),
//             render: ({ values, onNext, onBack, getFlow, setFlow }) => (
//               <Controller
//                 step="interested"
//                 onNext={onNext}
//                 onBack={onBack}
//                 getFlow={getFlow}
//                 setFlow={setFlow}
//               >
//                 <FormView
//                   defaultValues={values}
//                   resolver={zodResolver(
//                     z.object({
//                       interested: z.string(),
//                     })
//                   )}
//                 >
//                   <FormLayout
//                     heading="Would you be interested in learning how to code?"
//                     description="Having coding skills can be very beneficial"
//                     fields={[
//                       <Listbox
//                         key="interested"
//                         name="interested"
//                         label="Interested"
//                         options={[
//                           {
//                             value: "maybe",
//                             label: "Maybe in another time.",
//                           },
//                           {
//                             value: "yes",
//                             label: "Yes, that sounds good.",
//                           },
//                           {
//                             value: "no",
//                             label: "No, it is not for me.",
//                           },
//                         ]}
//                       />,
//                     ]}
//                     button={<Next>Next</Next>}
//                     back={<Back />}
//                   />
//                 </FormView>
//               </Controller>
//             ),
//           },
//         },
//         {
//           return: ({ name, surname, age, softwareDeveloper, interested }) => ({
//             fullName: `${name} ${surname}`,
//             age,
//             softwareDeveloper,
//             interested,
//           }),
//         },
//       ],
//     },
//   },
// ];
