import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Input, InputProps } from './Input';
import { CalendarIcon } from './icons';
import { format } from 'date-fns';
import DateRangePicker, { DateRange, DateRangePickerProps } from './DateRangePicker';

const dropdownStyles: CSSProperties = {
    position: 'absolute',
    marginTop: '1rem',
    padding: '1rem',
    background: '#fff',
    border: '2px solid',
    borderRadius: '5px',
    borderColor: 'var(--color-primary1-60)',
    zIndex: '1',
};

const formatDateRange = ({startDate, endDate}: DateRange, dateFormat: string) => 
    (startDate == null || endDate == null)
        ? ''
        : `${format(startDate, dateFormat)} to ${format(endDate, dateFormat)}`;

interface DateRangeInputProps extends Omit<InputProps, 'onChange'> {
    isClearable: boolean
    selected: DateRange
    dateFormat: string
    onInputSelect: () => void
};

export const DateRangeInput = ({
    value,
    error,
    noMargin,
    onClick,
    isClearable,
    selected,
    dateFormat,
    onInputSelect,
    ...props
}: DateRangeInputProps) => {
    const [fallbackValue, setFallbackValue] = useState<string>();

    useEffect(() => {
        setFallbackValue(formatDateRange(selected, dateFormat));
    }, [dateFormat, selected]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <Input
                onFocus={onInputSelect}
                value={value != null ? value : fallbackValue}
                onClick={onClick}
                noMargin={noMargin}
                error={error}
                style={{ marginRight: '2rem', display: 'inline-block', width: '250px' }}
                type="text"
                autoComplete="off"
                {...props}
            />
            <span 
                style={{
                    fontStyle: 'normal',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '8px',
                    right: '36px',
                }} 
                onClick={onClick}
            >
                {!isClearable &&
                    <CalendarIcon style={{ width: '1.9rem', verticalAlign: 'middle' }}/> 
                }
            </span>
        </div>
    );
};

interface DateRangeDropdownProps extends DateRangePickerProps {
    dateText?: string
}

export const DateRangeDropdown = (props: DateRangeDropdownProps) => {
    const {
        dateText,
        range,
        error,
        isClearable=false,
        dateFormat='yyyy-MM-dd',
        placeholder,
        placeholderText,
        style=dropdownStyles,
    } = props;

    const [open, setOpen] = useState(false);
    const datepickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleExternalClick = (e: MouseEvent) => {
            if (datepickerRef.current != null && !datepickerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleExternalClick);

        return () => document.removeEventListener("mousedown", handleExternalClick);
    }, []);

    return (
        <>
            <DateRangeInput
                noMargin
                value={dateText}
                onInputSelect={() => setOpen(true)}
                error={error}
                isClearable={isClearable}
                selected={range}
                dateFormat={dateFormat}
                placeholder={placeholder || placeholderText || `${dateFormat} to ${dateFormat}`}
            />
            {open && 
                <DateRangePicker ref={datepickerRef} style={style} {...props} />
            }
        </>
    );
}

export default DateRangePicker;
