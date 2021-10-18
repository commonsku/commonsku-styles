import React from 'react';
import { format, isSameDay, addDays, startOfWeek, getWeek, } from "date-fns";
import { Text } from '../Text';
import { Col } from '../FlexboxGrid';
import DaysHeaderWrapper from './DaysHeaderWrapper';
import StyledDayText from './StyledDayText';

const CalendarDaysHeader = ({
    currentMonth,
    selectedDate,
}: { currentMonth: Date; selectedDate: Date; [key: string]: any }) => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    return (
        <DaysHeaderWrapper style={{ fontSize: '1rem' }}>
            {Array.from(Array(7).keys()).map(i => {
                const day = addDays(startDate, i);
                const isToday = isSameDay(day, new Date());
                const className = isToday ? 'day-today' : (
                    isSameDay(day, selectedDate) ? 'day-selected' : ''
                );
                return (
                    <Col center key={`day-${getWeek(day)}-${i}`} className={className}>
                        <Text style={{ paddingRight: 10, }}>{format(day, "EEE")}</Text>
                        <StyledDayText selected={isToday}>
                            {format(day, 'd')}
                        </StyledDayText>
                    </Col>
                );
            })}
        </DaysHeaderWrapper>
    );
}

export default CalendarDaysHeader;