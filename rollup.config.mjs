import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import { dts } from "rollup-plugin-dts"
import alias from "@rollup/plugin-alias"
import packageJson from "./package.json" assert { type: "json" }

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: packageJson.name,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".json", ".mjs", ".ts", ".tsx"],
        browser: true,
      }),
      alias({
        entries: [
          {
            find: "@/components/DatePicker/DatePicker",
            replacement: "./src/components/DatePicker/DatePicker.tsx",
          },
        ],
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        plugins: ["styled-components"],
      }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
]
