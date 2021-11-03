import styled from 'styled-components';

const CalendarWrapper = styled.div`
    display: block;
    position: relative;
    width: 100%;
    background: #fff;
    .calendar-scroll {
      overflow-x: scroll;
     }
    .days-body-wrapper, .days-header-wrapper {
      min-width: 900px;
    }
`;

export default CalendarWrapper;

