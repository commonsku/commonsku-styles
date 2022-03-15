import React from 'react';
import { default as BaseDatePicker, ReactDatePickerProps } from 'react-datepicker';
import { Input, InputProps } from './Input';
import { Calendar2Icon } from './icons';
import styled from 'styled-components';
import { getThemeColor } from './Theme';
import colors from './colors';

type CustomInputProps = InputProps & {isClearable?: boolean};
export const CustomDateInput = React.forwardRef((
  {
    error,
    noMargin,
    onClick,
    isClearable,
    ...props
  }: CustomInputProps,
  ref: React.Ref<HTMLInputElement>
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
    {!isClearable ? <Calendar2Icon style={{ width: '1.9rem', verticalAlign: 'middle', }} /> : null}
    </span>
  </>);
});

export const StyledDatePickerWrapper = styled.div`
.react-datepicker-wrapper, .react-datepicker__input-container {
  display: block;
  width: 100%;
}

.react-datepicker {
  border: 1px solid ${p => getThemeColor(p, 'primary1.60', colors.primary1['60'])};
  outline: none;
  box-shadow: ${p => `
    1px  1px 0px ${getThemeColor(p, 'primary1.60')},
    -1px -1px 0px ${getThemeColor(p, 'primary1.60')},
    1px -1px 0px ${getThemeColor(p, 'primary1.60')},
    -1px  1px 0px ${getThemeColor(p, 'primary1.60')}
  `};
}

.react-datepicker__triangle {
  border-bottom-color: background: ${p => getThemeColor(p, 'neutrals.20', colors.neutrals['20'])};
}

.react-datepicker__current-month,
.react-datepicker-time__header,
.react-datepicker-year-header,
.react-datepicker__header {
  padding-top: 8px;
  padding-bottom: 8px;
}


.react-datepicker__header,
.react-datepicker__today-button {
  background: ${p => getThemeColor(p, 'neutrals.20', colors.neutrals['20'])};
  padding-top: 8px;
  padding-bottom: 8px;
}

.react-datepicker__header {
  border-bottom: none;
}

.react-datepicker__today-button {
  border-top: none;
}

.react-datepicker__day {
  outline: none;
}

.react-datepicker__day :not(
  .react-datepicker__day--outside-month,
  .react-datepicker__day--selected
) {
  color: ${p => getThemeColor(p, 'neutrals.90', colors.neutrals['90'])};
}

.react-datepicker__day:hover:not(.react-datepicker__day--selected),
.react-datepicker__month-text:hover,
.react-datepicker__quarter-text:hover,
.react-datepicker__year-text:hover {
  background-color: ${p => getThemeColor(p, 'neutrals.20', colors.neutrals['20'])};
}


.react-datepicker__day--outside-month {
  color: ${p => getThemeColor(p, 'neutrals.70', colors.neutrals['70'])};
}
.react-datepicker__day--selected,
.react-datepicker__day--keyboard-selected,
.react-datepicker__month-text--keyboard-selected,
.react-datepicker__quarter-text--keyboard-selected,
.react-datepicker__year-text--keyboard-selected
 {
  background-color: ${p => getThemeColor(p, 'primary1.60', colors.primary1['60'])};
}

.react-datepicker__navigation--next {
  border-left-color: ${p => getThemeColor(p, 'primary1.60', colors.primary1['60'])};
}
.react-datepicker__navigation--previous {
  border-right-color: ${p => getThemeColor(p, 'primary1.60', colors.primary1['60'])};
}

.react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before,
.react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before,
.react-datepicker__year-read-view--down-arrow::before,
.react-datepicker__month-read-view--down-arrow::before,
.react-datepicker__month-year-read-view--down-arrow::before {
  border-bottom-color: ${p => getThemeColor(p, 'primary1.60', colors.primary1['60'])};
  border-top-color: ${p => getThemeColor(p, 'primary1.60', colors.primary1['60'])};
}

`;

export type DatepickerPorps = Omit<ReactDatePickerProps, 'value'> & Omit<InputProps, 'value'> & { value?: Date | null };
export const Datepicker = React.forwardRef((
  {
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
  }: DatepickerPorps,
  ref: React.Ref<BaseDatePicker>
) => {
  return (
    <StyledDatePickerWrapper className='commonsku-styles-datepicker'>
      <BaseDatePicker
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
        ref={ref}
      />
    </StyledDatePickerWrapper>
  )
})

