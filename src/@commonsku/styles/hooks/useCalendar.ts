import { useState } from 'react';
import {
    subMonths,
    addMonths,
    addDays,
    isSameDay,
    getWeek,
    addWeeks,
    subWeeks,
    getMonth,
    getYear
} from "date-fns";

const today = new Date();
export const getDatesBetween = (startDt: Date, endDt: Date) => {
    const result: Array<Date> = [];
    let currentDt = startDt;
    while (currentDt <= endDt) {
        result.push(currentDt);
        currentDt = addDays(currentDt, 1);
    }
    return result;
};
export type onChangeWeekFunc = (obj: {date: Date, week: number, month: number, year: number, action: string}) => void;
export type onChangeMonthFunc = (obj: {date: Date, month: number, year: number, action: string}) => void;
export type changeWeekFunc = (action: string, value?: Date | undefined) => void;
export type changeDateFunc = (value: Date) => void;
export type useCalendarProps = {
    onChangeWeek?: onChangeWeekFunc,
    onChangeMonth?: onChangeMonthFunc,
};
const useCalendar = ({
    onChangeWeek,
    onChangeMonth,
}: useCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(today);
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(today);

    const changeMonth = (action: string) => {
        let dt = currentMonth;
        if (action === "prev") {
            dt = subMonths(currentMonth, 1);
        } else if (action === "next") {
            dt = addMonths(currentMonth, 1);
        } else if (action === "reset") {
            dt = today;
        }
        setCurrentMonth(dt);
        onChangeMonth && onChangeMonth({
            action,
            date: dt,
            month: getMonth(dt),
            year: getYear(dt),
        });
    }

    const changeWeek = (action: string, value?: Date) => {
        let dt = currentMonth;
        if (action === "prev") {
            dt = subWeeks(currentMonth, 1);

        } else if (action === "next") {
            dt = addWeeks(currentMonth, 1);
        } else if (action === "reset") {
            dt = today;
        } else if (action === "custom" && value) {
            dt = value;
        }
        setCurrentMonth(dt);
        const week = getWeek(dt);
        setCurrentWeek(week);
        onChangeWeek && onChangeWeek({
            action,
            date: dt,
            week: week,
            month: getMonth(dt),
            year: getYear(dt),
        });
    }

    const changeDate = (value: Date) => {
        setCurrentMonth(value);
        const week = getWeek(value);
        setCurrentWeek(week);
        onChangeWeek && onChangeWeek({
            action: 'change-date',
            date: value,
            week: week,
            month: getMonth(value),
            year: getYear(value),
        });
    }

    const onClickDay = (day: Date) => {
        if (isSameDay(day, selectedDate)) {
            setSelectedDate(today);
        } else {
            setSelectedDate(day);
        }
    };

    // reset to today's date
    const resetToToday = () => {
        setSelectedDate(today);
        changeWeek('reset');
    };

    const onNextWeek = () => changeWeek("next");
    const onPrevWeek = () => changeWeek("prev");
    const onNextMonth = () => changeMonth("next");
    const onPrevMonth = () => changeMonth("prev");

    return {
        currentMonth,
        currentWeek,
        selectedDate,

        setSelectedDate,
        setCurrentWeek,
        setCurrentMonth,

        onClickDay,
        onNextWeek,
        onPrevWeek,
        onNextMonth,
        onPrevMonth,

        changeWeek,
        changeDate,

        getDatesBetween,
        onReset: resetToToday,
    };
}

export default useCalendar;
