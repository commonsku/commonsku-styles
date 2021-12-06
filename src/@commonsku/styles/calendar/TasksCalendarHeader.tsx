import React, { ReactNode } from 'react';
import { format } from 'date-fns';
import { colors, } from '../Theme';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { Tabs } from '../Tabs';
import styled from 'styled-components';
import { Text } from '../Text';
import {GearIcon, NextPrevIcon} from '../icons';
import {Dropdown} from '../Dropdown';
import { Button } from '../Button';
import { TabType } from '../Tabs';

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
    weekendsCheckbox: ReactNode;
    showAddTaskBtn?: boolean;
    onClickAddTask?: VoidFunction;
    tabs?: TabType[],
};
export const TasksCalendarHeader = ({
    onPrevWeek,
    onNextWeek,
    currentMonth,
    tabs=[],
    weekendsCheckbox,
    showAddTaskBtn=true,
    onClickAddTask,
}: React.PropsWithChildren<TasksCalendarHeaderProps>) => {
    return (
        <HeaderWrapper style={{padding: "0.5rem"}}>
            <Col start xs md={7} padded>
                <Tabs size="small" tabs={tabs} />
            </Col>
            <Col end xs md={5} style={{fontSize: '0.8em'}}>
                {showAddTaskBtn ? <Button onClick={onClickAddTask} style={{marginRight: 10,}}>+ Add Task</Button> : null}
                <Dropdown icon={<GearIcon width="25" color="#02C0DA" />}>
                    <Row>{weekendsCheckbox}</Row>
                </Dropdown>
                <WeekNav style={{cursor: 'pointer', color: colors.primary, }} onClick={onPrevWeek}><NextPrevIcon color={"#02C0DA"} width={".8rem"}/></WeekNav>
                <WeekNav style={{ color: colors.disabledButton, verticalAlign: "middle"}}>
                    {currentMonth ? format(currentMonth, "MMM yyyy") : ''}
                </WeekNav>
                <WeekNav style={{cursor: 'pointer', color: colors.primary, }} onClick={onNextWeek}><NextPrevIcon color={"#02C0DA"} width={".8rem"} next/></WeekNav>
            </Col>
        </HeaderWrapper>
    );
};

export default TasksCalendarHeader;
