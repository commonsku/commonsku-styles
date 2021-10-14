import styled from 'styled-components';
import { Row } from '../FlexboxGrid';

const DaysHeaderWrapper = styled(Row)`
    text-transform: uppercase;
    font-weight: 400;
    color: #ccc;
    font-size: 70%;
    padding: 0.75em 0 !important;
    border-bottom: 1px solid #eee;
`;

export default DaysHeaderWrapper;