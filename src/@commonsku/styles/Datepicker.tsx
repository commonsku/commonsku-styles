import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import {
  Datepicker as BaseDatepicker,
  DateSingleInput as BaseDateSingleInput,
  DateRangeInput as BaseDateRangeInput,
  OnDateChangeProps,
  OnDatesChangeProps,
} from '@datepicker-react/styled';

const commonStyles = css`
  label {
    font-family: 'skufont-medium', sans-serif;
    color: #123952;
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
  }

  input {
    font-family: 'skufont-regular', sans-serif;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid #ABC7D1;
    border-radius: 5px;
    margin-bottom: 1rem;
    min-height: 38px;
    box-sizing: border-box;
    color: #123952;
    width: 100%;
    background-color: white;
    font-weight: normal;
    &:focus {
      border: 2px solid #02c0da;
      outline: none;
    }
  }
`;

const Wrapper = styled.div`
  ${commonStyles}
`;

const theme: {[key: string]: any} = {
  // breakpoints: ["32em", "48em", "64em"],
  reactDatepicker: {
    daySize: [24, 40],
    datepickerZIndex: 9999,
    datepickerCloseWrapperZIndex: 9999,
    datepickerBorderRadius: '5px',
    dateRangeBorderRadius: '5px',
    inputBorder: '1px solid #ABC7D1',
    inputLabelBorder: '0.3px solid #ABC7D1',
    inputLabelBorderRadius: '5px',
    inputPadding: '.5rem',
    inputActiveBoxShadow: 'box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);',
    inputFontSize: '1rem',
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

export function DateSingleInput({
  showCalendarIcon=false,
  ...props
}: {
  [key: string]: any,
  date: Date | null,
  showDatepicker: boolean,
  onDateChange(data: OnDateChangeProps): void,
  onFocusChange(focusInput: boolean): void
}) {
  if (showCalendarIcon) {
    theme['inputPadding'] = '2.5rem';
  } else {
    theme['inputPadding'] = '.5rem';
  }
  return <ThemeProvider theme={theme}>
    <Wrapper>
      <BaseDateSingleInput
        showCalendarIcon={showCalendarIcon}
        {...props}
      />
    </Wrapper>
  </ThemeProvider>
}

declare type FocusedInput = 'startDate' | 'endDate' | null
export function Datepicker(props: {
  [key: string]: any,
  onDatesChange(data: OnDatesChangeProps): void,
  startDate: Date | null,
  endDate: Date | null,
  focusedInput: FocusedInput
}) {
  return <ThemeProvider theme={theme}>
    <Wrapper>
      <BaseDatepicker {...props} />
    </Wrapper>
  </ThemeProvider>
}

export function DateRangeInput(props: {
  [key: string]: any,
  onFocusChange(focusInput: FocusedInput): void,
  onDatesChange(data: OnDatesChangeProps): void,
  startDate: Date | null,
  endDate: Date | null,
  focusedInput: FocusedInput
}) {
  return <ThemeProvider theme={theme}>
    <Wrapper><BaseDateRangeInput {...props} /></Wrapper>
  </ThemeProvider>
}
