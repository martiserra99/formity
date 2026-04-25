import type { Flow, s } from "@formity/react";

export type Schema = [[s.Form<{ name: string }>], s.Return<{ name: string }>];

export const flow: Flow<Schema> = [
  [
    {
      form: {
        values: () => ({
          name: ["", []],
        }),
        render: () => <></>,
      },
    },
  ],
  {
    return: ({ name }) => ({ name }),
  },
];
