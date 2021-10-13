import _ from 'lodash';
import { createGlobalStyle } from 'styled-components';

//This should be on a class instead of body?
const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => _.get(props, ['theme', 'fontFamily'])};
  }
`;

export default GlobalStyle;
