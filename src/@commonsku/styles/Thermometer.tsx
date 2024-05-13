import React, { forwardRef, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Text, Number } from './Text';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { colors } from './Theme';
import { useWindowSize } from './hooks';

const ProgressWrapper = styled.div<SharedStyleTypes>`
    max-width: 100%;
    width: 100%;
    height: 48px;
    box-shadow: 0px 4px 5px rgba(72, 78, 86, 0.1);
    border-radius: 50px;

    ${SharedStyles}
`

const ProgressBar = styled.div<{
    target: number;
    value: number;
    color?: string;
    offset?: number;
    elementWidth?: number;
}>`
    max-width: 100%;
    width: ${p => {
        if (p.offset) {
            return `${p.offset}px`;
        }
        const val = (p.value / p.target);
        const offset = p.elementWidth || 100;
        return `calc(${(val > 1 ? 1 : val) * 100}% - ${offset}px)`;
    }};
    height: 48px;
    background: ${p => p.color || "#00d374"};
    border-radius: 50px;
    display: inline-block;
    position: absolute;
`

interface ThermometerLabelProps {
    className?: string;
    value: number;
    label?: React.ReactNode | ((v: number) => React.ReactNode);
}

const ThermometerLabel = forwardRef((
    { className, value, label }: ThermometerLabelProps, 
    ref?: React.Ref<HTMLSpanElement>
) => {
    return (
        <span ref={ref} className={className}>
            {typeof label === 'function'
                ? label(value)
                : <>
                    {(label !== undefined ? label + ' ' : '') + '$'}<Number commas decimalPoints={0} num={value}/>
                </>
            }
        </span>
    );
});

const Value1Label = styled(ThermometerLabel)<{ labelTextColor?: string }>`
    position: absolute;
    padding-right: 5px;
    color: ${props => props.labelTextColor ?? colors.secondary3.main};
`;

const TargetLabel = styled(ThermometerLabel)<{
    calcedTargetWidth: number, 
    targetWidth?: number,
}>`
    position: absolute;
    padding-right: 5px;
    padding-left: ${props => `${props.calcedTargetWidth - (props.targetWidth ?? 100)}px`};
`;

export type ThermometerProps = {
    style?: React.CSSProperties;
    title?: string;
    target: number;
    value1: number,
    value1Label?: React.ReactNode | ((v: number) => React.ReactNode),
    targetLabel?: React.ReactNode | ((v: number) => React.ReactNode),
	barColor?: string;
	labelTextColor?: string;
	isSecondary?: boolean;
};

export default function Thermometer({
    title,
    target,
    targetLabel,
    value1,
    value1Label,
	barColor,
	labelTextColor,
	isSecondary,
    ...props
}: ThermometerProps) {
    const targetRef = useRef<HTMLSpanElement | null>(null);
    const val1Ref = useRef<HTMLSpanElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [targetWidth, setTargetWidth] = useState(0);
    const [value1Width, setValue1Width] = useState(0);
    const [windowWidth] = useWindowSize();

    const calcTargetWidth = useCallback(() => {
        const result = 1 * containerWidth;
        return result > containerWidth ? containerWidth : result;
    }, [containerWidth]);
    const calcVal1Width = useCallback(() => {
        const result = (target <= value1 ? 1 : value1/target) * containerWidth;
        return result > containerWidth ? containerWidth : result;
    }, [containerWidth, target, value1]);

    const measureContainerRef = useCallback((node: HTMLDivElement) => {
        containerRef.current = node;
        setContainerWidth(node?.clientWidth || 0);
    }, [windowWidth]);
    const measureTargetRef = useCallback((node: HTMLDivElement) => {
        targetRef.current = node;
        setTargetWidth(node?.clientWidth || 0);
    }, []);
    const measureValue1Ref = useCallback((node: HTMLDivElement) => {
        val1Ref.current = node;
        setValue1Width(node?.clientWidth || 0);
    }, []);

    return (
        <div {...props}>
            {title ? <Text
                style={{fontWeight: 'bold', fontSize: 18, color: colors.neutrals.bodyText}}
            >{title}</Text> : null}
            <div style={{ paddingBottom: 20, paddingTop: 5}}>
                <TargetLabel
                    ref={measureTargetRef}
                    value={target}
                    label={targetLabel}
                    calcedTargetWidth={calcTargetWidth()}
                    targetWidth={targetWidth}
                />
                <Value1Label
                    ref={measureValue1Ref}
                    value={value1}
                    label={value1Label}
                    labelTextColor={labelTextColor}
                />
            </div>
            <div ref={measureContainerRef}>
                <ProgressWrapper style={{ marginTop: 10, background : isSecondary ? '#FFF9C5' : '#C9FDE5' }}>
                    <ProgressBar
                        target={target}
                        value={value1}
                        color={barColor || colors.secondary3.main}
                        offset={calcVal1Width()}
                        elementWidth={value1Width}
                    />
                </ProgressWrapper>
            </div>
        </div>
    );
}
