import React from "react";
import styled, { CSSProperties } from "styled-components";
import { debounce } from "lodash";
import { IconButton, IconButtonProps } from './Button';
import { fontStyles } from './Theme';
import { neutrals } from "./colors";
import { AddIcon, SubtractIcon } from "./icons";
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import { NumberInputProps, useNumberInput } from './NumberInput';
import { Input } from "./Input";
import { useLongPress } from "./hooks";

type InputStepperProps = Omit<NumberInputProps, 'value'> & {
    min?: number;
    max?: number;
    initialValue?: number | string;
    width?: string;
    label?: string;
    labelStyle?: React.CSSProperties;
    inputDisabled?: boolean;
    delayChangeTimeout?: number;
    holdIncrement?: boolean;
    holdDecrement?: boolean;
};

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
        width:100%;
        border-top: 1px solid ${neutrals['60']};
        border-bottom: 1px solid ${neutrals['60']};
        color: ${neutrals.bodyText};
        text-align:center;
        vertical-align:middle;
    }
`;


type InputStepperStyledProps = Omit<NumberInputProps, 'onChange'> & {
    onCHange?: React.ChangeEventHandler<HTMLInputElement>;
    containerWidth?: string;
    style?: CSSProperties;
    label?: string;
    labelStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    inputDisabled?: boolean;
    decrementButtonProps?: IconButtonProps;
    incrementButtonProps?: IconButtonProps;
    onIncrement?: React.MouseEventHandler<HTMLButtonElement>;
    onDecrement?: React.MouseEventHandler<HTMLButtonElement>;
};
export function InputStepperStyled(props: InputStepperStyledProps) {
    const {
        containerWidth,
        inputDisabled,
        label,
        labelStyle,
        containerStyle,
        style,
        onIncrement,
        onDecrement,
        decrementButtonProps={},
        incrementButtonProps={},
        ...rest
    } = props;
    return (
        <InputStepperOuterContainer width={containerWidth} style={containerStyle}>
            {label && <InputStepperLabel style={labelStyle}>{label}</InputStepperLabel>}
            <InputStepperInnerContainer style={style}>
                <IconButton
                    Icon={SubtractIcon}
                    style={{ borderRadius: "5px 0 0 5px" }}
                    onClick={onDecrement}
                    {...decrementButtonProps}
                />
                <Input
                    {...rest}
                    style={{ width: '100%', margin: 0, borderRadius: 0, textAlign: "center" }}
                />
                <IconButton
                    Icon={AddIcon}
                    style={{ borderRadius: "0 5px 5px 0" }}
                    onClick={onIncrement}
                    {...incrementButtonProps}
                />
            </InputStepperInnerContainer>
        </InputStepperOuterContainer>
    )
}

export const canIncrement = (value: number, max?: number) =>
    (max !== undefined && value < max) || max === undefined;
export const canDecrement = (value: number, min?: number) =>
    (min !== undefined && value > min) || min === undefined;

export default function InputStepper(props: InputStepperProps) {
    const {
        min = 0,
        max,
        width,
        label,
        labelStyle = {},
        style = {},
        disabled=false,
        inputDisabled=false,
        localeOptions,
        initialValue,
        delayChangeTimeout = 1000,
        holdIncrement = true,
        holdDecrement = true,
        ...rest
    } = props;

    const {
        ref,
        value,
        inputMode,
        onChange,
        onBlur,
        onFocus,
        updateValue,
        strToNum,
    } = useNumberInput({
        defaultValue: initialValue,
        onChange: rest.onChange,
        onFocus: rest.onFocus,
        onBlur: rest.onBlur,
        inputMode: rest.inputMode,
        localeOptions,
    });
    const {
        onMouseDown: onIncrementMouseDown,
        onMouseLeave: onIncrementMouseLeave,
        onMouseUp: onIncrementMouseUp,
        onTouchEnd: onIncrementTouchEnd,
        onTouchStart: onIncrementTouchStart,
    } = useLongPress(() => {
        handleIncrement();
    });

    const {
        onMouseDown: onDecrementMouseDown,
        onMouseLeave: onDecrementMouseLeave,
        onMouseUp: onDecrementMouseUp,
        onTouchEnd: onDecrementTouchEnd,
        onTouchStart: onDecrementTouchStart,
    } = useLongPress(() => {
        handleDecrement();
    });

    const valueNumber = typeof value === 'string' ? parseFloat(value) : value;
    const decrementButtonVariant = disabled || !canDecrement(valueNumber, min)
        ? "disabled" : "primary";
    const incrementButtonVariant = disabled || !canIncrement(valueNumber, max)
        ? "disabled" : "primary";

    function handleIncrement() {
        const newValue = valueNumber + 1;
        if (disabled || !canIncrement(valueNumber, max)) { return; }
        updateValue(newValue)
    }

    function handleDecrement() {
        const newValue = valueNumber - 1;
        if (disabled || !canDecrement(valueNumber, min)) { return; }
        updateValue(newValue);
    }

    // check and update value by min and max
    const delayChange = debounce(React.useCallback(() => {
        const val = ref.current?.value;
        if (val === null || val === undefined) { return; }
        if (!canIncrement(parseInt(val), max) && max !== undefined) {
            updateValue(max);
        } else if (!canDecrement(parseInt(val), min) && min !== undefined) {
            updateValue(min);
        }
    }, [ref, min, max, updateValue]), delayChangeTimeout);

    return (
        <InputStepperOuterContainer width={width}>
            <InputStepperLabel style={labelStyle}>{label}</InputStepperLabel>
            <InputStepperInnerContainer style={style}>
                <IconButton
                    Icon={SubtractIcon}
                    variant={decrementButtonVariant}
                    onClick={handleDecrement}
                    style={{ borderRadius: "5px 0 0 5px" }}
                    onMouseDown={e => {
                        if (e.button !== 0 || !holdDecrement) { return; }
                        onDecrementMouseDown();
                    }}
                    onMouseOut={holdDecrement ? onDecrementMouseLeave : undefined}
                    onMouseUp={holdDecrement ? onDecrementMouseUp : undefined}
                    onTouchEnd={holdDecrement ? onDecrementTouchEnd : undefined}
                    onTouchStart={holdDecrement ? onDecrementTouchStart : undefined}
                />
                <Input
                    {...rest}
                    style={{ width: '100%', margin: 0, borderRadius: 0, textAlign: "center" }}
                    value={value}
                    inputMode={inputMode}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    disabled={inputDisabled}
                    ref={ref}
                    onKeyUp={delayChange}
                />
                <IconButton
                    Icon={AddIcon}
                    variant={incrementButtonVariant}
                    onClick={handleIncrement}
                    style={{ borderRadius: "0 5px 5px 0" }}
                    onMouseDown={e => {
                        if (e.button !== 0 || !holdIncrement) { return; }
                        onIncrementMouseDown();
                    }}
                    onMouseOut={holdIncrement ? onIncrementMouseLeave : undefined}
                    onMouseUp={holdIncrement ? onIncrementMouseUp : undefined}
                    onTouchEnd={holdIncrement ? onIncrementTouchEnd : undefined}
                    onTouchStart={holdIncrement ? onIncrementTouchStart : undefined}
                />
            </InputStepperInnerContainer>
        </InputStepperOuterContainer>
    )
}
