import React, { useState, useRef, useEffect } from 'react'
import { document } from '../../utils';
import { getThemeColor, colors } from '../Theme';
import { Label } from '../Label';
import { LabeledIconInputProps } from './types';
import InputIconLabelContainer from './InputIconLabelContainer';
import InputIconLabel from './InputIconLabel';
import Input from './Input';

const LabeledIconInput = React.forwardRef<HTMLInputElement, LabeledIconInputProps>(
  (
    {
      label,
      name,
      value,
      defaultValue,
      placeholder,
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
            style={{ marginBottom: 0, padding: 6, }}
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

export default LabeledIconInput;
