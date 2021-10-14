import React from 'react';
import { useCalendar } from '../hooks';
import CalendarWrapper from './CalendarWrapper';
import DefaultCalendarHeader from './DefaultCalendarHeader';
import DefaultCalendarFooter from './DefaultCalendarFooter';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarDaysBody from './CalendarDaysBody';

type HeaderComponentProps = {
    onNextWeek?: VoidFunction;
    onPrevWeek?: VoidFunction;
    onNextMonth?: VoidFunction;
    onPrevMonth?: VoidFunction;
    currentMonth?: Date;
    currentWeek?: number;
    selectedDate?: Date;
    [key: string]: any;
};

const Calendar = ({ components = {}, ...props }: {
    components?: {
        Header?: (props: React.PropsWithChildren<HeaderComponentProps>) => React.ReactElement;
        Footer?: (props: React.PropsWithChildren<HeaderComponentProps>) => React.ReactElement;
        DayBody?: (props: React.PropsWithChildren<{[key: string]: any}>) => React.ReactElement;
    };
    showHeader?: boolean;
    showFooter?: boolean;
}) => {
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

    const renderHeader = () => {
        if (props.showHeader === false) {
            return;
        }
        if (components.Header) {
            return <components.Header
                onNextWeek={onNextWeek}
                onPrevWeek={onPrevWeek}
                onNextMonth={onNextMonth}
                onPrevMonth={onPrevMonth}
                currentMonth={currentMonth}
                currentWeek={currentWeek}
                selectedDate={selectedDate}
            />
        }

        return (
            <DefaultCalendarHeader
                onPrevWeek={onPrevWeek}
                onNextWeek={onNextWeek}
                currentMonth={currentMonth} />
        );
    }

    const renderFooter = () => {
        if (props.showFooter === false) {
            return;
        }
        if (components.Footer) {
            return <components.Footer
                onNextWeek={onNextWeek}
                onPrevWeek={onPrevWeek}
                onNextMonth={onNextMonth}
                onPrevMonth={onPrevMonth}
                currentMonth={currentMonth}
                currentWeek={currentWeek}
                selectedDate={selectedDate}
            />
        }

        return <DefaultCalendarFooter currentWeek={currentWeek} />;
    };

    return (
        <CalendarWrapper>
            {renderHeader()}
            <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} />
            <CalendarDaysBody
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onClickDay={onClickDay}
                components={{ DayBody: components?.DayBody, }}
            />
            {renderFooter()}
        </CalendarWrapper>
    );
}

export default Calendar;
