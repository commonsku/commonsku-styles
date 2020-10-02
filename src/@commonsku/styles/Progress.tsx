import styled from 'styled-components'
import React from 'react'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import {Text, Number} from './Text'


const ProgressWrapper = styled.div<SharedStyleTypes>`
  max-width: 100%;
  width: 100%;
  height: 20px;
  background: #ECF4F7;
  ${SharedStyles}
`
type ProgressBarProps = React.PropsWithChildren<{value: number, max: number, error?: string} & SharedStyleTypes>;

const ProgressBar = styled.div<ProgressBarProps>`
  max-width: 100%;
  width: ${props => 100 * props.value / props.max}%;
  height: 100%;
  background: ${props => props.error ? "#B21154" : "#00d374"};
`

const Progress = (props: ProgressBarProps) => {
  const val = typeof props.value === 'number'
                ? props.value
                : !isNaN(props.value) ? parseInt(props.value) : 0;
  const max = typeof props.max === 'number'
                ? props.max
                : !isNaN(props.max) ? parseInt(props.max) : 0;

  return <ProgressWrapper {...props}>
    <ProgressBar value={val < max ? val : max} max={max} error={props.error} />
    {props.error ? <Text color="error" bold>{props.error}</Text> : null}
  </ProgressWrapper>
}

const LabeledProgress = (props: ProgressBarProps) => {
  return <div>
    <strong>
      <span style={{ color: "#00a259" }}>
        $<Number commas decimalPoints={0} num={props.value}/>
      </span>
    </strong> / $<Number commas decimalPoints={0} num={props.max}/> 
    <br />
    <Progress value={props.value} max={props.max} error={props.error}/>
  </div>
}

export { Progress, LabeledProgress };
