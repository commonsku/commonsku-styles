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

type PageProps = {
  children: React.ReactNode
};


const Page = React.forwardRef<HTMLDivElement, PageProps>((props: React.PropsWithChildren<SharedStyleTypes>, ref) => {
  return <StyledPage ref={ref} {...props}>
    {props.children}
  </StyledPage>
});

export {Page};
