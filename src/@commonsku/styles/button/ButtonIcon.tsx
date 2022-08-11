import { get } from 'lodash';
import React from 'react';
import { ButtonIconProps } from './types';

const ButtonIcon = React.forwardRef<SVGElement, ButtonIconProps>((props, ref) => {
  const {
    Icon,
    size,
    variantStyles={},
    iconProps={},
    iconPosition,
    hasChildren,
    isHovering,
  } = props;
  if (!Icon) { return null; }

  let btnSize = "small";
  if (size !== "tiny" && size !== "small") {
    btnSize = "medium";
  }
  const hoverColor = get(variantStyles, [':hover', 'color']) || '';
  const iconNewProps = {
    ...iconProps,
    size: btnSize,
    color: hoverColor && isHovering ? hoverColor : (iconProps?.color || variantStyles?.color || '#fff'),
    style: {
      verticalAlign: 'top',
      paddingRight: hasChildren && iconPosition === "left" ? '5px' : '0px',
      paddingLeft: hasChildren && iconPosition === "right" ? '5px' : '0px',
      boxSizing: 'content-box',
      ...(iconProps?.style || {}),
    },
  };

  if (typeof Icon !== 'function') {
    return React.cloneElement(Icon, iconNewProps);
  }

  return (
    <Icon {...iconNewProps} ref={ref} />
  );
});

export default ButtonIcon;
