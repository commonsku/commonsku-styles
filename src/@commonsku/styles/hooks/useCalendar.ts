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
export type onChangeWeekFunc = (obj: {week: number, month: number, year: number, action: string}) => void;
export type onChangeMonthFunc = (obj: {month: number, year: number, action: string}) => void;
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
        }
        setCurrentMonth(dt);
        onChangeMonth && onChangeMonth({
            action,
            month: getMonth(dt),
            year: getYear(dt),
        });
    }

    const changeWeek = (action: string) => {
        let dt = currentMonth;
        if (action === "prev") {
            dt = subWeeks(currentMonth, 1);

        } else if (action === "next") {
            dt = addWeeks(currentMonth, 1);
        }
        setCurrentMonth(dt);
        const week = getWeek(dt);
        setCurrentWeek(week);
        onChangeWeek && onChangeWeek({
            action,
            week: week,
            month: getMonth(dt),
            year: getYear(dt),
        });
    }

    const onClickDay = (day: Date) => {
        if (isSameDay(day, selectedDate)) {
            setSelectedDate(today);
        } else {
            setSelectedDate(day);
        }
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

        getDatesBetween,
    };
}

export default useCalendar;
