import styled from 'styled-components';
import { colors } from '../Theme';
import { Text } from '../Text';

const StyledDayText = styled(Text) <{ selected?: boolean; }>`
    ${props => props.selected ? `
        border-radius: 15px;
        background: ${colors.cta};
        color: white;
        font-weight: bold;
        padding: 0 5px;
    ` : ''}
`;

export default StyledDayText;