import React from 'react';
import { useCalendar } from '../hooks';
import CalendarWrapper from './CalendarWrapper';
import DefaultCalendarHeader from './DefaultCalendarHeader';
import DefaultCalendarFooter from './DefaultCalendarFooter';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarDaysBody from './CalendarDaysBody';
import { CSSObject } from 'styled-components';

export type CalendarHeaderComponentProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    [key: string]: any;
};

export type CalendarProps = {
    components?: {
        Header?: (props: React.PropsWithChildren<CalendarHeaderComponentProps>) => React.ReactElement;
        Footer?: (props: React.PropsWithChildren<CalendarHeaderComponentProps>) => React.ReactElement;
        DayBody?: (props: React.PropsWithChildren<{[key: string]: any}>) => React.ReactElement;
    };
    showHeader?: boolean;
    showFooter?: boolean;
    extraProps?: {
        dayBody?: CSSObject | {[key: string]: any};
        header?: CSSObject | {[key: string]: any};
        footer?: CSSObject | {[key: string]: any};
    };
};
const Calendar = ({ components = {}, extraProps, ...props }: CalendarProps) => {
    const {
        currentMonth,
        currentWeek,
        selectedDate,
        onNextWeek,
        onPrevWeek,
        onNextMonth,
        onPrevMonth,
        onClickDay,
    } = useCalendar();

    const headerProps = {
        onNextWeek,
        onPrevWeek,
        onNextMonth,
        onPrevMonth,
        currentMonth,
        currentWeek,
        selectedDate,
    };

    const renderHeader = () => {
        if (props.showHeader === false) {
            return;
        }
        if (components.Header) {
            return <components.Header
                {...headerProps}
                {...extraProps?.header}
            />
        }
        return (
            <DefaultCalendarHeader
                {...headerProps}
                {...extraProps?.header}
            />
        );
    }

    const renderFooter = () => {
        if (props.showFooter === false) {
            return;
        }
        if (components.Footer) {
            return <components.Footer
                {...headerProps}
                {...extraProps?.footer}
            />
        }
        return <DefaultCalendarFooter {...headerProps} {...extraProps?.footer} />;
    };

    return (
        <CalendarWrapper>
            {renderHeader()}
            <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} />
            <CalendarDaysBody
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onClickDay={onClickDay}
                dayBodyProps={extraProps?.dayBody}
                components={{ DayBody: components?.DayBody, }}
            />
            {renderFooter()}
        </CalendarWrapper>
    );
}

export default Calendar;
