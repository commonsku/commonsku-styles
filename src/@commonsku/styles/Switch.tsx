import styled from 'styled-components';
import React, { useState } from 'react';
import { getThemeColor } from './Theme';
import Csku, { BaseCskuProps } from './Csku';

const toggleSizes = {
  small: {
    height: '15px',
    width: '15px',
  },
  medium: {
    height: '20px',
    width: '20px',
  },
  large: {
    height: '35px',
    width: '35px',
  }
};

type ToggleSize = keyof typeof toggleSizes;
type CommonProps = {
  selected?: boolean;
  stretch?: boolean;
  size?: ToggleSize;
};
export type SwitchProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
} & CommonProps & Omit<Omit<Omit<BaseCskuProps, 'hidden'>, 'color'>, 'style'>;
export type SwitchStatedProps = {
  initialSelected?: boolean;
  style?: React.CSSProperties;
  onClick?: (value: boolean) => void;
} & Omit<CommonProps, 'selected'>
  & Omit<BaseCskuProps, 'style'>;

const SwitchDotStyled = styled.div<CommonProps>`
 &&& {
  position: relative;
  background: #FFFFFF;
  height: 20px;
  width: 20px;
  border-radius: 100px;

  animation: ${p => p.selected
    ? 'switch-slide-to-right .3s forwards 1'
    : 'switch-slide-to-left .3s forwards 1'};
 }
`;

const ContainerStyled = styled.div<CommonProps>`
&&& {
  position: relative;
  background: ${p => p.selected
      ? getThemeColor(p, 'teal.main', 'var(--color-primary1-main)')
      : getThemeColor(p, 'neutrals.60', 'var(--color-neutrals-60)')
  };
  border-radius: 100px;
  cursor: pointer;
  transition: background .3s;
  ${p => toggleSizes[p.size ?? 'medium']}
  width: 48px;
  height: 24px;
  padding: 2px;

  @keyframes switch-slide-to-right {
    from { left: 0; }
    to {
      left: 24px;
    }
  }

  @keyframes switch-slide-to-left {
    from {
      left: 24px;
    }
    to { left: 0px; }
  }

  [aria-disabled="true"] {
    background: ${p => getThemeColor(p, 'neutrals.60', 'var(--color-neutrals-60)')};
  }

  ${SwitchDotStyled}[aria-disabled="true"] {
    background: ${p => getThemeColor(p, 'neutrals.40', 'var(--color-neutrals-40)')};
  }
}`


const SwitchStyled = ({
  onClick,
  size = 'medium',
  selected = false,
  stretch = false,
  style = {},
  ...props
}: SwitchProps) => {
  return (
    <ContainerStyled
      selected={selected}
      aria-selected={selected}
      stretch={stretch}
      size={size}
      onClick={onClick}
      style={style}
      {...props}
    >
      <SwitchDotStyled
        selected={selected}
        aria-selected={selected}
        stretch={stretch}
        size={size}
        aria-disabled={props['aria-disabled']}
      />
    </ContainerStyled>
  );
}

const Switch = ({
  size = 'medium',
  initialSelected = false,
  stretch = false,
  onClick,
  ...props
}: SwitchStatedProps) => {
  const [state, setState] = useState(initialSelected);
  const handleToggle = () => {
    const value = !state;
    setState(value);
    onClick && onClick(value);
  }

  return (
    <SwitchStyled
      {...props}
      selected={state}
      stretch={stretch}
      size={size}
      onClick={handleToggle}
    />
  );
}

export {
  SwitchStyled,
  Switch,
}
