import React from 'react';
import { getWeek } from 'date-fns';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { CalendarTask } from '../Task';

export type CalendarTasksFooterProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    [key: string]: any;
};
export const CalendarTasksFooter = ({
    currentWeek,
    tasks=[],
}: React.PropsWithChildren<CalendarTasksFooterProps>) => {
    return (
        <HeaderWrapper>
            <Col start xs>
            <span style={{display: 'inline-flex'}}>Past Weeks: </span>
            <span style={{display: 'inline-flex'}}>
                <Row>
                    {tasks
                        .filter(t => t.date ? currentWeek == getWeek(typeof t.date !== 'string' ? t.date : new Date(t.date)) : true)
                        .map(t => (<Col xs md={3} padded><CalendarTask {...t} date="" /></Col>))}
                </Row>  
            </span>
            </Col>
        </HeaderWrapper>
    );
};

export default CalendarTasksFooter;
