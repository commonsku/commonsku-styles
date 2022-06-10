import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from './Button';
import { fontStyles } from './Theme';
import { neutrals } from "./colors";
import { AddIcon, SubtractIcon } from "./icons";
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';



type InputStepperProps = {
    initialNumber: number;
    min?: number;
    max?: number;
    width?: string;
    label?: string;
    labelStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    onChange?: (value: number) => void;
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

export default function InputStepper({
    initialNumber = 0,
    min = 0,
    max,
    width,
    label,
    labelStyle = {},
    style = {},
    onChange,
    ...props
}: InputStepperProps) {

    const [currentNumber, setCurrentNumber] = useState(initialNumber);

    const incrementNumber = () => {
        if ((max !== undefined && currentNumber < max) || max === undefined) {
            const value = currentNumber + 1;
            setCurrentNumber(value);
            onChange && onChange(value);
        }
    };

    const decrementNumber = () => {
        if ((min !== undefined && currentNumber > min) || min === undefined) {
            const value = currentNumber - 1;
            setCurrentNumber(value);
            onChange && onChange(value);
        }
    };

    const decrementButtonVariant = min !== undefined && currentNumber <= min ? "disabled" : "primary";
    const incrementButtonVariant = max !== undefined && currentNumber >= max ? "disabled" : "primary";

    return (
        <InputStepperOuterContainer width={width} {...props}>
            <InputStepperLabel style={labelStyle}>{label}</InputStepperLabel>
            <InputStepperInnerContainer style={{ ...style }}>
                <IconButton
                    Icon={SubtractIcon}
                    variant={decrementButtonVariant}
                    onClick={decrementNumber}
                    style={{ borderRadius: "5px 0 0 5px" }}
                />
                <CurrentNumber>{currentNumber}</CurrentNumber>
                <IconButton
                    Icon={AddIcon}
                    variant={incrementButtonVariant}
                    onClick={incrementNumber}
                    style={{ borderRadius: "0 5px 5px 0" }}
                />
            </InputStepperInnerContainer>
        </InputStepperOuterContainer>


    )
}