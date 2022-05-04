import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Text, Number } from './Text';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { colors } from './Theme';


const ProgressWrapper = styled.div<SharedStyleTypes>`
    max-width: 100%;
    width: 100%;
    height: 48px;
    background: linear-gradient(180deg, rgba(1, 211, 116, 0.051) 0%, rgba(1, 211, 116, 0.1) 100%);
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

export type ThermometerProps = {
    style?: React.CSSProperties;
    title?: string;
    target: number;
    value1: number,
    value1Label?: string | ((v: number) => string),
};
export default function Thermometer({
    title,
    target,
    value1,
    value1Label,
    ...props
}: ThermometerProps) {
    const targetRef = useRef<HTMLSpanElement | null>(null);
    const val1Ref = useRef<HTMLSpanElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [targetWidth, setTargetWidth] = useState(0);
    const [value1Width, setValue1Width] = useState(0);

    const calcTargetWidth = () => {
        const result = 1 * containerWidth;
        return result > containerWidth ? containerWidth : result;
    };
    const calcVal1Width = () => {
        const result = (target <= value1 ? 1 : value1/target) * containerWidth;
        return result > containerWidth ? containerWidth : result;
    };

    const measureContainerRef = useCallback((node: HTMLDivElement) => {
        containerRef.current = node;
        setContainerWidth(node?.clientWidth || 0);
    }, []);
    const measureTargetRef = useCallback((node: HTMLSpanElement) => {
        targetRef.current = node;
        setTargetWidth(node?.clientWidth || 0);
    }, []);
    const measureValue1Ref = useCallback((node: HTMLSpanElement) => {
        val1Ref.current = node;
        setValue1Width(node?.clientWidth || 0);
    }, []);

    return (
        <div {...props}>
            {title ? <Text
                style={{fontWeight: 'bold', fontSize: 18, color: colors.neutrals.bodyText}}
            >{title}</Text> : null}
            <div style={{ paddingBottom: 20, paddingTop: 5}}>
                <span ref={measureTargetRef} style={{
                    position: 'absolute',
                    paddingRight: 5,
                    paddingLeft: `${calcTargetWidth() - (targetWidth || 100)}px`,
                }}>
                    Target $<Number commas decimalPoints={0} num={target}/>
                </span>
                <span ref={measureValue1Ref} style={{
                    position: 'absolute',
                    paddingRight: 5,
                    paddingLeft: `${calcVal1Width() - (Math.abs(targetWidth + value1Width) || 150)}px`,
                    color: colors.secondary2.main,
                }}>
                    $<Number commas decimalPoints={0} num={value1}/>
                </span>
            </div>
            <div ref={measureContainerRef}>
                <ProgressWrapper style={{ marginTop: 10, }}>
                    <ProgressBar
                        target={target}
                        value={value1}
                        color={colors.secondary2.main}
                        offset={calcVal1Width()}
                        elementWidth={value1Width}
                    />
                </ProgressWrapper>
            </div>
        </div>
    );
}
