import styled from 'styled-components'
import React from 'react'

const ProgressWrapper = styled.div`
  width: 100%;
  height: 20px;
  background: #ECF4F7;
`

const ProgressBar = styled.div`
  width: ${props => 100 * props.value / props.max}%;
  height: 100%;
  background: #00d374;
`

function Progress (props) {
  return <ProgressWrapper>
           <ProgressBar value={props.value} max={props.max}/>
         </ProgressWrapper>
}

export default Progress;