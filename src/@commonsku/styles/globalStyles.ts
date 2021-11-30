import _ from 'lodash';
import { createGlobalStyle } from 'styled-components';

//This should be on a class instead of body?
const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => _.get(props, ['theme', 'fontFamily'], '"museo-sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif')};
  }
`;

export default GlobalStyle;
