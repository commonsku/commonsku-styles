import React from 'react';
import { getWeek } from 'date-fns';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { CalendarTask, CalendarTaskProps } from '../Task';

export type TasksCalendarFooterProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    [key: string]: any;
};
export const TasksCalendarFooter = ({
    currentWeek,
    tasks=[],
}: React.PropsWithChildren<TasksCalendarFooterProps>) => {
    return (
        <HeaderWrapper>
            <Col start xs>
            <span style={{display: 'inline-flex'}}>Overdue: </span>
            <span style={{display: 'inline-flex'}}>
                <Row>
                    {tasks
                        /* eslint-disable eqeqeq */
                        .filter((t: CalendarTaskProps) => t.date ? currentWeek == getWeek(t.date, { weekStartsOn: 1 }) : true)
                        .map((t: CalendarTaskProps) => (<Col xs md={3} padded><CalendarTask {...t} date={undefined} /></Col>))}
                </Row>  
            </span>
            </Col>
        </HeaderWrapper>
    );
};

export default TasksCalendarFooter;
