import React, { useState } from 'react';
import { isSameDay, getWeek, startOfWeek, lastDayOfWeek } from 'date-fns';
import { CalendarTaskProps, } from '../Task';
import { CalendarProps } from './Calendar';
import { TTab } from '../Tabs';
import useCalendar, { getDatesBetween } from '../hooks/useCalendar';
import CalendarDaysBody from './CalendarDaysBody';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarWrapper from './CalendarWrapper';
import TasksCalendarDayBody from './TasksCalendarDayBody';
import TasksCalendarHeader from './TasksCalendarHeader';
import TasksCalendarFooter from './TasksCalendarFooter';
import _ from 'lodash';


export function convertTasksToDays({ currentMonth, currentWeek, tasks, }: { currentMonth: Date, currentWeek?: number, tasks: CalendarTaskProps[], }) {
    return getDatesBetween(
        startOfWeek(currentMonth, { weekStartsOn: 1 }),
        lastDayOfWeek(currentMonth, { weekStartsOn: 1 })
    ).map((day, i) => {
        const newTasks = tasks
            .filter(t => t.date ? isSameDay(day, t.date) : false)
            .map((t, j) => ({
                ...t,
                coordinates: [i, j],
                __id__: `day-${i}-${getWeek(day, { weekStartsOn: 1 })}-task-${j}`})
            );
        return {
            __id__: `day-${i}-${getWeek(day, { weekStartsOn: 1 })}`,
            day,
            tasks: _.orderBy(
                newTasks,
                [v => {
                    if (v.order === undefined) {
                      return v.checked || v.completed ? 0 : 1;
                    }
                    return v.order;
                }],
                ['desc']
            ),
        };
    });
}

type TasksCalendarProps = CalendarProps & {
    tasks: Array<CalendarTaskProps>;
    headerTabs?: Array<TTab>;
    footerTasks?: Array<CalendarTaskProps>;
    components?: {
        Header?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
        Footer?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
    },
};

const TasksCalendar = ({
    tasks,
    headerTabs=[],
    footerTasks=[],
    components={},
    ...props
}: TasksCalendarProps) => {
    const {
        currentMonth,
        currentWeek,
        selectedDate,
        onNextWeek,
        onPrevWeek,
        onNextMonth,
        onPrevMonth,
        onClickDay,
        onReset,
        changeDate,
        changeWeek
    } = useCalendar({});

    /* eslint-disable  @typescript-eslint/no-unused-vars */
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
        changeDate,
        changeWeek
    };

    return (
        <CalendarWrapper>
            <TasksCalendarHeader {...headerProps} onResetDate={onReset} tabs={headerTabs} weekendsCheckbox={<div></div>} />
            <CalendarDaysHeader currentMonth={currentMonth} selectedDate={selectedDate} weekendsCheckbox={<div></div>} weekend={true} />
            <CalendarDaysBody
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onClickDay={onClickDay}
                dayBodyProps={{ tasks }}
                components={{ DayBody: TasksCalendarDayBody, }}
                days={days}
            />
            <TasksCalendarFooter {...headerProps} tasks={footerTasks} />
        </CalendarWrapper>
    );
}

export default TasksCalendar;
