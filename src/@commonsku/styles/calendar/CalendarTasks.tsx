import React, { useState } from 'react';
import { getWeek, startOfWeek, lastDayOfWeek } from 'date-fns';
import { CalendarTaskProps, } from '../Task';
import { CalendarProps } from './Calendar';
import { TabType } from '../Tabs';
import { useCalendar } from '../hooks';
import { CalendarDaysBody, CalendarDaysHeader, CalendarWrapper } from '.';
import { getDatesBetween } from '../hooks/useCalendar';
import CalendarTaskDayBody from './CalendarTaskDayBody';
import CalendarTasksHeader from './CalendarTasksHeader';
import CalendarTasksFooter from './CalendarTasksFooter';


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

const CalendarTasks = ({
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

export default CalendarTasks;
