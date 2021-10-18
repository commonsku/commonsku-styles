import React from 'react';
import { isSameDay } from 'date-fns';
import { Row, Col, } from '../FlexboxGrid';
import { CalendarTask, CalendarTaskProps } from '../Task';

export const TasksCalendarDayBody = ({day, tasks=[]}: {day: Date; tasks: CalendarTaskProps[]; [key: string]: any}) => {
    return (
        <Row>
            {tasks
                .filter(t => t.date ? isSameDay(day, typeof t.date !== 'string' ? t.date : new Date(t.date)) : true)
                .map(t => (<Col xs padded><CalendarTask {...t} date={undefined} /></Col>))}
        </Row>
    );
};


export default TasksCalendarDayBody;
