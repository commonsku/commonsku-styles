import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input, InputProps } from './Input';
import { CalendarIcon } from './icons';

import "react-datepicker/dist/react-datepicker.css";


export const CustomDateInput = ({ error, noMargin, onClick, ...props }: InputProps) => {
  return (<>
    <Input
      noMargin={noMargin}
      error={error}
      style={{ marginRight: '2rem', display: 'inline-block' }}
      className="react-datepicker-ignore-onclickoutside" 
      type="text"
      autoComplete="off"
      {...props}
    />
    <span style={{ fontStyle: 'normal', cursor: 'pointer', position: 'absolute', top: '8px', right: '5px' }} onClick={onClick}>
      <CalendarIcon style={{ width: '1.9rem', verticalAlign: 'middle', }} />
    </span>
  </>);
}

export function Datepicker({
  noMargin,
  error,
  value,
  customInput,
  locale='en',
  todayButton='Today',
  placeholder='yyyy-MM-dd',
  dateFormat='yyyy-MM-dd',
  isClearable=false,
  peekNextMonth=true,
  showMonthDropdown=true,
  showYearDropdown=true,
  dropdownMode="select",
  nextMonthButtonLabel="",
  nextYearButtonLabel="",
  previousMonthButtonLabel="",
  previousYearButtonLabel="",
  ...props
}: ReactDatePickerProps & InputProps & { value?: Date | null }) {
  return (
      //@ts-ignore
      <DatePicker
        isClearable={isClearable}
        locale={locale}
        selected={value || props.selected}
        todayButton={todayButton}
        customInput={customInput || <CustomDateInput noMargin={noMargin} error={error} />}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        peekNextMonth={peekNextMonth}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        dropdownMode={dropdownMode}
        nextMonthButtonLabel={nextMonthButtonLabel}
        nextYearButtonLabel={nextYearButtonLabel}
        previousMonthButtonLabel={previousMonthButtonLabel}
        previousYearButtonLabel={previousYearButtonLabel}
        {...props}
      />
  )
}

