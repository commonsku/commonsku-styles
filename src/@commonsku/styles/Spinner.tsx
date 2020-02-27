import styled from 'styled-components'
import React from 'react'

import gears from './gears.gif'
import gearsSmall from './gears-small.gif'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Spinner = ( props : React.PropsWithChildren<{small?:boolean}>) => {
  return <Wrapper>
           <img src={props.small ? gearsSmall : gears}/>
         </Wrapper>
}