import styled from 'styled-components'
import { getThemeColor } from '../Theme';

const InputIconLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${p => {
    return {
      fontSize: '1rem',
      fontFamily: "'skufont-regular', sans-serif",
      boxSizing: 'border-box',
      backgroundColor: getThemeColor(p, 'input.background'),
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      width: '100%',
      border: `1px solid ${getThemeColor(p, 'input.border')}`,
      borderRadius: 5,
      padding: 0,
      color: getThemeColor(p, 'input.text'),
      ':hover': {
        borderColor: getThemeColor(p, 'input.hover.border'),
      },
    };
  }}
`;

export default InputIconLabelContainer;
