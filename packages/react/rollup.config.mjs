import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "es",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [typescript({ sourceMap: true })],
  external: ["react"],
};
