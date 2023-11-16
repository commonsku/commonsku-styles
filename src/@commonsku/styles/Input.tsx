import { map } from 'lodash';
import React, { useState, useRef, CSSProperties, useEffect } from 'react'
import styled, { CSSObject } from 'styled-components'
import { getThemeColor, colors, fontStyles } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import {Label} from './Label'
import { document } from '../utils';
import { RadioIcon, CheckboxIcon } from './icons';
import { neutrals, teal } from './colors';
import { RadioIconProps } from './icons/RadioIcon';
import { CheckboxIconProps } from './icons/CheckboxIcon';

type CommonInputProp = {
  noMargin?: boolean,
  error?:boolean,
};

type BaseInputProps = CommonInputProp
  & { hasIcon?: boolean; }
  & SharedStyleTypes;
export type InputProps = BaseInputProps
  & React.InputHTMLAttributes<HTMLInputElement>;

type BaseInputIconLabelProps = CommonInputProp & {
  isActive?: boolean;
  isDisabled?: boolean;
  isHover?: boolean;
  iconPosition?: 'left' | 'right';
};

export const InputIconLabel = styled.div<BaseInputIconLabelProps>`
&&& {
  box-sizing: border-box;
  width: 40px;
  height: ${p => p.error ? 38 : 36}px;
  background-color: ${p =>
    p.error
      ? getThemeColor(p, 'errors.main', colors.errors.main)
      : getThemeColor(p, 'input.iconWrapper.background', colors.input.iconWrapper.background)
  };
  border-radius: ${p => p.iconPosition === 'right' ? '0 3px 3px 0' : '3px 0 0 3px'};
  margin-bottom: 1rem;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 1.5rem;
  padding: 6px;

  :hover {
    background: ${p => getThemeColor(p, 'input.iconWrapper.hover.background')};
  }

  ${p => p.isHover
    ? `background: ${getThemeColor(p, 'input.iconWrapper.hover.background')};`
    : ''}

  ${p => p.isActive
      ? `background: ${getThemeColor(p, 'input.iconWrapper.active.background')};`
      : ''}

  ${p => p.isDisabled
    ? `background: ${getThemeColor(p, 'input.iconWrapper.disabled.background')};`
    : ''}
}
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

export const Input = styled.input<BaseInputProps>`
  &&& {
    ${p => {
      const styles: CSSObject = {
        marginBottom: p.noMargin ? 0 : "1rem",
        fontSize: '1rem',
        fontFamily: "'skufont-regular', sans-serif",
        boxSizing: 'border-box',
        backgroundColor: getThemeColor(p, 'input.background'),
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        width: '100%',
        border: `1px solid ${getThemeColor(p, 'input.border')}`,
        borderRadius: 5,
        padding: '8px 8px 8px 8px',
        color: getThemeColor(p, 'input.text'),
        "::placeholder": {
          color: getThemeColor(p, 'input.placeholder'),
        },
        ':hover': p.disabled ? undefined : {
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
      };

      if (p.error) {
        styles['borderColor'] = getThemeColor(p, 'input.error.border');
        styles[':hover'] = {
          ...(styles[':hover'] || {}),
          borderColor: getThemeColor(p, 'input.error.border'),
        };
        styles[':focus'] = {
          color: getThemeColor(p, 'input.active.text'),
          outline: 'none',
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


type BaseLabelInputProps = InputProps & {
  label: string,
  name?: string,
  labelOnTop?: boolean,
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>,
} & SharedStyleTypes;
type LabeledInputPropType = React.InputHTMLAttributes<HTMLInputElement> & BaseLabelInputProps;
export const LabeledInput =
  React.forwardRef<HTMLInputElement, LabeledInputPropType>(
    ({label, name, required, labelOnTop=false, wrapperProps={}, ...props}, ref) => (
      <div {...wrapperProps}>
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
        <Input ref={ref} name={name} required={required} {...props}></Input>
      </div>
    )
  );

type BaseLabeledIconInputProps = InputProps & {
  label?: string,
  name?: string,
  labelOnTop?: boolean,
  Icon: React.ReactElement,
  iconPosition?: 'left' | 'right',
  iconColor?: string;
  iconLabelStyles?: React.CSSProperties,
  containerStyle?: React.CSSProperties,
} & SharedStyleTypes;
type LabeledIconInputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseLabeledIconInputProps;
export const LabeledIconInput = React.forwardRef<HTMLInputElement, LabeledIconInputProps>(
  (
    {
      label,
      name,
      value,
      defaultValue,
      placeholder,
      readOnly,
      required,
      labelOnTop=false,
      Icon,
      noMargin,
      error,
      disabled,
      onFocus,
      onChange,
      onBlur,
      iconPosition = 'left',
      iconColor = '#fff',
      iconLabelStyles = {},
      containerStyle = {},
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const activeBorderColor = getThemeColor(props, 'input.active.border', colors.input.active.border);
    const activeTextColor = colors.input.active.text;
    const errorBorderColor = getThemeColor(props, 'input.error.border', colors.input.error.border);
    const disabledBackground = colors.input.disabled.background;
    const disabledTextColor = colors.input.disabled.text;
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
        fill: iconColor,
        color: iconColor,
      };
      if (error) {
        iconProps['fill'] = errorBorderColor;
        iconProps['color'] = errorBorderColor;
      } else if (disabled) {
        iconProps['fill'] = colors.input.icon.disabled.fill;
        iconProps['color'] = colors.input.icon.disabled.fill;
      } else if (isHovering) {
        iconProps['fill'] = colors.input.icon.hover.fill;
        iconProps['color'] = colors.input.icon.hover.fill;
      } else if (isActive) {
        iconProps['fill'] = colors.input.icon.active.fill;
        iconProps['color'] = colors.input.icon.active.fill;
      }
      return React.cloneElement(Icon, iconProps);
    }, [Icon, error, disabled, errorBorderColor, isActive, isHovering, iconColor]);

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
      <div style={containerStyle}>
        {label ? <Label
          htmlFor={name}
          style={{
            ...(!labelOnTop ? {} : {display: 'block'}),
            fontFamily: "'skufont-medium', sans-serif",
            lineHeight: '24px',
            fontSize: '16px',
            color: getThemeColor(props, 'neutrals.100'),
          }}
        >{label} {required && '*'}</Label> : null}
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
          onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {iconPosition !== 'right' ? <InputIconLabel
            style={{ marginBottom: 0, ...iconLabelStyles }}
            isActive={isActive}
            isDisabled={disabled}
            isHover={isHovering}
          >{NewIcon}</InputIconLabel> : null}
          <Input
            hasIcon
            ref={ref}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            style={{ marginBottom: 0, }}
            noMargin={noMargin}
            error={error}
            disabled={disabled}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
          />
          {iconPosition === 'right' ? <InputIconLabel
            style={{ marginBottom: 0, padding: 6, ...iconLabelStyles }}
            isActive={isActive}
            isDisabled={disabled}
            isHover={isHovering}
            iconPosition={iconPosition}
          >{NewIcon}</InputIconLabel> : null}
        </InputIconLabelContainer>
      </div>
    );
  }
);

export const CheckboxLabel = styled.label<{disabled?: boolean}>`
  &&& {
    display: inline-flex;
    position: relative;
    margin-bottom: 12px;
    margin-right: 24px;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    font-size: ${fontStyles.label.fontSize};
    color: ${neutrals.darkest};
    font-family: ${fontStyles.label.fontFamily};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: normal;
    line-height: ${fontStyles.label.lineHeight};
    box-sizing: border-box;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    &:focus {
      outline: 0;
    }
  }
`;

export const RadioLabel = styled(CheckboxLabel)`
  &&& {
    padding-left: 32px;
  }
`;

type BaseRadioProps = {isHovering?: boolean};
export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & BaseRadioProps;
export const Radio = styled.input<BaseRadioProps>`
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

export type LabeledRadioProps = RadioProps & {
  label: string;
  labelStyle?: React.CSSProperties;
  radioIconStyle?: React.CSSProperties;
  radioColor?: string;
  radioHoverColor?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  radioIconProps?: RadioIconProps;
};

export const LabeledRadio: React.FC<LabeledRadioProps> = ({ 
  label,
  name,
  checked,
  disabled,
  labelStyle,
  radioIconStyle,
  radioColor,
  radioHoverColor,
  onChange,
  labelProps={},
  radioIconProps={},
  ...props 
}) => {
  const [ isHovering, updateHover ] = useState(false);
  const radio = useRef<HTMLInputElement>(null);

  return (
    <RadioLabel
      {...labelProps}
      htmlFor={name}
      onMouseOver={(e) => updateHover(true)}
      onMouseLeave={(e) => updateHover(false)}
      disabled={disabled}
      style={{...labelStyle, ...(labelProps.style || {})}}
      onClick={() => {
        radio.current?.click();
      }}
    >
      <RadioIcon 
        {...radioIconProps}
        selected={checked} 
        hover={isHovering} 
        disabled={disabled} 
        color={radioColor}
        hoverColor={radioHoverColor}
        mr={8} 
        style={{
          ...(radioIconProps.style || {}),
          ...(radioIconStyle ? radioIconStyle : {position: 'absolute', left: 0}),
        }}/>
      {label}
      <Radio ref={radio} name={name} type="radio" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
    </RadioLabel>
  );
}

export const LabeledRadioInButton: React.FC<LabeledRadioProps & {flexGrow?: boolean} > = ({ 
  label,
  name,
  checked,
  disabled,
  readOnly,
  defaultValue,
  labelStyle,
  radioIconStyle,
  flexGrow,
  onChange,
  ...props  
}) => {
  return(
    <LabeledRadio 
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      readOnly={readOnly}
      defaultValue={defaultValue}
      labelStyle={{
        padding: "13px 40px",
        backgroundColor: disabled ? neutrals['40'] : checked ? colors.white : teal['20'],
        border: disabled ? `solid 3px ${neutrals['40']}` : checked ? `solid 3px ${teal.main}` : `solid 3px ${teal['20']}`,
        borderRadius: "200px",
        color: disabled ? neutrals['70'] : teal.main,
        flexGrow: flexGrow ? 1 : undefined, 
        justifyContent: 'center',
        ...labelStyle,
      }}
      radioIconStyle={{
      }}
      {...props}
    />
  )
}

export const LabeledRadioGroup: React.FC<LabeledRadioProps & {name: string, radios: [{label: string, value: any}]}> = ({ 
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

export const LabeledRadioInButtonGroup: React.FC<LabeledRadioProps & {name: string, radios: [{label: string, value: any}]}> = ({ 
  name, value, radios, onChange, ...props 
}) => {
  return <>
    {map(radios, (radioProps, i) => {
      return <LabeledRadioInButton key={i} name={name} checked={value === radioProps.value} onChange={onChange} 
        {...radioProps}
      />
    })}
  </>
}

export type LabeledCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label: string|React.ReactNode;
  name?: string;
  labelStyle?: CSSProperties;
  checkboxStyle?: React.CSSProperties;
  checkboxColor?: string;
  checkboxHoverColor?: string;
  hoverByLabel?: boolean;
  stopPropagation?: boolean;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  checkboxIconProps?: CheckboxIconProps;
  indeterminate?: boolean;
  [key: string]: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LabeledCheckbox: React.ForwardRefExoticComponent<LabeledCheckboxProps> =
  React.forwardRef<HTMLInputElement, LabeledCheckboxProps>((
    {
      label,
      name,
      checked,
      disabled,
      onChange,
      checkboxColor,
      checkboxHoverColor,
      hoverByLabel=true,
      stopPropagation=false,
      indeterminate=false,
      labelStyle={},
      checkboxStyle={},
      labelProps={},
      checkboxIconProps={},
      ...props
    },
    ref
  ) => {
    const [isHovering, updateHover] = useState(false);

    const onMouseOver = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => updateHover(true);
    const onMouseLeave = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => updateHover(false);

    return (
      <CheckboxLabel
        htmlFor={name}
        onMouseOver={hoverByLabel ? onMouseOver : undefined}
        onMouseLeave={hoverByLabel ? onMouseLeave : undefined}
        disabled={disabled}
        {...labelProps}
        style={labelStyle}
      >
        <CheckboxIcon 
          {...checkboxIconProps}
          hover={isHovering} 
          selected={checked} 
          disabled={disabled} 
          color={checkboxColor} 
          hoverColor={checkboxHoverColor} 
          indeterminate={indeterminate}
          mr={8}
          style={{...checkboxStyle}}
        />
        {label}
        <Radio ref={ref} name={name} type="checkbox" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
      </CheckboxLabel>
    );
  });
