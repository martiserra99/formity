import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import tailwindcssForms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Spline Sans Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [tailwindcssForms],
};

export default config;
