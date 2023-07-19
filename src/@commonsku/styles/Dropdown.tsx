import { filter } from 'lodash';
import React, { ReactNode, useEffect, useState, useRef, useCallback, MouseEventHandler } from 'react';
import styled, { CSSObject, DefaultTheme } from 'styled-components'
import { Button, ButtonVariant, ButtonProps, TSize } from './Button';
import { ChevronIcon } from './icons';
import { document, stripUnit, window } from '../utils';
import { getColor } from '../utils/theme_helpers';
import useTheme from './hooks/useTheme';

export const StyledDropdown = styled.div`
&&& {
  position: relative;
  display: inline-block;
}
`;

type DropdownContentProps = {
  primary?: boolean,
  underlined?: boolean,
  text?: string,
  width?: string | number,
  bordered?: boolean,
}

type DropdownItemProps = {
  primary?: boolean,
  underlined?: boolean,
}

export const DropdownItem = styled.div<DropdownItemProps>`
&&& {
  color: ${p => getColor(p.theme)('primary')};
  padding: 8px 8px;
  text-decoration: none;
  display: block;
  ${p => p.underlined &&
    `border-bottom: 1px solid ${getColor(p.theme)(p.primary ? 'primary' : 'white')};`}
  :last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${p => getColor(p.theme)('bgblue')};
    border-radius: 5px;
    cursor: pointer;
  }
}
`;

export const DropDownContent = styled.div<DropdownContentProps>`
&&& {
  display: block;
  position: absolute;
  background-color: ${p => getColor(p.theme)('white')};
  min-width: ${p => typeof p.width === 'number' ? p.width + 'px' : p.width || '160px'};
  ${p => p.bordered ? `border: 2px solid ${getColor(!p.primary || p.primary ? 'teal.main' : 'pink.main')};` : ''}
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 8px 8px;
  border-radius: 5px;
  text-align: left;
  z-index: 105;
}
`;

export type TDropdownItem = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  props?: {
    [key: string]: any;
    underlined?: boolean;
  };
  content: ReactNode | string | any;
};
export type DropdownProps = {
  items?: Array<TDropdownItem>;
  icon?: ReactNode;
  openMenu?: boolean;
  mouseLeaveCallback?: any;
  size?: TSize;
  style?: CSSObject;
  buttonVariant?: ButtonVariant;
  buttonProps?: ButtonProps,
  width?: string | number;
  bordered?: boolean;
  hideOnMouseLeave?: boolean;
  onToggleMenu?: (value: boolean) => void;
};

const getContentStyle = (width: string | number, rootElem: HTMLSpanElement | null, buttonElem: HTMLButtonElement | null) => {
  if (!rootElem || !buttonElem) { return {}; }
  const rect = rootElem.getBoundingClientRect();
  const buttonRect = buttonElem.getBoundingClientRect();
  const offset = window.innerWidth - (rect.x + rect.width);
  if (offset < stripUnit(width)) {
    return {
      marginLeft: '-' + Math.abs(stripUnit(width) - buttonRect.width) + 'px',
    };
  }
  return {};
};

export const Dropdown = ({
  items,
  children = undefined,
  underlined,
  primary,
  text,
  icon,
  openMenu = false,
  onToggleMenu,
  mouseLeaveCallback,
  size,
  style = {},
  buttonVariant,
  buttonProps = {},
  width = 160,
  bordered = false,
  hideOnMouseLeave = true,
  ...props
}: React.PropsWithChildren<DropdownProps & DropdownContentProps>) => {
  const {
    getColor: getTColor
  } = useTheme();
  const rootRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showMenu, setShowMenu] = useState(openMenu);
  const iconProps = {
    color: getTColor(primary ? 'primary100' : 'white'),
    style: { verticalAlign: 'middle', transitionDuration: '.3s', transform: 'rotate(' + (showMenu ? 0 : 180) + 'deg)' },
  };

  const handleToggleMenu = useCallback((value: boolean | null = null) => {
    setShowMenu(s => {
      const newValue = value ?? !s;
      onToggleMenu?.(newValue);
      return newValue;
    });
  }, [onToggleMenu]);

  const handleClick = useCallback((e: Event) => {
    if (rootRef.current?.contains(e.target as Node)) {
      return;
    }
    handleToggleMenu(false);
  }, [handleToggleMenu]);

  useEffect(() => {
    if (items) {
      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [items, handleClick]);

  const contentStyle = getContentStyle(width, rootRef.current, buttonRef.current);
  return (
    <span ref={rootRef} {...props} style={style} onMouseLeave={() => {
      if (!hideOnMouseLeave) { return; }
      handleToggleMenu(false);
      if (mouseLeaveCallback) {
        mouseLeaveCallback()
      }
    }}>
      <StyledDropdown>
        {icon ?
          <span onClick={() => handleToggleMenu(!showMenu)}>
            {icon}
          </span>
          :
          <Button
            size={size}
            cta={Boolean(!primary)}
            variant={buttonVariant}
            onClick={() => handleToggleMenu(!showMenu)}
            ref={buttonRef}
            {...buttonProps}
          >
            {text ? text : "Actions"} <ChevronIcon direction="up"  {...iconProps} />
          </Button>
        }
        {showMenu && <DropDownContent style={contentStyle} underlined={underlined} primary={primary} width={width} bordered={bordered}>
          {items && filter(items).map(({ onClick, content, props: legecyProps, ...itemProps }, i) => {
            return <DropdownItem key={'dropdown-item-' + i}
              underlined={underlined}
              {...legecyProps}
              primary={primary}
              onClick={(e) => {
                setShowMenu(false);
                onClick?.(e);
              }}
              {...itemProps}
            >{content}</DropdownItem>
          })}
          {children ? children : null}
        </DropDownContent>}
      </StyledDropdown>
    </span>
  );
}
