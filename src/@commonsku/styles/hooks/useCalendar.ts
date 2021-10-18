import { useState } from 'react';
import {
    subMonths,
    addMonths,
    addDays,
    isSameDay,
    getWeek,
    addWeeks,
    subWeeks
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
const useCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(today);
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(today);

    const changeMonth = (action: string) => {
        if (action === "prev") {
            setCurrentMonth(subMonths(currentMonth, 1));
        } else if (action === "next") {
            setCurrentMonth(addMonths(currentMonth, 1));
        }
    }

    const changeWeek = (action: string) => {
        let dt = currentMonth;
        if (action === "prev") {
            dt = subWeeks(currentMonth, 1);

        } else if (action === "next") {
            dt = addWeeks(currentMonth, 1);
        }
        setCurrentMonth(dt);
        setCurrentWeek(getWeek(dt));
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
