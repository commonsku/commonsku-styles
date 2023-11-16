import React, { CSSProperties, ChangeEvent, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import Datepicker, { DatepickerProps } from './Datepicker';
import { Input, InputProps, LabeledRadioInButton } from './Input';
import { CalendarIcon } from './icons';
import { format } from 'date-fns';
import { Text } from './Text';
import { Col, Row } from './FlexboxGrid';
import colors from './colors';

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

const tabStyles: CSSProperties = {
    fontSize: '20px',
    fontWeight: '500',
    color: '#768B98',
    cursor: 'pointer',
};

const activeTabStyles: CSSProperties = {
    ...tabStyles,
    color: '#000',
    textDecorationLine: 'underline',
    textUnderlineOffset: '1rem',
    textDecorationColor: colors.secondary1[50],
    textDecorationThickness: '8px',
};

const presetListStyles: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '520px',
    gap: '0.5rem 1rem',
}

export type DateRange = [Date | null, Date | null]

const formatDateRange = ([start, end]: DateRange, dateFormat: string) => 
    (start == null || end == null)
        ? ''
        : `${format(start, dateFormat)} to ${format(end, dateFormat)}`;

interface DateRangeInputProps extends Omit<InputProps, 'onChange'> {
    isClearable: boolean
    selected: DateRange
    dateFormat: string
    onChange: (value: string) => void
    onInputSelect: () => void
};

export const DateRangeInput = ({
    error,
    noMargin,
    onClick,
    isClearable,
    selected,
    dateFormat,
    onChange,
    onInputSelect,
    ...props
}: DateRangeInputProps) => {
    const [value, setValue] = useState<string>();

    useEffect(() => {
        setValue(formatDateRange(selected, dateFormat));
    }, [dateFormat, selected]);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <Input
                onFocus={onInputSelect}
                value={value}
                onClick={onClick}
                onChange={handleInputChange}
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
                    <CalendarIcon
                        style={{ width: '1.9rem', verticalAlign: 'middle' }}
                        onClick={onInputSelect}
                    /> 
                }
            </span>
        </div>
    );
};

export interface DateRangePreset {
    label: string,
    onSelect: (preset: DateRangePreset) => void,
}

export type DateRangePickerProps = Omit<DatepickerProps, 'value' | 'onChange' | 'dateFormat'> & { 
    range: DateRange
    dateFormat?: string
    onChange?: (
        range: DateRange,
        event?: SyntheticEvent<any>,
    ) => void
    presets?: DateRangePreset[]
}

export const DateRangePicker = ({
    range,
    onChange,
    presets,
    error,
    customInput,
    locale='en',
    todayButton='Today',
    placeholder,
    placeholderText,
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
}: DateRangePickerProps) => {
    const [startDate, endDate] = range;
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'custom' | 'preset'>('custom');
    const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const hasPresets = presets != null && presets.length > 0;

    useEffect(() => {
        const handleExternalClick = (e: MouseEvent) => {
            if (dropdownRef.current != null && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleExternalClick);

        return () => document.removeEventListener("mousedown", handleExternalClick);
    }, []);

    const handleChange = useCallback(
        (selected: 'start' | 'end', range: DateRange, event?: SyntheticEvent<any>) => {
            let [newStart, newEnd] = range;

            if (newStart != null && newEnd != null && newStart > newEnd) {
                if (selected === 'start') {
                    newEnd = newStart;
                } else {
                    newStart = newEnd;
                }
            }

            if (onChange != null) {
                onChange([newStart, newEnd], event);
            }
        },
        [onChange]
    );

    const handleSelectPreset = useCallback((preset: DateRangePreset) => {
        setSelectedPreset(preset);
        preset.onSelect(preset);
    }, [setSelectedPreset]);

    const renderCustomTab = () => (
        <Row style={{ gap: '2rem' }}>
            <Col>
                <div style={{ marginBottom: '0.25rem' }}>
                    From
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Datepicker
                        locale={locale}
                        selected={startDate}
                        dateFormat={dateFormat}
                        isClearable={isClearable}
                        popperClassName="commonsku-styles-datepicker no-popper"
                        onChange={(newStart, event) => handleChange('start', [newStart, endDate], event)}
                        {...props}
                    />
                    <Datepicker
                        inline
                        locale={locale}
                        selected={startDate}
                        todayButton={todayButton}
                        dateFormat={dateFormat}
                        isClearable={isClearable}
                        showMonthDropdown={showMonthDropdown}
                        showYearDropdown={showYearDropdown}
                        nextMonthButtonLabel={nextMonthButtonLabel}
                        nextYearButtonLabel={nextYearButtonLabel}
                        previousMonthButtonLabel={previousMonthButtonLabel}
                        previousYearButtonLabel={previousYearButtonLabel}
                        dropdownMode={dropdownMode}
                        peekNextMonth={peekNextMonth}
                        calendarClassName={`commonsku-styles-datepicker ${popperClassName || ''}`}
                        onChange={(newStart, event) => handleChange('start', [newStart, endDate], event)}
                        {...props}
                    />
                </div>
            </Col>
            <Col>
                <div style={{ marginBottom: '0.25rem' }}>
                    To
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Datepicker
                        locale={locale}
                        selected={endDate}
                        dateFormat={dateFormat}
                        isClearable={isClearable}
                        popperClassName="commonsku-styles-datepicker no-popper"
                        onChange={(newEnd, event) => handleChange('end', [startDate, newEnd], event)}
                        {...props}
                    />
                    <Datepicker
                        inline
                        locale={locale}
                        selected={endDate}
                        todayButton={todayButton}
                        dateFormat={dateFormat}
                        isClearable={isClearable}
                        showMonthDropdown={showMonthDropdown}
                        showYearDropdown={showYearDropdown}
                        nextMonthButtonLabel={nextMonthButtonLabel}
                        nextYearButtonLabel={nextYearButtonLabel}
                        previousMonthButtonLabel={previousMonthButtonLabel}
                        previousYearButtonLabel={previousYearButtonLabel}
                        dropdownMode={dropdownMode}
                        peekNextMonth={peekNextMonth}
                        calendarClassName={`commonsku-styles-datepicker ${popperClassName || ''}`}
                        onChange={(newEnd, event) => handleChange('end', [startDate, newEnd], event)}
                        {...props}
                    />
                </div>
            </Col>
        </Row>
    );

    const renderPresetTab = () => (
        <div style={presetListStyles}>
            {presets?.map((preset, idx) => (
                <LabeledRadioInButton
                    key={idx}
                    labelStyle={{  margin: '0', flexGrow: '1', flexBasis: '200px' }}
                    label={preset.label}
                    onChange={() => handleSelectPreset(preset)}
                    checked={selectedPreset != null && preset.label === selectedPreset.label}
                />
            ))}
        </div>
    );

    return (
        <>
            <DateRangeInput
                noMargin
                onInputSelect={() => setOpen(true)}
                onChange={(val) => console.log(val)}
                error={error}
                isClearable={isClearable}
                selected={range}
                dateFormat={dateFormat}
                placeholder={placeholder || placeholderText || `${dateFormat} to ${dateFormat}`}
            />
            {open &&
                <div ref={dropdownRef} style={dropdownStyles}>
                    {hasPresets &&
                        <Row style={{ gap: '2rem', marginBottom: '2rem' }}>
                            <Text
                                style={activeTab === 'custom' ? activeTabStyles : tabStyles}
                                onClick={() => setActiveTab('custom')}
                            >
                                Custom
                            </Text>
                            <Text
                                style={activeTab === 'preset' ? activeTabStyles : tabStyles}
                                onClick={() => setActiveTab('preset')}
                            >
                                Preset
                            </Text>
                        </Row>
                    }
                    {activeTab === 'custom' ? renderCustomTab() : renderPresetTab()}
                </div>     
            }
        </>
    );
}

export default DateRangePicker;
