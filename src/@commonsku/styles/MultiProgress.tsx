import styled from 'styled-components'
import React, { useCallback, useRef, useState } from 'react'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import {Text, Number} from './Text'
import { useWindowSize } from './hooks'


const ProgressWrapper = styled.div<SharedStyleTypes>`
  max-width: 100%;
  width: 100%;
  height: 48px;
  background: linear-gradient(180deg, rgba(1, 211, 116, 0.051) 0%, rgba(1, 211, 116, 0.1) 100%);
  box-shadow: 0px 4px 5px rgba(72, 78, 86, 0.1);
  border-radius: 50px;
  
  ${SharedStyles}
`

type ProgressBarValue = {
  value: number,
  text?: (v?: string | number | Object) => string | number,
};
type ProgressBarsProps = React.PropsWithChildren<{
  values: ProgressBarValue[],
  max: number,
  color?: string,
  error?: string,
  title?: string,
} & SharedStyleTypes>;

type ProgressBarProps = Omit<ProgressBarsProps, 'values'> & {
  value: number,
};

const ProgressBar = styled.div<ProgressBarProps>`
  max-width: 100%;
  width: ${props => 100 * props.value / props.max}%;
  height: 48px;
  background: ${props => props.error ? "#B21154" : (
    props.color || "#00d374"
  )};
  border-radius: 50px;
  display: inline-block;
  position: absolute;
`

const StyledProgressTitle = styled(Text)`
  display: inline-block;
  position: absolute;
  z-index: 9;
  vertical-align: middle;
  padding: 12px;
  color: #FFFFFF;
  font-size: 18px;
  text-shadow: 0px 1px 2px #40B07E;
`;


const LabeledBar = (props: ProgressBarProps & {text?: string | number}) => {
  const [width,] = useWindowSize();
  const [size, setSize] = useState({left: 0, width: 0});
  const measureRef = useCallback(node => {
      setSize(node?.getBoundingClientRect())
  }, [width, props.text, props.value]);
  const text = (props.text || '') + '';

  return (
    <>
      <Text style={{
        position: 'absolute',
        display: 'inline-block',
        textAlign: width >= 990 ? 'right' : 'center',
        zIndex: 9,
        marginTop: -25,
        color: '#00d374',
        width: size.width-10,
      }}>{text}</Text>
      <ProgressBar ref={measureRef} {...props} />
    </>
  );
}

const MultiProgress = (props: ProgressBarsProps & {labeled?: boolean}) => {
  const max = typeof props.max === 'number'
                ? props.max
                : !isNaN(props.max) ? parseInt(props.max) : 0;

  return <ProgressWrapper {...props}>
    {props.title ? <StyledProgressTitle>{props.title}</StyledProgressTitle> : null}
    {props.values.map((v: ProgressBarValue, i) => {
      const color = i%2 === 0 ? 'rgba(1, 211, 116, 0.2)' : '#00d374';
      const val = typeof v.value === 'number' ? v.value : !isNaN(v.value) ? parseInt(v.value) : 0;
      return (
        props.labeled ? <LabeledBar
          value={val < max ? val : max}
          max={max}
          error={props.error}
          color={color}
          text={v.text ? v.text(val) : val}
        /> : <ProgressBar
          value={val < max ? val : max}
          max={max}
          error={props.error}
          color={color}
        />
      );
    })}
    {props.error ? <Text color="error" bold>{props.error}</Text> : null}
  </ProgressWrapper>
}

const LabeledMultiProgress = (props: ProgressBarsProps) => {
  return <div>
    <span style={{
      float: 'right',
      paddingRight: 8,
    }}>Target $<Number commas decimalPoints={0} num={props.max}/></span>
    <br />
    <MultiProgress values={props.values} max={props.max} error={props.error} title={props.title} labeled />
  </div>
}

export { MultiProgress, LabeledMultiProgress };
