import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import _ from 'lodash'


export const colors = {
  white: '#fff',
  black: '#000',
  primary: '#02c0da',
  cta: '#fa237c',
  primary0: '#DAE9EE', // lighter
  primary10: '#C9E8F2', // light
  primary100: '#00889B', // dark
  disabledButton: '#DAE9EE',
  disabledButtonBorder: '#C9E8F2',
  texttitle: '#123952', // a dark blue text
  textlabel: '#123952',
  textbody: '#52585C',
  textplaceholder: '#A4ABAE',
  bggray: '#EDF2F4',
  bgblue: '#ECF4F7',
  inputBorder: '#ABC7D1',
  special1: '#ffd302',        // yellow
  special2: '#00d374',        // green
  special3: '#ff297c',        // red
  primaryBg: '#EAF2F6',
  special2Bg: '#E7FFE9',
  transparent: 'transparent',
  error: '#B21154',
};
export const fonts = ["'skufont-demibold'", 'sans-serif', 'Roboto'];
export const fontSizes = {
  tiny: '.8em',
  small: '1em',
  medium: '2em',
  large: '3em'
};

export const themeOptions = {
  colors,
  fonts,
  fontFamily: `${fonts.join(",")}`,
  fontSizes,
}

export function getColor(color?: string, def?: string): string {
  return getVal(colors, color, def);
}

export function getFontSize(value?: string, def?: string): string {
  return getVal(fontSizes, value, def);
}

export function getThemeColor(props: {[key: string]: any}, color: string, fallbackColor?: string): string {
  return getThemeProperty(props, 'colors', color, fallbackColor);
}

export function getThemeFontSize(props: {[key: string]: any}, value: string, fallbackValue?: string): string {
  return getThemeProperty(props, 'fontSizes', value, fallbackValue);
}

export function getThemeFontFamily(props: {[key: string]: any}, fallbackValue = ""): string {
  return getThemeProperty(props, 'fontFamily', fallbackValue);
}

export function getVal(data: object, key?: string, def?: string): string {
  return key && data[key] ? data[key] : (
    !def ? def : data[def] || def
  );
}

export function getThemeProperty(props: {[key: string]: any}, prop: string, value?: string, fallbackValue?: string): string {
  if (_.get(props, `theme.${prop}`, null)) {
    if (_.isObject(props.theme[prop]) && _.get(props.theme, `${prop}.${value}`, null)) {
      return _.get(props.theme, `${prop}.${value}`, null);
    } else {
      return props.theme[prop];
    }
  }
  // @ts-ignore
  return prop === 'fontSizes' 
    ? getFontSize(fallbackValue, value)
    : prop === 'colors'
    ? getColor(fallbackValue, value)
    : prop === 'fontFamily'
    ? themeOptions.fontFamily
    : null;
}

export type ThemeProps = typeof themeOptions;

//use globalStyles with care, currently anchored to body
const Theme = ({ theme={}, globalStyles=false, children }: React.PropsWithChildren<{
  theme?: object, globalStyles?: boolean
}>) => (
  <ThemeProvider theme={{
    ...themeOptions,
    ...theme,
  }}>
    {globalStyles ? <GlobalStyle /> : null}
    {children}
  </ThemeProvider>
);

export default Theme;
