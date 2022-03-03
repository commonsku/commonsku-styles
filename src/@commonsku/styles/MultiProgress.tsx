import styled from 'styled-components'
import React, { useCallback, useRef, useState } from 'react'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import {Text, Number} from './Text'
import { useWindowSize } from './hooks'
import { Label } from './Label'

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
  value: number;
  text?: (v?: string | number | Object) => string | number;
  color?: string;
  textColor?: string;
};
type ProgressBarsProps = React.PropsWithChildren<{
  values: ProgressBarValue[],
  max: number,
  color?: string,
  error?: string,
  title?: string,
} & SharedStyleTypes>;

type ProgressBarProps = Omit<ProgressBarsProps, 'values'> & {
  value: number;
  left?: number;
};

const ProgressBar = styled.div<ProgressBarProps>`
  max-width: 100%;
  width: ${p => `calc(${100 * (!p.max ? 1 : (p.value / p.max))}% - (${p.left || 0}px + 17px))`};
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

type LabeledBarprops = ProgressBarProps & {
  text?: string | number,
  textColor?: string,
};
const LabeledBar = (props: LabeledBarprops) => {
  const [width,] = useWindowSize();
  const [size, setSize] = useState({height: 0, width: 0, x: 0, y: 0,});
  const measureRef = useCallback(node => {
    const rect: DOMRect | undefined = node?.getBoundingClientRect() as DOMRect;
    setSize(s => (rect ? {
      ...s,
      height: rect.height,
      x: rect.x,
      y: rect.y,
      width: (rect.width > width ? width : rect.width)-rect.x,
    } : {...s, height: 0, width: 0, x: 0, y: 0,}));
  }, [width, props.text, props.value]);
  const text = (props.text || '') + '';

  return (
    <>
      <Text style={{
        position: 'absolute',
        display: 'inline-block',
        textAlign: width >= 990 ? 'right' : 'center',
        zIndex: 9,
        marginTop: -24,
        color: '#00d374',
        // width: `calc(${100 * props.value / props.max}% - (${size.x || 0}px + 17px))`,
      }}>{text}</Text>
      <ProgressBar ref={measureRef} {...props} left={size.x} />
    </>
  );
}

const MultiProgress = ({
  labeled,
  error,
  values,
  max: maxVal,
  ...props
}: ProgressBarsProps & {labeled?: boolean, style?: React.CSSProperties}) => {
  const max = typeof maxVal === 'number'
            ? maxVal
            : !isNaN(maxVal) ? parseInt(maxVal) : 0;

  return <ProgressWrapper {...props}>
    {values.map((v: ProgressBarValue, i) => {
      const color = v.color || (i%2 === 0 ? 'rgba(1, 211, 116, 0.2)' : '#00d374');
      const val = typeof v.value === 'number' ? v.value : !isNaN(v.value) ? parseInt(v.value) : 0;
      return (
        labeled ? <LabeledBar
          value={val < max ? val : max}
          max={max}
          error={error}
          color={color}
          text={v.text ? v.text(val) : val}
          key={`multiprogress-bar-${val}-${i}`}
          textColor={v.textColor}
        /> : <ProgressBar
          value={val < max ? val : max}
          max={max}
          error={error}
          color={color}
          key={`multiprogress-bar-${val}-${i}`}
        />
      );
    })}
    {error ? <Text color="error" bold>{error}</Text> : null}
  </ProgressWrapper>
}

const LabeledMultiProgress = ({
  title,
  ...props
}: ProgressBarsProps & { style?: React.CSSProperties }) => {
  return <div>
    {title ? <Label style={{fontWeight: 'bold', fontSize: 18, }}>{title}</Label> : null}
    <span style={{
      float: 'right',
      paddingRight: 8,
      paddingTop: 40,
    }}>Target $<Number commas decimalPoints={0} num={props.max}/></span>
    <MultiProgress
      {...props}
      labeled
      style={{ marginTop: 40, ...(props.style || {}) }}
    />
  </div>
}

export { MultiProgress, LabeledMultiProgress };
