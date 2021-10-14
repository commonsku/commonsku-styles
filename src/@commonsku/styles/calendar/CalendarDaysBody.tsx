import React from 'react';
import { startOfWeek, lastDayOfWeek } from "date-fns";
import { getDatesBetween } from '../hooks/useCalendar';
import { Row } from '../FlexboxGrid';
import CalendarDayBody from './CalendarDayBody';
import DaysBodyWrapper from './DaysBodyWrapper';

const CalendarDaysBody = ({ currentMonth, selectedDate, onClickDay }: { currentMonth: Date, selectedDate: Date, onClickDay?: (day: Date) => any, }) => {
    const days = getDatesBetween(
        startOfWeek(currentMonth, { weekStartsOn: 1 }),
        lastDayOfWeek(currentMonth, { weekStartsOn: 1 })
    );
    return (
        <DaysBodyWrapper className="days-body-wrapper">
            <Row className="day-body-wrapper-row">
                {days.map((day, i) => (
                    <CalendarDayBody
                        key={'day-body-' + i}
                        day={day}
                        selectedDate={selectedDate}
                        onClick={() => {onClickDay && onClickDay(day);}}
                    />
                ))}
            </Row>
        </DaysBodyWrapper>
    );
}

export default CalendarDaysBody;