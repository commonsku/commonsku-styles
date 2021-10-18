import React from 'react';
import { Col } from '../FlexboxGrid';
import HeaderWrapper from './HeaderWrapper';

const DefaultCalendarFooter = ({
    currentWeek
}: { currentWeek: number }) => {
    return (
        <HeaderWrapper middle>
            <Col center>Week {currentWeek}</Col>
        </HeaderWrapper>
    );
}

export default DefaultCalendarFooter;