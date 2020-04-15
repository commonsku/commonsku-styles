import styled from 'styled-components'
import React from 'react'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

/* 

  Styles common for every commonsku page

*/

const StyledPage = styled.div<SharedStyleTypes>`
  font-family: 'skufont-regular', sans-serif;
  ${SharedStyles}
`;

function Page (props: React.PropsWithChildren<SharedStyleTypes>) {
  return <StyledPage {...props}>
    {props.children}
  </StyledPage>
}

export {Page};
