import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input, InputProps } from './Input';
import { getThemeColor } from './Theme';

export function Datepicker({
  noMargin,
  error,
  value,
  customInput,
  locale='en',
  todayButton='Today',
  placeholder='YYYY-MM-DD',
  dateFormat='YYYY-MM-DD',
  isClearable=true,
  peekNextMonth=true,
  showMonthDropdown=true,
  showYearDropdown=true,
  dropdownMode="select",
  timeInputLabel="Time:",
  showTimeInput,
  ...props
}: ReactDatePickerProps & InputProps & { value?: Date | null }) {
  return (
      //@ts-ignore
      <DatePicker
        isClearable
        locale={locale}
        selected={value}
        todayButton={todayButton}
        customInput={customInput || <Input noMargin={noMargin} error={error} />}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        peekNextMonth={peekNextMonth}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        dropdownMode={dropdownMode}
        {...props}
      />
  )
}

