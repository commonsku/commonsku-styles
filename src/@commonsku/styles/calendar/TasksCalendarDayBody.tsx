import React from 'react';
import { isSameDay } from 'date-fns';
import { Row, Col, } from '../FlexboxGrid';
import { CalendarTask } from '../Task';

export const TasksCalendarDayBody = ({day, tasks=[]}: {[key: string]: any}) => {
    return (
        <Row>
            {tasks
                .filter(t => t.date ? isSameDay(day, typeof t.date !== 'string' ? t.date : new Date(t.date)) : true)
                .map(t => (<Col xs padded><CalendarTask {...t} date="" /></Col>))}
        </Row>
    );
};


export default TasksCalendarDayBody;
