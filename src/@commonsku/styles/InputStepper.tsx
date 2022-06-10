import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from './Button';
import { fontStyles } from './Theme';
import { neutrals } from "./colors";
import { AddIcon, SubtractIcon } from "./icons";
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';

type InputStepperProps = {
    value: number;
    min?: number;
    max?: number;
    width?: string;
    label?: string;
    labelStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (value: number, action?: string) => void;
    onIncrement?: (value: number) => void;
    onDecrement?: (value: number) => void;
} & SharedStyleTypes & SizerTypes;

const InputStepperOuterContainer = styled.div<{ width?: string } & SharedStyleTypes & SizerTypes>`
    &&&{
        width: ${props => props.width ? props.width : `160px`};
        ${SharedStyles}
        ${SizerCss}
    }
`;

const InputStepperInnerContainer = styled.div<SharedStyleTypes & SizerTypes>`
    &&&{
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid ${neutrals['60']};
        border-radius: 5px;
        background-color: white;
        ${SharedStyles}
        ${SizerCss}
    }
`;

const InputStepperLabel = styled.label<SharedStyleTypes & SizerTypes>`
    &&&{
        font-size: ${fontStyles.label.fontSize};
        font-family: ${fontStyles.label.fontFamily};
        line-height: ${fontStyles.label.lineHeight};
        margin-bottom: 8px;
        color: ${neutrals.bodyText}
        ${SharedStyles}
        ${SizerCss}
    }
`;

const CurrentNumber = styled.div<SharedStyleTypes & SizerTypes>`
    &&&{
        display:flex;
        justify-content: center;
        align-items: center;
        height:38px;
        color: ${neutrals.bodyText};
        text-align:center;
        vertical-align:middle;
    }
`;

export const canIncrement = (value: number, max?: number) =>
    (max !== undefined && value < max) || max === undefined;
export const canDecrement = (value: number, min?: number) =>
    (min !== undefined && value > min) || min === undefined;

export default function InputStepper({
    value = 0,
    min = 0,
    max,
    width,
    label,
    labelStyle = {},
    style = {},
    onChange,
    onIncrement,
    onDecrement,
    disabled=false,
    ...props
}: InputStepperProps) {
    const decrementButtonVariant = canDecrement(value, min) || disabled
        ? "disabled" : "primary";
    const incrementButtonVariant = canIncrement(value, max) || disabled
        ? "disabled" : "primary";

    const handleIncrement = () => {
        const newValue = value + 1;
        if (disabled || !canIncrement(value, max)) { return; }
        onChange && onChange(value, 'INCREMENT');
        onIncrement && onIncrement(newValue);
    };
    const handleDecrement = () => {
        const newValue = value + 1;
        if (disabled || !canDecrement(value, max)) { return; }
        onChange && onChange(value, 'DECREMENT');
        onDecrement && onDecrement(newValue);
    };

    return (
        <InputStepperOuterContainer width={width} {...props}>
            <InputStepperLabel style={labelStyle}>{label}</InputStepperLabel>
            <InputStepperInnerContainer style={{ ...style }}>
                <IconButton
                    Icon={SubtractIcon}
                    variant={decrementButtonVariant}
                    onClick={handleDecrement}
                    style={{ borderRadius: "5px 0 0 5px" }}
                />
                <CurrentNumber>{value}</CurrentNumber>
                <IconButton
                    Icon={AddIcon}
                    variant={incrementButtonVariant}
                    onClick={handleIncrement}
                    style={{ borderRadius: "0 5px 5px 0" }}
                />
            </InputStepperInnerContainer>
        </InputStepperOuterContainer>
    )
}