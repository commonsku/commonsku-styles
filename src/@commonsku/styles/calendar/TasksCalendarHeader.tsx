import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { format, getWeek, isDate } from 'date-fns';
import { colors, themeOptions, } from '../Theme';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { Tabs, TTab } from '../Tabs';
import { Text, Link } from '../Text';
import { GearIcon, NextPrevIcon, Calendar2Icon } from '../icons';
import {Dropdown} from '../Dropdown';
import { Button, IconButton, TSize, ButtonVariant } from '../Button';
import { H5 } from '../Headings';
import { TCalendarView, onClickViewFunc } from './types';
import { Datepicker } from '../Datepicker';
import { changeDateFunc, changeWeekFunc } from '../hooks/useCalendar';

const WeekNav = styled(Text)`
  display: inline-block;
  padding: 0;
`;

type TextDatePickerProps = {
    value?: string | null,
    onClick?: React.MouseEventHandler<HTMLElement>,
};
const CalendarIconDatePicker = React.forwardRef(({ value, onClick }: TextDatePickerProps, ref: React.Ref<HTMLElement>) => {
    return (
        <span ref={ref} onClick={onClick}>
            <Calendar2Icon
                height={23}
                width={25}
                style={{
                    display: 'block',
                    textAlign: 'center',
                    borderRadius: 5,
                    padding: 4,
                    cursor: 'pointer',
                    color: colors.disabledButton,
                }}
            />
        </span>
    );
});

export type TasksCalendarHeaderProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    changeDate: changeDateFunc;
    changeWeek: changeWeekFunc;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    onResetDate: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    weekendsCheckbox: ReactNode;
    showAddTaskBtn?: boolean;
    onClickAddTask?: VoidFunction;
    tabs?: TTab[],
    views?: TCalendarView[],
    onClickView?: onClickViewFunc;
};
export const TasksCalendarHeader = ({
    onPrevWeek,
    onNextWeek,
    currentMonth,
    currentWeek,
    changeDate,
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
                <H5 style={{marginTop: 15}}>
                    {format(currentMonth, "MMMM yyyy")}
                </H5>
            </Col>
            <Col end xs md={6} lg={6} xl={7}>
                <div style={{ display: 'inline-block', paddingLeft: 10, verticalAlign: 'middle', }}>
                    {views && views.length ? <>
                        {views.map((v, i) => {
                            const btnProps = {
                                mr: 10,
                                variant: (v.selected ? 'secondary' : 'primary-light') as ButtonVariant,
                                size: "medium" as TSize,
                                onClick: () => {
                                    onClickView && onClickView(v.type, v);
                                },
                                children: v.title,
                            };
                            if (v.Icon) {
                                return <IconButton {...btnProps} Icon={v.Icon} />
                            }
                            return (
                                <Button {...btnProps} />
                            );
                        })}
                    </> : null}
                </div>
            </Col>
            <Col end xs sm md={3} lg={3} xl={2} xsStyle={`
                @media only screen and (min-width: 380px) and (max-width: 840px) {
                    width: 100%;
                    max-width: 100%;
                }
            `}>
                <Dropdown
                    style={{verticalAlign: 'middle'}}
                    icon={<GearIcon width="25" color={colors.primary1.main} />}
                >
                    <Row>{weekendsCheckbox}</Row>
                </Dropdown>
                <span style={{
                    verticalAlign: 'middle',
                    paddingLeft: 5,
                    display: 'inline-block',
                    fontFamily: [themeOptions.fontFamilies.regular].concat(themeOptions.fontFamilies.fallbacks).join(','),
                    fontWeight: 500,
                    height: 30,
                }}>
                    <Datepicker
                        value={currentMonth}
                        customInput={<CalendarIconDatePicker />}
                        popperPlacement={'bottom-end'}
                        onChange={(value: any) => {
                            if (value instanceof Date && isDate(value)) {
                                changeDate(value);
                            }
                        }}
                    />
                </span>
                <span>
                    <WeekNav
                        style={{cursor: 'pointer', color: colors.primary, verticalAlign: 'middle'}}
                        onClick={onPrevWeek}
                    ><NextPrevIcon color={"#02C0DA"} width={".8rem"} /></WeekNav>
                    <WeekNav
                        as={Button}
                        variant="text"
                        size="primary-light"
                        style={{verticalAlign: "middle", padding: 10,}}
                        py={5}
                        onClick={() => {
                            if (isCurrentWeek) {
                                return;
                            }
                            onResetDate();
                        }}
                    >Today</WeekNav>
                    <WeekNav
                        style={{cursor: 'pointer', color: colors.primary1.main, verticalAlign: 'middle'}}
                        onClick={onNextWeek}
                    ><NextPrevIcon color={"#02C0DA"} width={".8rem"} next /></WeekNav>
                </span>
            </Col>
            <Col start xs md={8} padded>
                <Tabs size="medium" tabs={tabs} />
            </Col>
            <Col end xs md={4} padded>
                {showAddTaskBtn ?
                    <Link
                        as="span"
                        onClick={onClickAddTask}
                        style={{
                            marginRight: 10,
                            verticalAlign: 'bottom',
                            color: colors.primary1.main,
                            fontFamily: [themeOptions.fontFamilies.regular].concat(themeOptions.fontFamilies.fallbacks).join(','),
                            fontWeight: 600,
                        }}
                    >+ Add Task</Link>
                : null}
            </Col>
        </HeaderWrapper>
    );
};

export default TasksCalendarHeader;
