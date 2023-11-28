const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const babel = require("@rollup/plugin-babel")
const { terser } = require("rollup-plugin-terser")
const peerDepsExternal = require("rollup-plugin-peer-deps-external")
const { dts } = require("rollup-plugin-dts")
const alias = require("@rollup/plugin-alias")
const packageJson = require("./package.json")

module.exports = [
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
      alias({
        entries: [
          { find: "@/constants/startDays", replacement: "./src/constants/startDays" },
        ],
      }),
      resolve({
        extensions: [".mjs", ".json", ".ts", ".tsx"],
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
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