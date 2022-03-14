import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import _ from 'lodash'
import colors from "./colors";

export {colors}; 

export const fonts = ["'skufont-demibold'", 'sans-serif', 'Roboto'];
export const fontFamilies =  {
  regular: "'skufont-regular'",
  demibold: "'skufont-demibold'",
  bold: "'skufont-demibold'",
  medium: "'skufont-medium'",
  fallbacks: [
    '"museo-sans"',
    '"Helvetica Neue"',
    'Helvetica',
    'Roboto',
    'Arial',
    'sans-serif',
  ],
}
export const fontStyles = {
  h1: {
    fontSize: '2rem',
    lineHeight: '3rem',
    fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
  },
  h2: {
    fontSize: '1.5rem',
    lineHeight: '2.5rem',
    fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
  },
  h3: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontFamily: [fontFamilies.bold, ...fontFamilies.fallbacks].join(',')
  },
  h4: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontFamily: [fontFamilies.bold, ...fontFamilies.fallbacks].join(',')
  },
  p: {
    large: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontFamily: [fontFamilies.regular, ...fontFamilies.fallbacks].join(',')
    },
    medium: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontFamily: [fontFamilies.regular, ...fontFamilies.fallbacks].join(',')
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem', 
      fontFamily: [fontFamilies.regular, ...fontFamilies.fallbacks].join(',')
    }
  }, 
  button: {
    huge: {
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
      fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
    },
    large: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
    },
    medium: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
      fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
    },
    small: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
    },
    tiny: {
      fontSize: '0.625rem',
      lineHeight: '1rem',
      fontFamily: [fontFamilies.demibold, ...fontFamilies.fallbacks].join(',')
    }
  },
  label: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontFamily: [fontFamilies.medium, ...fontFamilies.fallbacks].join(',')
  }
};

export const themeOptions = {
  colors,
  fonts,
  fontFamily: `${fonts.join(",")}`,
  fontFamilies,
  fontStyles,
  space: {
    '0': '0px',
    '1': '8px',
    '2': '16px',
    '3': '24px',
    '4': '32px',
    '5': '40px',
    '6': '48px',
    '7': '56px',
    '8': '64px',
    '9': '72px',
    '10': '80px',
  },
}

export function getColor(color?: string, def?: string): string {
  if (!color) { return ''; }
  return _.get(colors, color, _.get(colors, def || '', def));
}

export function getFontSize(value?: string, def?: string): string {
  if (!value) { return ''; }
  return _.get(fontStyles, value, _.get(fontStyles, def || '', def));
}

export function getThemeColor(props: {[key: string]: any}, color: string, fallbackColor?: string): string {
  return getThemeProperty(props, 'colors', color, fallbackColor);
}

export function getThemeFontSize(props: {[key: string]: any}, value: string, fallbackValue?: string): string {
  return getThemeProperty(props, 'fontStyles', value, fallbackValue);
}

export function getThemeFontFamily(props: {[key: string]: any}, fallbackValue = ""): string {
  return getThemeProperty(props, 'fontFamily', fallbackValue);
}

export function getThemeProperty(props: {[key: string]: any}, prop: string, value?: string, fallbackValue?: string): string {
  if (_.get(props, `theme.${prop}`, null)) {
    if (_.isObject(props.theme[prop]) && _.get(props.theme, `${prop}.${value}`, null)) {
      return _.get(props.theme, `${prop}.${value}`, null);
    } else {
      return props.theme[prop];
    }
  }

  switch (prop) {
    case 'fontStyles':
      return getFontSize(fallbackValue, value);
    case 'fontSizes':
      return getFontSize(value, fallbackValue);
    case 'colors':
      return getColor(value, fallbackValue);
    case 'fontFamily':
      return themeOptions.fontFamily;
    default:
      return '';
  }
}


const Theme = ({ theme={}, globalStyles=false, children }: React.PropsWithChildren<{
  theme?: object, globalStyles?: boolean
}>) => {
  const mergedTheme = _.merge(themeOptions, theme);
  return (
    <ThemeProvider theme={mergedTheme}>
      {globalStyles ? <GlobalStyle theme={mergedTheme} /> : null}
      {children}
    </ThemeProvider>
  );
};

export default Theme;