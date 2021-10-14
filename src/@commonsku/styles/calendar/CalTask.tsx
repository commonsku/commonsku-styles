import React from 'react';
import { isSameDay } from 'date-fns';
import Calendar from './Calendar';
import { CalendarTask, CalendarTaskProps, } from '../Task';
import { Row, Col, } from '../FlexboxGrid';

type CalendarTasksProps = {
    tasks: Array<CalendarTaskProps>;
};

export const CalendarTasks = ({
    tasks,
    ...props
}: CalendarTasksProps) => {
    const CalendarTaskDayBody = ({
        day,
    }: { [key: string]: any }) => {
        return (
            <Row>
                {tasks
                    .filter(t => t.date ? isSameDay(day, typeof t.date !== 'string' ? t.date : new Date(t.date)) : true)
                    .map(t => (<Col xs padded><CalendarTask {...t} /></Col>))}
            </Row>
        );
    };

    return (
        <Calendar
            {...props}
            components={{
                DayBody: CalendarTaskDayBody,
            }}
        />
    );
}
