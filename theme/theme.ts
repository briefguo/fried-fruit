export const colors = {
  primary: '#FF6000',
  default: '#333',
  secondary: 'rgba(0,0,0,0.45)',
  descriptionColor: '#888',
  success: '#00B23F',
  warning: '#FF6000',
  fail: '#ff3838',
}

export type Colors = typeof colors

export const textTheme = {
  light: { fontSize: 12 },
  default: {},
  pageTitle: { fontSize: 18, fontWeight: 500 },
  title: { fontSize: 17 },
  description: {
    fontSize: 12,
    color: '#888',
    lineHeight: 1.25,
  },
  body: { fontSize: 14 },
}

export interface TextTheme {
  [key: string]: React.CSSProperties
}

export type TextThemeKeys = keyof typeof textTheme

export const theme = {
  contentContainerWidth: 1080,
  borderRadius: '5px',
  defaultBodyBackground: '#F5F5F9',
  defaultContrastingColor: '#333',
  colors,
  textTheme,
}

export type CustomTheme = typeof theme
