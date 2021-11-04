import React from 'react';
import { format } from 'date-fns';
import { colors, } from '../Theme';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { Tabs } from '../Tabs';
import styled from 'styled-components';
import { Text } from '../Text';

const WeekNav = styled(Text)`
  display: inline-block;
  padding: .9rem .5rem;
`;

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
        <HeaderWrapper style={{padding: "0.5rem"}}>
            <Col start xs md={9} padded>
                <Tabs size="small" tabs={tabs} />
            </Col>
            <Col end xs md={3} style={{fontSize: '0.8em'}}>
                        <WeekNav style={{cursor: 'pointer', color: colors.primary, }} onClick={onPrevWeek}>‹ Previous</WeekNav>
                        <WeekNav style={{ color: colors.disabledButton }}>
                            {currentMonth ? format(currentMonth, "MMM yyyy") : ''}
                        </WeekNav>
                        <WeekNav style={{cursor: 'pointer', color: colors.primary, }} onClick={onNextWeek}>Next ›</WeekNav>
            </Col>
        </HeaderWrapper>
    );
};

export default TasksCalendarHeader;
