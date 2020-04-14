import React from "react";
import { ThemeProvider } from "styled-components";


export const colors = {
  primary: '#02c0da',
  cta: '#fa237c',
  primary0: '#DAE9EE', // lighter
  primary10: '#C9E8F2', // light
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
