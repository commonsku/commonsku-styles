import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input, InputProps } from './Input';

import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from './icons';

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
        locale={locale}
        selected={value || props.selected}
        todayButton={todayButton}
        customInput={customInput || <CustomDateInput noMargin={noMargin} error={error} />}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        isClearable={isClearable}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        nextMonthButtonLabel={nextMonthButtonLabel}
        nextYearButtonLabel={nextYearButtonLabel}
        previousMonthButtonLabel={previousMonthButtonLabel}
        previousYearButtonLabel={previousYearButtonLabel}
        dropdownMode={dropdownMode}
        peekNextMonth={peekNextMonth}
        {...props}
      />
  )
}

