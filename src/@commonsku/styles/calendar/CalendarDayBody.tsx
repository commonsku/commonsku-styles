import React from 'react';
import { format, isSameDay } from "date-fns";
import StyledDayBody from './StyledDayBody';

type CalendarDayBodyProps = React.PropsWithChildren<{ day: Date, selectedDate: Date, onClick: Function, weekend?: boolean }>;

const CalendarDayBody = ({ day, selectedDate, onClick, children, weekend, ...props }: CalendarDayBodyProps) => {
    const formattedDay = format(day, "d");
    const isToday = isSameDay(day, new Date());
    const isSelected = isSameDay(day, selectedDate);
    const classNames = [
        "day-body-"+formattedDay,
        isToday ? 'day-body-today' : '',
        isSelected ? 'day-body-selected' : '',
    ].filter(v => v).join(' ');
    return (
        <StyledDayBody
            padded
            totalCols={weekend ? 7 : 5}
            xs={1}
            selected={isSelected}
            today={isToday}
            onClick={onClick}
            className={classNames}
            {...props}
        >{children || <span style={{padding: 10,}}>{formattedDay}</span>}</StyledDayBody>
    );
}

export default CalendarDayBody;