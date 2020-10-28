import { createGlobalStyle } from 'styled-components';
import { fonts } from './Theme';
 
const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${"'" + fonts.join("','") + "'"};
  }
`;
 
export default GlobalStyle;
