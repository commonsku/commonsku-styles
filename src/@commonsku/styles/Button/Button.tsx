import React from 'react';
import { ButtonIconProps, ButtonProps } from './types';
import { getSizeStyle, getVariantStyles } from './styles';
import StyledButton from './StyledButton';

const ButtonIcon = React.memo((p: ButtonIconProps) => {
  const {
    Icon,
    children,
    iconPosition = 'left',
    size,
    iconProps = {},
    variant,
  } = p;
  const variantStyles = variant ? getVariantStyles(p, variant) : { color: '#fff' };

  if (!Icon) { return null; }

  const iconNewProps = {
    ...iconProps,
    size: (size !== "tiny" && size !== "small") ? "medium" : "small",
    color: variantStyles.color || '#fff',
    style: {
      verticalAlign: 'top',
      paddingRight: children && iconPosition === "left" ? '5px' : '0px',
      paddingLeft: children && iconPosition === "right" ? '5px' : '0px',
      boxSizing: 'content-box',
      ...(iconProps.style || {}),
    },
  };

  if (typeof Icon !== 'function') {
    return React.cloneElement(Icon, iconNewProps);
  }

  return (
    <Icon {...iconNewProps} />
  );
});

function Button(props: ButtonProps) {
  const {
    children,
    iconPosition = 'left',
    style={},
  } = props;

  const hasChildren = React.useMemo(() => (
    (children && children !== null && children !== undefined)
    || (children && Array.isArray(children) && children.length > 0
      && children[0] !== null && children[0] !== undefined)
  ), [children]);

  const buttonPadding = !hasChildren
    ? getSizeStyle('iconOnlyPadding', '12px')
    : getSizeStyle('padding', '12px');

  return (
    <StyledButton {...props} style={{
      ...style,
      padding: buttonPadding(props),
    }}>
      {iconPosition !== 'right' ? <ButtonIcon {...props} /> : null}
      {children}
      {iconPosition === 'right' ? <ButtonIcon {...props} /> : null}
    </StyledButton>
  );
}

export default Button;
