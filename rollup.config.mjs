import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import { dts } from "rollup-plugin-dts"
import alias from "@rollup/plugin-alias"
import packageJson from "./package.json" assert { type: "json" }
import replace from "@rollup/plugin-replace"

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
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
        extensions: [".ts", ".tsx", ".json", ".js", ".mjs"],
      }),
      alias({
        entries: [
          {
            find: "@/",
            replacement: "./src/",
          },
        ],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
        plugins: ["styled-components"],
      }),
      replace({
        preventAssignment: true,
        values: {
          "process.env.HOLIDAY_API_URL": JSON.stringify(process.env.HOLIDAY_API_URL),
          "process.env.HOLIDAY_API_KEY": JSON.stringify(process.env.HOLIDAY_API_KEY),
        },
      }),
      terser(),
    ],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    external: [/\.css$/],
    plugins: [
      alias({
        entries: [
          {
            find: "@/",
            replacement: "./src/",
          },
        ],
      }),
      dts(),
    ],
  },
]
