import { map } from 'lodash';
import React, { useState, useRef, CSSProperties, useEffect } from 'react'
import styled, { CSSObject, StyledComponentProps } from 'styled-components'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

import {Label} from './Label'
import { themeOptions } from '.';

type BaseInputProp = {
  noMargin?: boolean,
  error?:boolean,
  isPercent?:boolean,
};

export type InputProps = StyledComponentProps<'input', any, {}, never> & BaseInputProp & { hasIcon?: boolean; };
export type InputIconLabelProps = StyledComponentProps<'div', any, {}, never> & BaseInputProp;

export const InputIconLabel = styled.div<InputIconLabelProps>`
  box-sizing: border-box;
  width: 40px;
  height: ${p => p.error ? 38 : 36}px;
  background-color: ${p => p.error ? getThemeColor(p, 'errors.main') : "#ABC7D1"};
  border-radius: 3px 0 0 3px;
  margin-bottom: 1rem;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 1.5rem;
  padding: 5px;
`

export const InputIconLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${p => {
    return {
      fontSize: '1rem',
      fontFamily: "'skufont-regular', sans-serif",
      boxSizing: 'border-box',
      backgroundColor: getThemeColor(p, 'input.background'),
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      width: '100%',
      border: `1px solid ${getThemeColor(p, 'input.border')}`,
      borderRadius: 5,
      padding: 0,
      color: getThemeColor(p, 'input.text'),
      ':hover': {
        borderColor: getThemeColor(p, 'input.hover.border'),
      },
    };
  }}
`

export const Input = styled.input<InputProps & SharedStyleTypes>`
  &&& {
    ${p => {
      const styles = {
        marginBottom: p.noMargin ? 0 : "1rem",
        fontSize: '1rem',
        fontFamily: "'skufont-regular', sans-serif",
        boxSizing: 'border-box',
        backgroundColor: getThemeColor(p, 'input.background'),
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        width: '100%',
        border: `1px solid ${getThemeColor(p, 'input.border')}`,
        borderRadius: p.isPercent ?  "0 5px 5px 0" : '5px',
        padding: '8px 8px 8px 8px',
        color: getThemeColor(p, 'input.text'),
        "::placeholder": {
          color: getThemeColor(p, 'input.placeholder'),
        },
        ':hover': p.disabled ? {} : {
          borderColor: getThemeColor(p, 'input.hover.border'),
          "::placeholder": {
            color: getThemeColor(p, 'input.hover.placeholder'),
          },
        },
        ':focus': {
          borderColor: getThemeColor(p, 'input.active.border'),
          color: getThemeColor(p, 'input.active.text'),
          outline: 'none',
          boxShadow: `1px  1px 0px ${getThemeColor(p, 'input.active.border')},
                     -1px -1px 0px ${getThemeColor(p, 'input.active.border')},
                      1px -1px 0px ${getThemeColor(p, 'input.active.border')},
                     -1px  1px 0px ${getThemeColor(p, 'input.active.border')};`,
        },
        ':disabled': {
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          color: getThemeColor(p, 'input.disabled.text'),
          backgroundColor: getThemeColor(p, 'input.disabled.background'),
        },
      } as CSSObject;

      if (p.error) {
        styles['borderColor'] = getThemeColor(p, 'input.error.border');
        styles[':hover'] = {
          ...styles[':hover'],
          borderColor: getThemeColor(p, 'input.error.border'),
        };
        styles[':focus'] = {
          ...styles[':focus'],
          borderColor: getThemeColor(p, 'input.error.border'),
          boxShadow: `1px  1px 0px ${getThemeColor(p, 'input.error.border')},
                     -1px -1px 0px ${getThemeColor(p, 'input.error.border')},
                      1px -1px 0px ${getThemeColor(p, 'input.error.border')},
                     -1px  1px 0px ${getThemeColor(p, 'input.error.border')}`,
        }
      }

      if (p.hasIcon) {
        styles['border'] = 'none';
        styles['borderColor'] = 'none';
        styles['boxShadow'] = 'none';
        styles['outline'] = 'none';
        styles[':focus'] = undefined;
        styles[':hover'] = undefined;
      }

      return styles;
    }}
  }
  ${SharedStyles}
`;


type LabeledInputPropType = InputProps & {
  label: string,
  name?: string,
  isPercent?: boolean,
  labelOnTop?: boolean,
} & SharedStyleTypes;
export const LabeledInput = React.forwardRef(
  ({label, name, required, labelOnTop=false, ...props}: LabeledInputPropType, ref: React.Ref<HTMLInputElement>) => (
    <div>
      <Label
        htmlFor={name}
        style={{
          ...(!labelOnTop ? {} : {display: 'block'}),
          fontFamily: "'skufont-medium', sans-serif",
          lineHeight: '24px',
          fontSize: '16px',
          color: getThemeColor(props, 'neutrals.100'),
        }}
      >{label} {required && '*'}</Label>
      {props.isPercent ? <InputIconLabelContainer>
                           <InputIconLabel {...props}>%</InputIconLabel>
                           <Input ref={ref} name={name} required={required} {...props}/>
                         </InputIconLabelContainer>
                       : <Input ref={ref} name={name} required={required} {...props}></Input>}
    </div>
  )
)

type LabeledIconInputProps = InputProps & {
  label: string,
  name?: string,
  isPercent?: boolean,
  labelOnTop?: boolean,
  Icon: React.ReactElement,
} & SharedStyleTypes;
export const LabeledIconInput = React.forwardRef(
  (
    {
      label,
      name,
      required,
      labelOnTop=false,
      Icon,
      noMargin,
      error,
      isPercent,
      disabled,
      onFocus,
      onChange,
      onBlur,
      ...props
    }: LabeledIconInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    const activeBorderColor = getThemeColor(props, 'input.active.border', themeOptions.colors.input.active.border);
    const activeTextColor = themeOptions.colors.input.active.text;
    const errorBorderColor = getThemeColor(props, 'input.error.border', themeOptions.colors.input.error.border);
    const disabledBackground = themeOptions.colors.input.disabled.background;
    const disabledTextColor = themeOptions.colors.input.disabled.text;
    const activeStyles = !isActive ? {} : {
      borderColor: error ? errorBorderColor : activeBorderColor,
      color: getThemeColor(props, 'input.active.text', activeTextColor),
      outline: 'none',
      boxShadow: `1px  1px 0px ${error ? errorBorderColor : activeBorderColor},
                  -1px -1px 0px ${error ? errorBorderColor : activeBorderColor},
                  1px -1px 0px ${error ? errorBorderColor : activeBorderColor},
                  -1px  1px 0px ${error ? errorBorderColor : activeBorderColor}`,
    };
    const errorStyles = !error ? {} : {
      borderColor: errorBorderColor,
    };
    const disabledStyles = !disabled ? {} : {
      border: 'none',
      borderColor: 'none',
      boxShadow: 'none',
      outline: 'none',
      color: getThemeColor(props, 'input.disabled.text', disabledTextColor),
      backgroundColor: getThemeColor(props, 'input.disabled.background', disabledBackground),
    };

    const NewIcon = React.useMemo(() => {
      const iconProps = {
        fill: '#fff',
        color: '#fff',
      };
      if (error) {
        iconProps['fill'] = errorBorderColor;
        iconProps['color'] = errorBorderColor;
      } else if (disabled) {
        iconProps['fill'] = disabledTextColor;
        iconProps['color'] = disabledTextColor;
      }
      return React.cloneElement(Icon, iconProps);
    }, [Icon, error, disabled, disabledTextColor, errorBorderColor]);

    const onClickOutside = (e: Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    useEffect(() => {
      document.addEventListener('click', onClickOutside);

      return () => {
        document.removeEventListener('click', onClickOutside);
      };
    }, []);

    return (
      <div>
        <Label
          htmlFor={name}
          style={{
            ...(!labelOnTop ? {} : {display: 'block'}),
            fontFamily: "'skufont-medium', sans-serif",
            lineHeight: '24px',
            fontSize: '16px',
            color: getThemeColor(props, 'neutrals.100'),
          }}
        >{label} {required && '*'}</Label>
        <InputIconLabelContainer
          {...props}
          ref={containerRef}
          onClick={() => {
            if (isActive) { return; }
            setIsActive(!isActive);
          }}
          style={{
            ...activeStyles,
            ...errorStyles,
            ...disabledStyles,
            ...(props.style || {}),
          }}
        >
          <InputIconLabel
            style={{ marginBottom: 0, }}
          >{NewIcon}</InputIconLabel>
          <Input
            hasIcon
            ref={ref}
            name={name}
            required={required}
            style={{ marginBottom: 0, }}
            noMargin={noMargin}
            error={error}
            disabled={disabled}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
          />
        </InputIconLabelContainer>
      </div>
    );
  }
)

export const RadioLabel = styled.label<{disabled?: boolean}>`
  &&& {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    margin-right: 25px;
    cursor: pointer;
    font-size: 16px;
    color: #52585c;
    font-family: 'skufont-medium', sans-serif;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: normal;
    line-height: 1.5;
    box-sizing: border-box;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    &:focus {
      outline: 0;
    }
  }
`;

type RadioProps = StyledComponentProps<'input', any, {isHovering?: boolean}, never>;
export const Radio = styled.input<RadioProps>`
  &&& {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
    &:checked {
      background-color: white;
      display: block;
    }
    &:hover {
      background-color: #02c0da;
    }
    ${props => props.isHovering && `background-color: #02c0da;`}
    ${SharedStyles}
  }
`;

export const CheckMark = styled.span<{checked?: boolean, isHovering?: boolean, disabled?: boolean}&SharedStyleTypes>`
  position: absolute;
  top: 0;
  left: 0;
  height: 23px;
  width: 23px;
  background-color: ${(props) => ((props.isHovering || props.checked) && !props.disabled) ? '#02c0da' : 'white'};
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  filter: ${(props) => props.disabled ? "grayscale(100%)" : "none"};
  border: 2px solid #02c0da;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${(props) => props.disabled ? "white" : "#02c0da"};
  }
  &::after {
    content: "";
    position: absolute;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-sizing: border-box;
    display: ${(props) => props.checked ? 'block' : 'none'};
  }
  ${SharedStyles}
`

export const Dot = styled.span<{checked?: boolean, isHovering?: boolean, disabled?: boolean}&SharedStyleTypes>`
  &&& {
    position: absolute;
    top: 0;
    left: 0;
    height: 23px;
    width: 23px;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    filter: ${(props) => props.disabled ? "grayscale(100%)" : "none"};
    background-color: ${(props) => (props.isHovering && !props.checked && !props.disabled) ? '#02c0da' : 'white'};
    border: 2px solid #02c0da;
    border-radius: 50%;
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
    &:hover {
      background-color: ${(props) => !props.checked && !props.disabled ? '#02c0da' : 'white'};
    }
    &::after {
      top: 5px;
      left: 5px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #02c0da;
      content: "";
      position: absolute;
      display: none;
      ${(props) => props.checked && `display: block;`}
    }
    ${SharedStyles}
`;

Dot.defaultProps = {
  checked: false,
}

CheckMark.defaultProps = {
  checked: false,
}

export const LabeledRadio: React.FC<RadioProps & {label: string}> = ({ 
  label, name, checked, disabled, onChange, ...props 
}) => {
  const [ isHovering, updateHover ] = useState(false);
  const radio = useRef<HTMLInputElement>(null);

  return (
    <RadioLabel
      htmlFor={name}
      onMouseOver={(e) => updateHover(true)}
      onMouseLeave={(e) => updateHover(false)}
      disabled={disabled}
      onClick={() => {
        radio.current?.click();
      }}
    >
      {label}
      <Radio ref={radio} name={name} type="radio" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
      <Dot checked={checked} isHovering={isHovering} disabled={disabled}/>
    </RadioLabel>
  );
}

export const LabeledRadioGroup: React.FC<RadioProps & {name: string, radios: [{label: string, value: any}]}> = ({ 
  name, value, radios, onChange, ...props 
}) => {
  return <>
    {map(radios, (radioProps, i) => {
      return <LabeledRadio key={i} name={name} checked={value === radioProps.value} onChange={onChange} 
        {...radioProps}
      />
    })}
  </>
}

export type LabeledCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  label: string|React.ReactNode;
  name?: string;
  checkboxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  checkboxPosition?: string;
  hoverByLabel?: boolean;
  stopPropagation?: boolean;
  [key: string]: any;
};
export const LabeledCheckbox = React.forwardRef<HTMLInputElement, LabeledCheckboxProps>((
  {label, name, checked, disabled, onChange, checkboxPosition='top-left', checkboxStyle={}, labelStyle={}, hoverByLabel=true, stopPropagation=false, ...props}: LabeledCheckboxProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const [isHovering, updateHover] = useState(false);

  const onMouseOver = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => updateHover(true);
  const onMouseLeave = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => updateHover(false);

  return (
    <RadioLabel
      htmlFor={name}
      onMouseOver={hoverByLabel ? onMouseOver : undefined}
      onMouseLeave={hoverByLabel ? onMouseLeave : undefined}
      disabled={disabled}
      style={labelStyle}
    >
      {label}
      <Radio ref={ref} name={name} type="checkbox" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
      <CheckMark
        onMouseOver={!hoverByLabel ? onMouseOver : undefined}
        onMouseLeave={!hoverByLabel ? onMouseLeave : undefined}
        checked={checked}
        isHovering={isHovering}
        disabled={disabled}
        style={{
          ...(checkboxPosition === 'top-right' ? {right: 0, left: 'auto',} : {}),
          ...checkboxStyle,
        }}
        onClick={(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
          stopPropagation && e && e.stopPropagation();
        }}
      />
    </RadioLabel>
  );
});
