import React, { forwardRef } from 'react';
import {
  default as ReactDatePicker,
  ReactDatePickerProps,
} from 'react-datepicker';
import { Input, InputProps } from './Input';
import { CalendarIcon } from './icons';

type CustomInputProps = InputProps & {isClearable?: boolean};
export const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>((
  { error, noMargin, onClick, isClearable, ...props },
  ref
) => {
  return (<>
    <Input
      ref={ref}
      noMargin={noMargin}
      error={error}
      style={{ marginRight: '2rem', display: 'inline-block' }}
      className="react-datepicker-ignore-onclickoutside" 
      type="text"
      autoComplete="off"
      {...props}
    />
    <span style={{ fontStyle: 'normal', cursor: 'pointer', position: 'absolute', top: '8px', right: '5px' }} onClick={onClick}>
    {!isClearable ? <CalendarIcon style={{ width: '1.9rem', verticalAlign: 'middle', }} /> : null}
    </span>
  </>);
});

// @ts-ignore
const ReactDatePickerComponent = ReactDatePicker.default || ReactDatePicker;

export type DatepickerProps = Omit<ReactDatePickerProps, 'value'>
  & Omit<InputProps, 'value'>
  & {
    value?: Date | null;
    placeholder?: string;
  };
const Datepicker = (
  {
    error,
    value,
    customInput,
    locale='en',
    todayButton='Today',
    placeholder='yyyy-MM-dd',
    placeholderText='yyyy-MM-dd',
    dateFormat='yyyy-MM-dd',
    isClearable=false,
    peekNextMonth=true,
    showMonthDropdown=true,
    showYearDropdown=true,
    showPopperArrow=false,
    dropdownMode="select",
    nextMonthButtonLabel="",
    nextYearButtonLabel="",
    previousMonthButtonLabel="",
    previousYearButtonLabel="",
    popperClassName,
    wrapperClassName,
    ...props
  }: DatepickerProps
) => (
  <ReactDatePickerComponent
    locale={locale}
    selected={value || props.selected}
    todayButton={todayButton}
    customInput={customInput || <CustomDateInput noMargin error={error} isClearable={isClearable} />}
    dateFormat={dateFormat}
    placeholderText={placeholder || placeholderText}
    isClearable={isClearable}
    showMonthDropdown={showMonthDropdown}
    showYearDropdown={showYearDropdown}
    nextMonthButtonLabel={nextMonthButtonLabel}
    nextYearButtonLabel={nextYearButtonLabel}
    previousMonthButtonLabel={previousMonthButtonLabel}
    previousYearButtonLabel={previousYearButtonLabel}
    dropdownMode={dropdownMode}
    peekNextMonth={peekNextMonth}
    popperClassName={`commonsku-styles-datepicker ${popperClassName || ''}`}
    wrapperClassName={`commonsku-styles-datepicker ${wrapperClassName || ''}`}
    showPopperArrow={showPopperArrow}
    {...props}
  />
);

export default Datepicker;
