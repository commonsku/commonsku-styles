import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Datepicker as BaseDatepicker,
  DateSingleInput as BaseDateSingleInput,
  DateRangeInput as BaseDateRangeInput,
  OnDateChangeProps,
  OnDatesChangeProps,
} from '@datepicker-react/styled';


const theme = {
  // breakpoints: ["32em", "48em", "64em"],
  reactDatepicker: {
    daySize: [24, 40],
    datepickerZIndex: 9999,
    datepickerCloseWrapperZIndex: 9999,
    inputLabelBorderRadius: '5px',
    inputBorder: '1px solid #ABC7D1',
    fontFamily: "'skufont-regular', sans-serif",
    colors: {
      accessibility: "#02c0da",
      selectedDay: "#02c0da",
      selectedDayHover: "#02c0da",
      primaryColor: "#02c0da",
      charcoal: '#123952',
    },
  }
};

export function DateSingleInput(props: {
  [key: string]: any,
  date: Date | null,
  showDatepicker: boolean,
  onDateChange(data: OnDateChangeProps): void,
  onFocusChange(focusInput: boolean): void
}) {
  return <ThemeProvider theme={theme}><BaseDateSingleInput {...props} /></ThemeProvider>
}

declare type FocusedInput = 'startDate' | 'endDate' | null
export function Datepicker(props: {
  [key: string]: any,
  onDatesChange(data: OnDatesChangeProps): void,
  startDate: Date | null,
  endDate: Date | null,
  focusedInput: FocusedInput
}) {
  return <ThemeProvider theme={theme}><BaseDatepicker {...props} /></ThemeProvider>
}

export function DateRangeInput(props: {
  [key: string]: any,
  onFocusChange(focusInput: FocusedInput): void,
  onDatesChange(data: OnDatesChangeProps): void,
  startDate: Date | null,
  endDate: Date | null,
  focusedInput: FocusedInput
}) {
  return <ThemeProvider theme={theme}><BaseDateRangeInput {...props} /></ThemeProvider>
}
