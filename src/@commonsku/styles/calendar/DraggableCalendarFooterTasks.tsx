import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Row, Col, } from '../FlexboxGrid';
import { CalendarTask } from '../Task';
import HeaderWrapper from './HeaderWrapper';
import { draggableChildWrapperProps } from './styles';
import { CalendarTaskProps } from '..';

export type DraggableCalendarFooterTasksProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    [key: string]: any;
};
export const DraggableCalendarFooterTasks = ({
    currentWeek,
    tasks=[],
}: React.PropsWithChildren<DraggableCalendarFooterTasksProps>) => {
    return (
        <HeaderWrapper>
            <Col start xs>
                <span style={{display: 'inline-flex'}}>Past Weeks: </span>
                <span style={{display: 'inline-flex'}}>
                <Row>
                    {tasks
                        .map((t: CalendarTaskProps, j: number) => (
                            <Draggable key={'footer-task-' + j}
                                draggableId={'footer-task-' + j}
                                index={j}
                            >
                                {(provided, snapshot) => (
                                    <Col xs md={3} padded {...draggableChildWrapperProps(provided, snapshot)}>
                                        <CalendarTask {...t} date={undefined} />
                                    </Col>
                                )}
                            </Draggable>
                        ))}
                </Row>  
            </span>
            </Col>
        </HeaderWrapper>
    );
};

export default DraggableCalendarFooterTasks;
