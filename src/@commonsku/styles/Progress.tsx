import styled from 'styled-components'
import React from 'react'

const ProgressWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  height: 20px;
  background: #ECF4F7;
`

type ProgressBarProps = React.PropsWithChildren<{value: number, max: number}>;
const ProgressBar = styled.div<ProgressBarProps>`
  max-width: 100%;
  width: ${props => 100 * props.value / props.max}%;
  height: 100%;
  background: #00d374;
`

const Progress = (props: ProgressBarProps) => {
  return <ProgressWrapper>
    <ProgressBar value={props.value} max={props.max} />
  </ProgressWrapper>
}

const LabeledProgress = (props: ProgressBarProps) => {
  return <div>
    <strong>
      <span style={{ color: "#00a259" }}>${props.value}</span>
    </strong> / ${props.max}
    <br />
    <Progress value={props.value < props.max ? props.value : props.max} max={props.max} />
  </div>
}

export { Progress, LabeledProgress };
