import styled, {css} from 'styled-components'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const headingStyle = css`
  font-family: "skufont-demibold", sans-serif;
  color: ${props => getThemeColor(props, 'texttitle')};
  font-weight: bold;
`

const H1= styled.h1<{underlined?:boolean} & SharedStyleTypes>`
  &&& {
    font-size: 30px;
    border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
    ${headingStyle}
    ${SharedStyles}
  }
`;

const H2= styled.h2<{underlined?:boolean} & SharedStyleTypes>`
  &&& {
    font-size: 25px;
    border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
    ${headingStyle}
    ${SharedStyles}
  }
`;

const H3= styled.h3<{underlined?:boolean} & SharedStyleTypes>`
  &&& {
    font-size: 25px;
    border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
    ${headingStyle}
    ${SharedStyles}
  }
`;

const H4= styled.h4<{underlined?:boolean} & SharedStyleTypes>`
  &&& {
    font-size: 23px;
    border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
    ${headingStyle}
    ${SharedStyles}
  }
`;

const H5= styled.h5<{underlined?:boolean} & SharedStyleTypes>`
  &&& {
    font-size: 20px;
    border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
    ${headingStyle}
    ${SharedStyles}
  }
`;

const H6= styled.h6<{underlined?:boolean} & SharedStyleTypes>`
  &&& {
    font-size: 18px;
    border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
    ${headingStyle}
    ${SharedStyles}
  }
`;

export { H1, H2, H3, H4, H5, H6 };
