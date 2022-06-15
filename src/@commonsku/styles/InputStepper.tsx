import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from './Button';
import { fontStyles } from './Theme';
import { neutrals } from "./colors";
import { AddIcon, SubtractIcon } from "./icons";
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import { Input } from "./Input";
import { onChangeNumber } from "../utils";

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
    disabled=false,
    ...props
}: InputStepperProps) {
    const decrementButtonVariant = disabled || !canDecrement(value, min)
        ? "disabled" : "primary";
    const incrementButtonVariant = disabled || !canIncrement(value, max)
        ? "disabled" : "primary";

    const handleIncrement = () => {
        const newValue = value + 1;
        if (disabled || !canIncrement(value, max)) { return; }
        onChange && onChange(newValue, 'INCREMENT');
    };
    const handleDecrement = () => {
        const newValue = value - 1;
        if (disabled || !canDecrement(value, min)) { return; }
        onChange && onChange(newValue, 'DECREMENT');
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
                <Input
                    style={{ width: '100%', margin: 0, borderRadius: 0, }}
                    value={value}
                    onChange={e => {
                        let val = onChangeNumber(e.target.value);
                        if (!val || disabled) { return; }
                        val = typeof val === 'string' ? parseInt(val) : val;
                        if (!canIncrement(value, max) && !canDecrement(value, max)) { return; }
                        onChange && onChange(val, '');
                    }}
                    disabled={disabled}
                />
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