import React, { useEffect, useRef, useState } from "react";
import { Input, InputProps, LabeledInput } from "./Input";
import { onChangeNumber } from "../utils";
import RenderChild from "./RenderChild";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
export type LocaleOptions = {
    maximumFractionDigits   ?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    numberingSystem         ?: string,
    currencySign            ?: string,
    currency                ?: string,
    unit                    ?: string,
    style                   ?: 'decimal' | 'currency' | 'percent' | 'unit',
    unitDisplay             ?: 'long' | 'short' | 'narrow',
    currencyDisplay         ?: 'symbol' | 'narrowSymbol' | 'code' | 'name',
    notation                ?: 'standard' | 'scientific' | 'engineering' | 'compact',
    signDisplay             ?: 'auto' | 'never' | 'always' | 'exceptZero',
    localeMatcher           ?: string,
    useGrouping             ?: boolean,
    minimumIntegerDigits    ?: number,
    minimumFractionDigits   ?: number,
};

export type NumberInputProps = Omit<InputProps, 'onChange'> & {
    defaultValue?: string | number;
    label?: string;
    icon?: (props: object) => React.ReactElement;
    onClickIcon?: (value: string | number) => string | undefined | void;
    iconStyles?: {};
    labelStyle?: React.CSSProperties;
    onChange?: (value: number | string | null, action?: string) => void;
    localeOptions?: LocaleOptions,
    inputMode?: "none" | "text" | "numeric" | "decimal";
};

type useNumberInputProps = {
    defaultValue?: string | number;
    onChange?: ((value: string | number | null, action?: string | undefined) => void);
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    inputMode?: "none" | "text" | "numeric" | "decimal";
    localeOptions?: LocaleOptions,
}

export function useNumberInput(props: useNumberInputProps) {
    const {
        defaultValue = "",
        onChange,
        onFocus,
        onBlur,
        inputMode,
        localeOptions={},
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState({
        last_value: +defaultValue || '',
        value: +defaultValue || '',
        type: 'number',
    });

    useEffect(() => {
        numToStr(+defaultValue);
    }, []);

    function strToNum() {
        setState(s => ({
            ...s,
            type: 'number',
            value: +s.last_value,
        }));
    }

    function numToStr(num = state.value) {
        setState(s => ({
            ...s,
            type: '',
            last_value: num || '',
            value: num === '' ? '' : (+num).toLocaleString(undefined, localeOptions),
        }));
    }

    const updateValue = (val: number | string | null) => {
        if (val === null) { return; }
        const new_val = onChangeNumber(val);
        if(new_val !== null) {
            setState(s => ({...s, value: new_val, last_value: new_val }));
            onChange && onChange(new_val);
        }
    };

    const handleChange = () => {
        const inputElem = inputRef.current;
        if (inputElem === null) { return; }
        updateValue(inputElem?.value);
    };

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        numToStr();
        onBlur && onBlur(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        strToNum();
        onFocus && onFocus(e);
    }

    function clearInput() {
        setState(s => ({...s, value: '0', last_value: 0,}));
        onChange && onChange(0);
    }

    return {
        ref: inputRef,
        value: state.value,
        inputMode: inputMode || 'decimal',
        type: state.type,
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        updateValue,
        clearInput,
        strToNum,
    };
}

function NumberInput(props: NumberInputProps) {
    const {
        defaultValue = "",
        label=null,
        localeOptions={},
        icon=null,
        onClickIcon=null,
        iconStyles={},
        ...rest
    } = props;
    const {
        ref,
        value,
        inputMode,
        type,
        onChange,
        onBlur,
        onFocus,
        clearInput,
    } = useNumberInput({
        defaultValue,
        onChange: props.onChange,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        inputMode: props.inputMode,
        localeOptions,
    });

    const inputProps = {
        ...rest,
        // type: type,
        value,
        inputMode: inputMode || 'decimal',
        onChange,
        onBlur,
        onFocus,
    };

    const iconWrapperStyles: React.CSSProperties = {
        fontStyle: 'normal',
        cursor: 'pointer',
        position: 'absolute',
        marginLeft: '-35px',
        marginTop: '5px',
        ...(iconStyles)
    };

    const handleClickIcon = () => {
        if (onClickIcon) {
            const action = onClickIcon(value);
            if (action && action === 'clear') {
                clearInput();
            }
        }
    };

    return (
        <>
            {label
                ? <LabeledInput {...inputProps} label={label} ref={ref} />
                : <Input {...inputProps} ref={ref} />}
            {icon && type !== 'number'
                ? <span style={iconWrapperStyles} onClick={handleClickIcon}>
                        <RenderChild>{icon}</RenderChild>
                    </span>
                : null}
        </>
    );
}

export default NumberInput;
