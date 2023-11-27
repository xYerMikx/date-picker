import { createGlobalStyle, ThemeProvider } from "styled-components"
import { withThemeFromJSXProvider } from "@storybook/addon-themes"

import { lightTheme, darkTheme } from "../src/constants/theme"

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;
  }
  `
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
}

export default preview
