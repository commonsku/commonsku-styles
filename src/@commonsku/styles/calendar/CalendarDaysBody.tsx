import React from 'react';
import { CSSObject } from 'styled-components';
import { getWeek } from 'date-fns';
import { Row } from '../FlexboxGrid';
import CalendarDayBody from './CalendarDayBody';
import DaysBodyWrapper from './DaysBodyWrapper';

type CalendarDaysBodyProps = {
    days: Array<{__id__: string, day: Date}>;
    currentMonth: Date,
    selectedDate: Date,
    onClickDay?: (day: Date) => any,
    dayBodyProps?: CSSObject | { [key: string]: any },
    components?: {
        DayBody?: (props: React.PropsWithChildren<{day: Date; selectedDate: Date; onClick: React.MouseEventHandler; [key: string]: any}>) => React.ReactElement;
    },
};

const CalendarDaysBody = ({ days=[], currentMonth, selectedDate, onClickDay, components, dayBodyProps={}, ...props }: CalendarDaysBodyProps) => {
    return (
        <DaysBodyWrapper className="days-body-wrapper" {...props}>
            <Row className="day-body-wrapper-row">
                {days.map(({day, __id__}, i) => (
                    <CalendarDayBody
                        key={`day-body-${getWeek(day)}-${i}`}
                        day={day}
                        selectedDate={selectedDate}
                        onClick={() => {onClickDay && onClickDay(day);}}
                        weekend={true}
                        children={components?.DayBody
                            ? <components.DayBody
                                key={`day-body-${getWeek(day)}-${i}`}
                                day={day}
                                selectedDate={selectedDate}
                                onClick={() => {onClickDay && onClickDay(day);}}
                                id={__id__}
                                {...dayBodyProps}
                            /> : null}
                    />
                ))}
            </Row>
        </DaysBodyWrapper>
    );
}

export default CalendarDaysBody;