import React, { ReactNode } from 'react';
import { format, getWeek } from 'date-fns';
import { colors, } from '../Theme';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { Tabs, TabType } from '../Tabs';
import styled from 'styled-components';
import { Text } from '../Text';
import { GearIcon, NextPrevIcon, UserIcon } from '../icons';
import {Dropdown} from '../Dropdown';
import { Button, IconButton } from '../Button';
import { H5 } from '../Headings';
import { TCalendarView, onClickViewFunc } from './types';

const WeekNav = styled(Text)`
  display: inline-block;
  padding: .9rem .5rem;
`;

export type TasksCalendarHeaderProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    onResetDate: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    weekendsCheckbox: ReactNode;
    showAddTaskBtn?: boolean;
    onClickAddTask?: VoidFunction;
    tabs?: TabType[],
    views?: TCalendarView[],
    onClickView?: onClickViewFunc;
};
export const TasksCalendarHeader = ({
    onPrevWeek,
    onNextWeek,
    currentMonth,
    currentWeek,
    onResetDate,
    selectedDate,
    tabs=[],
    views=[],
    weekendsCheckbox,
    showAddTaskBtn=true,
    onClickAddTask,
    onClickView,
}: React.PropsWithChildren<TasksCalendarHeaderProps>) => {
    const isCurrentWeek = currentWeek === getWeek(selectedDate);
    return (
        <HeaderWrapper style={{padding: "0.5rem"}}>
            <Col start xs md={3} padded>
                <H5 style={{marginTop: 10}}>Calendar</H5>
            </Col>
            <Col end xs md={9} padded>
                <div style={{ display: 'inline-block', paddingLeft: 10, verticalAlign: 'middle', }}>
                    {views && views.length ? <>
                        {views.map((v, i) => {
                            const btnProps = {
                                mr: 10,
                                variant: v.selected ? 'secondary' : 'primary-light',
                                size: "medium",
                                onClick: () => {
                                    onClickView && onClickView(v.type, v);
                                },
                                children: v.title,
                            };
                            if (v.Icon) {
                                return <IconButton
                                    {...btnProps}
                                    Icon={v.Icon}
                                    size="medium"
                                    variant={v.selected ? 'secondary' : 'primary-light'}
                                />
                            }
                            return (
                                <Button {...btnProps} />
                            );
                        })}
                    </> : null}
                    {showAddTaskBtn ? <Button size="medium" onClick={onClickAddTask} style={{marginRight: 10, verticalAlign: 'bottom',}}>+ Add Task</Button> : null}
                </div>
                <Dropdown icon={<GearIcon width="25" color="#02C0DA" />}>
                    <Row>{weekendsCheckbox}</Row>
                </Dropdown>
                <WeekNav style={{cursor: 'pointer', color: colors.primary, }} onClick={onPrevWeek}><NextPrevIcon color={"#02C0DA"} width={".8rem"}/></WeekNav>
                <WeekNav style={{ color: colors.disabledButton, verticalAlign: "middle"}}>
                    {currentMonth ? format(currentMonth, "MMM yyyy") : ''}
                    {!isCurrentWeek ? <span style={{
                        display: 'block',
                        textAlign: 'center',
                        borderRadius: 5,
                        background: '#02c0da',
                        color: '#fff',
                        padding: 4,
                        cursor: 'pointer',
                    }} onClick={() => onResetDate()}>Today</span> : null}
                </WeekNav>
                <WeekNav style={{cursor: 'pointer', color: colors.primary, }} onClick={onNextWeek}><NextPrevIcon color={"#02C0DA"} width={".8rem"} next/></WeekNav>
            </Col>
            <Col start xs padded>
                <Tabs size="medium" tabs={tabs} />
            </Col>
        </HeaderWrapper>
    );
};

export default TasksCalendarHeader;
