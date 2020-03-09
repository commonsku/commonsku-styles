import styled, {css} from 'styled-components'

const headingStyle = css`
  font-family: "skufont-demibold", sans-serif;
  color: #123952;
`

const H1= styled.h1<{underlined?:boolean}>`
  font-size: 30px;
  border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
  ${headingStyle}
`;

const H2= styled.h2<{underlined?:boolean}>`
  font-size: 25px;
  border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
  ${headingStyle}
`;

const H3= styled.h3<{underlined?:boolean}>`
  font-size: 25px;
  border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
  ${headingStyle}
`;

const H4= styled.h4<{underlined?:boolean}>`
  font-size: 23px;
  border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
  ${headingStyle}
`;

const H5= styled.h5<{underlined?:boolean}>`
  font-size: 20px;
  border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
  ${headingStyle}
`;

const H6= styled.h6<{underlined?:boolean}>`
  font-size: 18px;
  border-bottom: ${props => props.underlined ? "1px solid #ccc" : "none"};
  ${headingStyle}
`;

export { H1, H2, H3, H4, H5, H6 };
