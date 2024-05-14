import styled from 'styled-components';
import React, { useState } from 'react';
import { getThemeColor, fontStyles } from './Theme';
import { stripUnit } from '../utils';
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

const createAnimationLeftStyle = (p: CommonProps) => {
  if (p.stretch) {
    return `calc(100% * 1.5px)`;
  }
  return `${stripUnit(toggleSizes[p.size ?? 'medium'].width) + 3}px`;
};

const ContainerStyled = styled(Csku)<CommonProps>`
  &&& {
    position: relative;
    background: ${p => getThemeColor(p, 'teal.main', 'var(--color-primary1-main)')};
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
        left: ${createAnimationLeftStyle};
      }
    }
  
    @keyframes switch-slide-to-left {
      from {
        left: ${createAnimationLeftStyle};
      }
      to { left: 1px; }
    }
  }`

const SwitchDotStyled = styled(Csku)<CommonProps>`
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
      stretch={stretch}
      size={size}
      onClick={onClick}
      style={style}
      {...props}
    >
      <SwitchDotStyled
        selected={selected}
        stretch={stretch}
        size={size}
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
