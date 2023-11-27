import type { StorybookConfig } from "@storybook/react-webpack5"
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin"

const config: StorybookConfig = {
  framework: { name: "@storybook/react-webpack5", options: {} },
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@storybook/themes"
  ],
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ]
    }
    return config
  },
}

export default config
