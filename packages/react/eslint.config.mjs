import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactlint from "eslint-plugin-react";

export default [
  {
    ignores: ["dist", "node_modules", "eslint.config.mjs"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
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
