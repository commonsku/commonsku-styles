import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Row, Col, } from '../FlexboxGrid';
import { CalendarTask, CalendarTaskProps } from '../Task';
import HeaderWrapper from './HeaderWrapper';
import { draggableChildWrapperProps } from './styles';
import { onUpdateTaskFunc, onClickTaskFunc } from './types';

export type DraggableCalendarFooterTasksProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    onClickTask?: onClickTaskFunc;
    onUpdateTask?: onUpdateTaskFunc;
    tasks: Array<CalendarTaskProps>;
};
export const DraggableCalendarFooterTasks = ({
    onClickTask,
    onUpdateTask,
    tasks = [],
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
                                    <Col xs md={3} padded
                                        {...draggableChildWrapperProps(provided, snapshot)}
                                       onClick={(e: React.MouseEvent) => { onClickTask && onClickTask(t); }}
                                    >
                                        <CalendarTask
                                            {...t}
                                            date={undefined}
                                            onClickCheckbox={(completed: boolean) => {
                                                if (onUpdateTask) {
                                                    onUpdateTask({ ...t, completed, }, {
                                                        index: j,
                                                        action: 'TOGGLE_CHECKBOX',
                                                        oldTask: t,
                                                        updatedFields: ['completed'],
                                                    });
                                                } else if (t.onClickCheckbox) {
                                                    t.onClickCheckbox(completed);
                                                }
                                            }}
                                            onClickTask={onClickTask}
                                        />
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
