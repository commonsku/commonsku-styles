import React from "react";
import { ThemeProvider } from "styled-components";


export const colors = {
  primary: '#02c0da',
  cta: '#fa237c',
  primary0: '#DAE9EE', // lighter
  primary10: '#C9E8F2', // light
  disabledButton: '#DAE9EE',
  disabledButtonBorder: '#C9E8F2',
  texttitle: '#123952', // a dark blue text
  textlabel: '#123952',
  textbody: '#52585C',
  textplaceholder: '#A4ABAE',
  bggray: '#EDF2F4',
  bgblue: '#ECF4F7',
  inputBorder: '#ABC7D1',
  special1: '#ffd302',
  special2: '#00d374',
  special3: '#ff297c',
  primaryBg: '#EAF2F6',
  special2Bg: '#E7FFE9',
  transparent: 'transparent',
};
export const fonts = ['skufont-demibold', 'sans-serif', 'Roboto'];
export const fontSizes = {
  tiny: '.8em',
  small: '1em',
  medium: '2em',
  large: '3em'
};

export const themeOptions = {
  colors,
  fonts,
  fontSizes
}

export function getColor(color?: string, def?: string): string {
  // @ts-ignore
  return color && colors[color] ? colors[color] : colors[def];
}

export function getFontSize(value?: string, def?: string): string {
  // @ts-ignore
  return value && fontSizes[value] ? fontSizes[value] : fontSizes[def];
}

export function getFonts(value?: string): string {
  let result = fonts;
  // @ts-ignore
  if (value?.toLowerCase() !== 'all') {
    result = fonts.filter((v: string) => v===value);
  }

  let _result = result.join("','");
  if (_result.charAt(0) !== "'") { _result = "'" + _result }
  if (_result.charAt(_result.length-1) !== "'") { _result = _result + "'" };

  return _result;
}

export function getThemeColor(props: {[key: string]: any}, color: string, fallbackColor?: string): string {
  return getThemeProperty(props, 'colors', color, fallbackColor);
}

export function getThemeFontSize(props: {[key: string]: any}, value: string, fallbackValue?: string): string {
  return getThemeProperty(props, 'fontSizes', value, fallbackValue);
}

export function getThemeFonts(props: {[key: string]: any}, value: string, fallbackValue?: string): string {
  return getThemeProperty(props, 'fonts', value, fallbackValue);
}

export function getThemeProperty(props: {[key: string]: any}, prop: string, value: string, fallbackValue?: string): string {
  if (props.theme && props.theme[prop] && props.theme[prop][value]) {
    return props.theme[prop][value];
  }
  // @ts-ignore
  return prop === 'fontSizes' 
    ? getFontSize(fallbackValue, value)
    : prop === 'colors'
    ? getColor(fallbackValue, value)
    : prop === 'fonts'
    ? getColor(fallbackValue, value)
    : null;
}

const Theme = ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
);

export default Theme;
