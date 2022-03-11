import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input, InputProps } from './Input';
import { CalendarIcon } from './icons';

type CustomInputProps = InputProps & {isClearable?: boolean};
export const CustomDateInput = React.forwardRef((
  {
    error,
    noMargin,
    onClick,
    isClearable,
    ...props
  }: CustomInputProps,
  ref?: React.Ref<HTMLInputElement>
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
})

export function Datepicker({
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
}: Omit<ReactDatePickerProps, 'value'> & Omit<InputProps, 'value'> & { value?: Date | null }) {
  return (
      //@ts-ignore
      <DatePicker
        locale={locale}
        selected={value || props.selected}
        todayButton={todayButton}
        customInput={customInput || <CustomDateInput noMargin error={error} isClearable={isClearable} />}
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

