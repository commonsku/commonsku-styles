import styled from 'styled-components'
import React from 'react'

import gears from './gears.gif'
import gearsSmall from './gears-small.gif'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const Wrapper = styled.div<SharedStyleTypes>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${SharedStyles}
`
type SpinnerProps= {
  children: React.ReactNode
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(( 
  props: React.PropsWithChildren<{small?:boolean} & SharedStyleTypes>, ref) => {
  return <Wrapper ref={ref} {...props}>
    <img alt="Loading..." src={props.small ? gearsSmall : gears}/>
  </Wrapper>
});
