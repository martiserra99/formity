import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "build/index.cjs.js",
      format: "cjs",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "build/index.esm.js",
      format: "es",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [typescript({ sourceMap: true })],
  external: ["react", "expry", "react-hook-form", "mapsy"],
};
