import styled, {css} from 'styled-components'

const headingStyle = css`
  font-family: "skufont-demibold", sans-serif;
  color: #123952;
`

const H1= styled.h1`
  font-size: 30px;
  ${headingStyle}
`;

const H2= styled.h2`
  font-size: 25px;
  ${headingStyle}
`;

const H3= styled.h2`
  font-size: 25px;
  ${headingStyle}
`;

const H4= styled.h2`
  font-size: 23px;
  ${headingStyle}
`;

const H5= styled.h2`
  font-size: 20px;
  ${headingStyle}
`;

const H6= styled.h2`
  font-size: 18px;
  ${headingStyle}
`;

export { H1, H2, H3, H4, H5, H6 };
