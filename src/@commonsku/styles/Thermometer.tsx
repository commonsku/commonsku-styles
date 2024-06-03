import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Text, Number } from './Text';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { colors } from './Theme';

const ProgressWrapper = styled.div<SharedStyleTypes>`
    max-width: 100%;
    width: 100%;
    height: 48px;
    box-shadow: 0px 4px 5px rgba(72, 78, 86, 0.1);
    border-radius: 50px;
    margin-top: 10px;

    ${SharedStyles}
`;

const ProgressBar = styled.div<{
    target: number;
    value: number;
    width: number;
    color?: string;
}>`
    max-width: 100%;
    width: ${props => props.width}px;
    height: 48px;
    background: ${props => props.color || colors.secondary3.main};
    border-radius: 50px;
    display: inline-block;
    position: absolute;
`;

interface ThermometerLabelProps {
    className?: string;
    value: number;
    label?: React.ReactNode | ((v: number) => React.ReactNode);
}

const ThermometerLabel = forwardRef<HTMLSpanElement, ThermometerLabelProps>((
    { className, value, label }: ThermometerLabelProps,
    ref?: React.Ref<HTMLSpanElement>
) => {
    return (
        <span ref={ref} className={className}>
            {typeof label === 'function'
                ? label(value)
                : <>
                    {label ?? ''} $<Number commas decimalPoints={0} num={value} />
                </>
            }
        </span>
    );
});

const ValueLabel = styled(ThermometerLabel) <{ labelTextColor?: string; }>`
    position: absolute;
    padding-right: 5px;
    color: ${props => props.labelTextColor ?? colors.secondary3.main};
`;

const TargetLabel = styled(ThermometerLabel) <{
    containerWidth: number,
    targetWidth: number,
}>`
    position: absolute;
    padding-right: 5px;
    padding-left: ${props => `${props.containerWidth - props.targetWidth}px`};
`;

export type ThermometerProps = {
    style?: React.CSSProperties;
    title?: string;
    target: number;
    value: number,
    valueLabel?: React.ReactNode | ((v: number) => React.ReactNode),
    targetLabel?: React.ReactNode | ((v: number) => React.ReactNode),
    barColor?: string;
    labelTextColor?: string;
    isSecondary?: boolean;
};

export default function Thermometer({
    title,
    target,
    targetLabel,
    value,
    valueLabel,
    barColor,
    labelTextColor,
    isSecondary,
    ...props
}: ThermometerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const targetRef = useRef<HTMLSpanElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [targetWidth, setTargetWidth] = useState(0);

    useLayoutEffect(() => {
        setContainerWidth(containerRef.current?.offsetWidth ?? 0);
        setTargetWidth(targetRef.current?.offsetWidth ?? 0);

        const onResize = () => {
            if (containerRef.current === null || targetRef.current === null) {
                return;
            }

            setContainerWidth(containerRef.current.offsetWidth);

            const targetPadding = getComputedStyle(targetRef.current).paddingLeft;
            const targetWidth = targetRef.current.offsetWidth - parseInt(targetPadding, 10);

            setTargetWidth(targetWidth);
        };
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    const getProgressWidth = () => {
        if (target === 0) {
            return 1;
        }

        const progress = Math.min(1, value / target);
        return Math.floor(progress * containerWidth);
    };

    return (
        <div {...props}>
            {title ? <Text
                style={{ fontWeight: 'bold', fontSize: 18, color: colors.neutrals.bodyText }}
            >{title}</Text> : null}
            <div style={{ paddingBottom: 20, paddingTop: 5 }}>
                <TargetLabel
                    ref={targetRef}
                    value={target}
                    label={targetLabel}
                    containerWidth={containerWidth}
                    targetWidth={targetWidth}
                />
                <ValueLabel
                    value={value}
                    label={valueLabel}
                    labelTextColor={labelTextColor}
                />
            </div>
            <div ref={containerRef}>
                <ProgressWrapper style={{ background: isSecondary ? colors.secondary2[20] : colors.secondary3[20] }}>
                    <ProgressBar
                        target={target}
                        value={value}
                        color={barColor || colors.secondary3.main}
                        width={getProgressWidth()}
                    />
                </ProgressWrapper>
            </div>
        </div>
    );
}
