import { createGlobalStyle } from 'styled-components';
import { getThemeProperty } from './Theme';

//This should be on a class instead of body?
const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => getThemeProperty(props, 'fontFamily')};
  }
`;

export default GlobalStyle;
