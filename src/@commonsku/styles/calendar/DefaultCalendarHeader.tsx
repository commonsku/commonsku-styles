import React from 'react';
import { format } from "date-fns";
import { colors } from '../Theme';
import { Col } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';

const DefaultCalendarHeader = ({
    onPrevWeek,
    onNextWeek,
    currentMonth,
}: {
    onPrevWeek: React.MouseEventHandler,
    onNextWeek: React.MouseEventHandler,
    currentMonth: Date,
}) => {
    return (
        <HeaderWrapper middle>
            <Col start padded>
                <div style={{cursor: 'pointer', color: colors.primary, }} onClick={onPrevWeek}>&lt; Prev Week</div>
            </Col>
            <Col center padded>
                <span style={{ color: colors.disabledButton }}>
                    {format(currentMonth, "MMM yyyy")}
                </span>
            </Col>
            <Col end padded>
                <div style={{cursor: 'pointer', color: colors.primary, }} onClick={onNextWeek}>Next Week &gt;</div>
            </Col>
        </HeaderWrapper>
    );
}

export default DefaultCalendarHeader;