import React from 'react';
import { isSameDay, isSameWeek, format, getWeek, } from 'date-fns';
import { colors, } from '../Theme';
import { CalendarTask, CalendarTaskProps, } from '../Task';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import Calendar, { CalendarProps } from './Calendar';
import { Tabs, TabType } from '..';
import { useCalendar } from '../hooks';
import { CalendarDaysBody, CalendarDaysHeader, CalendarWrapper, DefaultCalendarFooter } from '.';


export type CalendarTasksHeaderProps = {
    onNextWeek: VoidFunction;
    onPrevWeek: VoidFunction;
    onNextMonth: VoidFunction;
    onPrevMonth: VoidFunction;
    currentMonth: Date;
    currentWeek: number;
    selectedDate: Date;
    [key: string]: any;
};
export const CalendarTasksHeader = ({
    onPrevWeek,
    onNextWeek,
    currentMonth,
    tabs,
}: React.PropsWithChildren<CalendarTasksHeaderProps>) => {
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

export const CalendarTaskDayBody = ({day, tasks=[]}: {[key: string]: any}) => {
    return (
        <Row>
            {tasks
                .filter(t => t.date ? isSameDay(day, typeof t.date !== 'string' ? t.date : new Date(t.date)) : true)
                .map(t => (<Col xs padded><CalendarTask {...t} date="" /></Col>))}
        </Row>
    );
};

type CalendarTasksProps = CalendarProps & {
    tasks: Array<CalendarTaskProps>;
    headerTabs?: Array<TabType>;
    headerTasks?: Array<CalendarTaskProps>;
    components?: {
        Header?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
        Footer?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
    },
};

export const CalendarTasks = ({
    tasks,
    headerTabs=[],
    headerTasks=[],
    components={},
    ...props
}: CalendarTasksProps) => {
    const {
        currentMonth,
        currentWeek,
        selectedDate,
        onNextWeek,
        onPrevWeek,
        onNextMonth,
        onPrevMonth,
        onClickDay,
    } = useCalendar();

    const headerProps = {
        onNextWeek,
        onPrevWeek,
        onNextMonth,
        onPrevMonth,
        currentMonth,
        currentWeek,
        selectedDate,
    };

    return (
        <CalendarWrapper>
            <CalendarTasksHeader {...headerProps} tabs={headerTabs} />
            <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} />
            <CalendarDaysBody
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onClickDay={onClickDay}
                dayBodyProps={{ tasks }}
                components={{ DayBody: CalendarTaskDayBody, }}
            />
            <CalendarTasksFooter {...headerProps} tasks={headerTasks} />
        </CalendarWrapper>
    );
}
