import { createGlobalStyle } from 'styled-components';
import { getThemeProperty } from './Theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => getThemeProperty(props, 'fontFamily')};
  }
`;

export default GlobalStyle;
