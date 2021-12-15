import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Row, Col, } from '../FlexboxGrid';
import { CalendarTask, CalendarTaskProps } from '../Task';
import HeaderWrapper from './HeaderWrapper';
import { draggableChildWrapperProps } from './styles';

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
            <Col start xs>Overdue: </Col>
            <Col xs>
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
            </Col>
        </HeaderWrapper>
    );
};

export default DraggableCalendarFooterTasks;
