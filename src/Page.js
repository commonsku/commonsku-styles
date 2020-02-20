import styled from 'styled-components'
import { Typography } from './Typography'
import React from 'react'

/* 

  Styles common for every commonsku page

*/

const StyledPage = styled.div`
  font-family: 'skufont-regular', sans-serif;
`;


function Page (props) {
  return <StyledPage>
           <Typography/>
           {props.children}
         </StyledPage>
}

export {Page};
