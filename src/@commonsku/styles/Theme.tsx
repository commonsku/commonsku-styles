import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { AdditionalStyles } from "./globalStyles";
import _ from 'lodash'
import colors from "./colors";
import { sizeMedia, sizeMediaWidth } from "../utils";

export {colors}; 


export const fontFamilies =  {
  skuFontRegular: "'skufont-regular'",
  skuFontDemibold: "'skufont-demibold'",
  skuFontBold: "'skufont-demibold'",
  skuFontMedium: "'skufont-medium'",
  regular: '',
  demibold: '',
  bold: '',
  medium: '',
  fallbacks: [
    '"museo-sans"',
    '"Helvetica Neue"',
    'Helvetica',
    'Roboto',
    'Arial',
    'sans-serif',
  ],
}
fontFamilies.regular = [fontFamilies.skuFontRegular, ...fontFamilies.fallbacks].join(',');
fontFamilies.demibold = [fontFamilies.skuFontDemibold, ...fontFamilies.fallbacks].join(',');
fontFamilies.bold = [fontFamilies.skuFontBold, ...fontFamilies.fallbacks].join(',');
fontFamilies.medium = [fontFamilies.skuFontMedium, ...fontFamilies.fallbacks].join(',');

export const fonts = [fontFamilies.skuFontDemibold, ...fontFamilies.fallbacks];

export const fontStyles = {
  h1: {
    fontSize: '2rem',
    lineHeight: '3rem',
    fontFamily: fontFamilies.demibold
  },
  h2: {
    fontSize: '1.5rem',
    lineHeight: '2.5rem',
    fontFamily: fontFamilies.demibold
  },
  h3: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontFamily: fontFamilies.bold
  },
  h4: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontFamily: fontFamilies.bold
  },
  p: {
    large: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontFamily: fontFamilies.regular
    },
    medium: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontFamily: fontFamilies.regular
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem', 
      fontFamily: fontFamilies.regular
    }
  }, 
  button: {
    huge: {
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
      fontFamily: fontFamilies.demibold
    },
    large: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontFamily: fontFamilies.demibold
    },
    medium: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
      fontFamily: fontFamilies.demibold
    },
    small: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontFamily: fontFamilies.demibold
    },
    tiny: {
      fontSize: '0.625rem',
      lineHeight: '1rem',
      fontFamily: fontFamilies.demibold
    }
  },
  label: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontFamily: fontFamilies.medium
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
  mediaQueries: {
    sizeMediaWidth: sizeMediaWidth,
    sizeMedia: sizeMedia,
  },
}

export function getColor(color?: string, def?: string): string {
  if (!color) { return ''; }
  return _.get(colors, color, _.get(colors, def || '', def)) ?? '';
}

export function getFontStyle(value?: string, def?: string): string {
  if (!value) { return ''; }
  return _.get(fontStyles, value, _.get(fontStyles, def || '', def)) ?? '';
}

export function getThemeColor(props: {[key: string]: any}, color: string, fallbackColor?: string): string {
  return getThemeProperty(props, 'colors', color, fallbackColor);
}

export function getThemeFontStyle(props: {[key: string]: any}, value: string, fallbackValue?: string): string {
  return getThemeProperty(props, 'fontStyles', value, fallbackValue);
}

export function getThemeFontSize(props: {[key: string]: any}, value: string, fallbackValue?: string): string {
  return getThemeFontStyle(props, `${value}.fontSize`, fallbackValue);
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
  } else if (_.get(themeOptions, `${prop}.${value}`, null)) {
    return _.get(themeOptions, `${prop}.${value}`) ?? '';
  }

  switch (prop) {
    case 'fontStyles':
      return getFontStyle(value, fallbackValue);
    case 'fontSizes':
      return getFontStyle(value, fallbackValue);
    case 'colors':
      return getColor(value, fallbackValue);
    case 'fontFamily':
      return _.get(
        themeOptions.fontFamilies,
        `${value}.fontFamily`,
        fallbackValue || themeOptions.fontFamily
      ) ?? '';
    default:
      return '';
  }
}


const Theme = ({ theme={}, globalStyles=false, additionalGlobalStyles, children }: React.PropsWithChildren<{
  theme?: object,
  globalStyles?: boolean,
  additionalGlobalStyles?: AdditionalStyles,
}>) => {
  const mergedTheme = _.merge(themeOptions, theme);
  return (
    <ThemeProvider theme={mergedTheme}>
      {globalStyles ? <GlobalStyle theme={mergedTheme} additionalStyles={additionalGlobalStyles} /> : null}
      {children}
    </ThemeProvider>
  );
};

export default Theme;