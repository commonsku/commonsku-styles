import React, { CSSProperties, SyntheticEvent, forwardRef, useCallback, useState } from 'react';
import Datepicker, { DatepickerProps } from './Datepicker';
import { LabeledRadioInButton } from './Input';

import { Text } from './Text';
import { Col, Row } from './FlexboxGrid';
import colors from './colors';

const tabStyles: CSSProperties = {
    fontSize: '20px',
    fontWeight: '500',
    color: '#768B98',
    cursor: 'pointer',
};

const activeTabStyles: CSSProperties = {
    ...tabStyles,
    color: colors.neutrals['darkest'],
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
};

const dateRangeLabelStyles: CSSProperties = {
    color: colors.neutrals['darkest'],
    marginBottom: '0.25rem',
};

export interface DateRange {
    category: string
    startDate?: Date | null
    endDate?: Date | null
}

export interface DateRangePreset {
    name: string
    label: string
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

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>((
    {
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
        isClearable=true,
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
        style,
        ...props
    },
    ref
) => {
    const { startDate, endDate } = range;
    const [activeTab, setActiveTab] = useState<'custom' | 'preset'>('custom');
    const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>();

    // Workaround for react-datepicker selection bug
    // https://github.com/Hacker0x01/react-datepicker/issues/3367
    const [startDateKey, setStartDateKey] = useState(0);
    const [endDateKey, setEndDateKey] = useState(0);

    const hasPresets = presets != null && presets.length > 0;

    const handleChange = useCallback(
        (selected: 'start' | 'end', newStart?: Date | null, newEnd?: Date | null, event?: SyntheticEvent<any>) => {
            if (newStart != null && newEnd != null && newStart > newEnd) {
                if (selected === 'start') {
                    newEnd = newStart;
                } else {
                    newStart = newEnd;
                }
            }

            // Forces the calendars to re-render on date change
            setStartDateKey(startDateKey + 1);
            setEndDateKey(endDateKey + 1);

            if (onChange != null) {
                const newDateRange: DateRange = {
                    category: "custom",
                    startDate: newStart,
                    endDate: newEnd,
                };

                onChange(newDateRange, event);
            }
        },
        [endDateKey, onChange, startDateKey]
    );

    const handleSelectPreset = useCallback((preset: DateRangePreset) => {
        setSelectedPreset(preset);
        if (onChange != null) {
            onChange({ category: preset.name });
        }
    }, [onChange, setSelectedPreset]);

    const renderCustomTab = () => (
        <Row style={{ flexFlow: 'row', gap: '2rem' }}>
            <Col>
                <div style={dateRangeLabelStyles}>
                    From
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Datepicker
                        open={false}
                        locale={locale}
                        selected={startDate}
                        dateFormat={dateFormat}
                        isClearable={isClearable}
                        onChange={(newStart, event) => handleChange('start', newStart, endDate, event)}
                    />
                    <Datepicker
                        key={startDateKey}
                        inline
                        locale={locale}
                        selected={startDate}
                        selectsStart
                        startDate={startDate ?? (endDate ? new Date(0) : null)}
                        endDate={endDate ?? (startDate ? new Date(9999, 1, 1) : null)}
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
                        calendarClassName={`commonsku-styles-datepicker daterangepicker ${popperClassName || ''}`}
                        onChange={(newStart, event) => handleChange('start', newStart, endDate, event)}
                        {...props}
                    />
                </div>
            </Col>
            <Col>
                <div style={dateRangeLabelStyles}>
                    To
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Datepicker
                        open={false}
                        locale={locale}
                        selected={endDate}
                        dateFormat={dateFormat}
                        isClearable={isClearable}
                        onChange={(newEnd, event) => handleChange('end', startDate, newEnd, event)}
                    />
                    <Datepicker
                        key={endDateKey}
                        inline
                        locale={locale}
                        selected={endDate}
                        selectsEnd
                        startDate={startDate ?? (endDate ? new Date(0) : null)}
                        endDate={endDate ?? (startDate ? new Date(9999, 1, 1) : null)}
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
                        calendarClassName={`commonsku-styles-datepicker daterangepicker ${popperClassName || ''}`}
                        onChange={(newEnd, event) => handleChange('end', startDate, newEnd, event)}
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
        <div ref={ref} style={style}>
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
    );
});

export default DateRangePicker;
