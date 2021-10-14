import React from 'react';
import { startOfWeek, lastDayOfWeek } from "date-fns";
import { getDatesBetween } from '../hooks/useCalendar';
import { Row } from '../FlexboxGrid';
import CalendarDayBody from './CalendarDayBody';
import DaysBodyWrapper from './DaysBodyWrapper';

type CalendarDaysBodyProps = {
    currentMonth: Date,
    selectedDate: Date,
    onClickDay?: (day: Date) => any,
    components?: {
        DayBody?: (props: React.PropsWithChildren<{[key: string]: any}>) => React.ReactElement;
    },
};

const CalendarDaysBody = ({ currentMonth, selectedDate, onClickDay, components, ...props }: CalendarDaysBodyProps) => {
    const days = getDatesBetween(
        startOfWeek(currentMonth, { weekStartsOn: 1 }),
        lastDayOfWeek(currentMonth, { weekStartsOn: 1 })
    );
    return (
        <DaysBodyWrapper className="days-body-wrapper" {...props}>
            <Row className="day-body-wrapper-row">
                {days.map((day, i) => (
                    <CalendarDayBody
                        key={'day-body-' + i}
                        day={day}
                        selectedDate={selectedDate}
                        onClick={() => {onClickDay && onClickDay(day);}}
                        children={components?.DayBody
                            ? <components.DayBody
                                key={'day-body-' + i}
                                day={day}
                                selectedDate={selectedDate}
                                onClick={() => {onClickDay && onClickDay(day);}}
                            /> : null}
                    />
                ))}
            </Row>
        </DaysBodyWrapper>
    );
}

export default CalendarDaysBody;