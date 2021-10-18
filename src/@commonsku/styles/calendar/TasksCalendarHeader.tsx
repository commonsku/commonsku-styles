import React from 'react';
import { format } from 'date-fns';
import { colors, } from '../Theme';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { Tabs } from '..';


export type TasksCalendarHeaderProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    [key: string]: any;
};
export const TasksCalendarHeader = ({
    onPrevWeek,
    onNextWeek,
    currentMonth,
    tabs,
}: React.PropsWithChildren<TasksCalendarHeaderProps>) => {
    return (
        <HeaderWrapper>
            <Col start xs md={7}>
                <Tabs tabs={tabs} />
            </Col>
            <Col end xs md={5}>
                <Row>
                    <Col start padded>
                        <div style={{cursor: 'pointer', color: colors.primary, }} onClick={onPrevWeek}>&lt; Prev Week</div>
                    </Col>
                    <Col center padded>
                        <span style={{ color: colors.disabledButton }}>
                            {currentMonth ? format(currentMonth, "MMM yyyy") : ''}
                        </span>
                    </Col>
                    <Col end padded>
                        <div style={{cursor: 'pointer', color: colors.primary, }} onClick={onNextWeek}>Next Week &gt;</div>
                    </Col>
                </Row>
            </Col>
        </HeaderWrapper>
    );
};

export default TasksCalendarHeader;
