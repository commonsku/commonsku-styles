import styled from 'styled-components';
import { Col } from '../FlexboxGrid';

const StyledDayBody = styled(Col) <{ selected?: boolean; today?: boolean; row?: boolean; disabled?: boolean; }>`
    position: relative;
    height: 15em;
    border-right: 1px solid #eee;
    overflow: hidden;
    cursor: pointer;
    background: #fff;
    transition: 0.25s ease-out;
    font-size: 1.5em;
    overflow-y: auto;

    &:last-child {
        border-right: none;
    }

    &:hover {
        background: #f9f9f9;
        transition: 0.5s ease-out;
    }

    ${p => p.selected ? `
        background: #f9f9f9;
    ` : ''}

    ${p => p.today ? `
        background: #f9f9f9;
    ` : ''}

    ${p => p.row ? `
        border-bottom: 1px solid #eee;
    ` : ''}

    ${p => p.disabled ? `
        color: #ccc;
        pointer-events: none;
    ` : ''}
`;

export default StyledDayBody;