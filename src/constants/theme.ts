const commonTheme = {
  fontSize: {
    sm: "13px",
    md: "15px",
  },
  fontWeight: {
    bold: 700,
    medium: 600,
  },
  borderRadius: "8px",
  bgColor: "#F1F1F1",
  spacings: {
    sm: "10px",
    md: "15px",
    lg: "20px",
    xl: "25px",
  },
  lightBlue: "#2F80ED1A",
}
export const lightTheme = {
  ...commonTheme,
  blue: "#2F80ED",
  white: "#FFFFFF",
  red: "#FC0313",
  green: "#90EE90",
  black: "#000000",
  dark: "#333",
  gray: "#AAA",
  lightGray: "#BBB",
  bgColor: "#F1F1F1",
  textColor: "#000000",
}
export const darkTheme = {
  ...commonTheme,
  blue: "#1E3A8A",
  white: "#D1D5DB",
  red: "#EF4444",
  green: "#22C55E",
  black: "#000000",
  dark: "#1F2937",
  gray: "#4B5563",
  lightGray: "#6B7280",
  bgColor: "#111827",
  textColor: "#FFFFFF",
}

export enum Themes {
  Light = "light",
  Dark = "dark",
}
