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


const Theme = ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
);

export default Theme;
