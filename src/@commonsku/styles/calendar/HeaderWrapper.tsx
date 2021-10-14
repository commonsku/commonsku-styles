import styled from 'styled-components';
import { Row } from '../FlexboxGrid';

const HeaderWrapper = styled(Row)`
    width: 100%;
    padding: 1.75em 0 !important;
    border-bottom: 1px solid #eee;
    background: #fff;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 115%;
`;

export default HeaderWrapper;

