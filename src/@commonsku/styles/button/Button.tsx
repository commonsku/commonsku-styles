import React, { useState } from 'react';
import { ButtonProps } from './types';
import { getPropsByPresets, getSizeStyle, getVariantStyles } from './styles';
import StyledButton from './StyledButton';
import ButtonIcon from './ButtonIcon';


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    Icon,
    children,
    iconPosition='left',
    size="medium",
    iconProps={},
    ...rest
  } = getPropsByPresets(props, props.preset);
  const [hovering, setHovering] = useState(false);

  const variantStyles = React.useMemo(() => {
    return rest.variant
      ? getVariantStyles(props, rest.variant)
      : { color: '#fff' };
  }, [rest, props]);

  const hasChildren = (
    (children && children !== null && children !== undefined)
    || (children && Array.isArray(children) && children.length > 0
        && children[0] !== null && children[0] !== undefined)
  );

  const buttonPadding = !hasChildren
    ? getSizeStyle('iconOnlyPadding', '12px')
    : getSizeStyle('padding', '12px');

  return (
    <StyledButton
      ref={ref}
      size={size}
      {...rest}
      style={{
        ...(rest.style || {}),
        padding: buttonPadding({ size: size }),
        ...(iconPosition === "top" || iconPosition === "bottom" ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        } : {}),
      }}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {['left', 'top'].includes(iconPosition) && <ButtonIcon
        Icon={Icon}
        size={size}
        variantStyles={variantStyles}
        iconProps={iconProps}
        iconPosition={iconPosition}
        hasChildren={!!hasChildren}
        isHovering={hovering}
      />}
      {children}
      {['right', 'bottom'].includes(iconPosition) && <ButtonIcon
        Icon={Icon}
        size={size}
        variantStyles={variantStyles}
        iconProps={iconProps}
        iconPosition={iconPosition}
        hasChildren={!!hasChildren}
        isHovering={hovering}
      />}
    </StyledButton>
  );
});

export default Button;
