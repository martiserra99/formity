import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactlint from "eslint-plugin-react";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactlint.configs.flat.recommended,
];
