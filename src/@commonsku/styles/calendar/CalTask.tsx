import React, { useState } from 'react';
import { isSameDay, format, getWeek, startOfWeek, lastDayOfWeek } from 'date-fns';
import { colors, } from '../Theme';
import { CalendarTask, CalendarTaskProps, } from '../Task';
import { Row, Col, } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';
import { CalendarProps } from './Calendar';
import { Tabs, TabType } from '..';
import { useCalendar } from '../hooks';
import { CalendarDaysBody, CalendarDaysHeader, CalendarWrapper } from '.';
import { getDatesBetween } from '../hooks/useCalendar';


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

function convertTasksToDays({ currentMonth, currentWeek, tasks, }) {
    return getDatesBetween(
        startOfWeek(currentMonth, { weekStartsOn: 1 }),
        lastDayOfWeek(currentMonth, { weekStartsOn: 1 })
    ).map((day, i) => ({
        id: 'day-'+i,
        day,
        tasks: tasks
            .filter(t => t.date ? currentWeek === getWeek(typeof t.date !== 'string' ? t.date : new Date(t.date)) : true)
            .map((t, j) => ({...t, coordinates: [i, j],  id: `day-${i}-task-${j}`})),
    }));
}

type CalendarTasksProps = CalendarProps & {
    tasks: Array<CalendarTaskProps>;
    headerTabs?: Array<TabType>;
    footerTasks?: Array<CalendarTaskProps>;
    components?: {
        Header?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
        Footer?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
    },
};

export const CalendarTasks = ({
    tasks,
    headerTabs=[],
    footerTasks=[],
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

    const [days, setDays] = useState(
        convertTasksToDays({currentMonth, currentWeek, tasks,})
    );

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
                days={days}
            />
            <CalendarTasksFooter {...headerProps} tasks={footerTasks} />
        </CalendarWrapper>
    );
}
