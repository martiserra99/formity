import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactlint from "eslint-plugin-react";

export default [
  {
    ignores: ["example", "build", "node_modules"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactlint.configs.flat.recommended,
];
