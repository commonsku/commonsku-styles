import styled from 'styled-components';
import React, { useState } from 'react';
import { getThemeColor, fontStyles, colors} from './Theme';
import { stripUnit } from '../utils';
import Csku, { BaseCskuProps } from './Csku';

const toggleSizes = {
  small: {
    'font-family': fontStyles.button.small.fontFamily,
    'font-size': fontStyles.button.small.fontSize,
    'line-height': fontStyles.button.small.lineHeight,
    padding: '8px 12px',
    borderRadius: '4px',
    height: '15px',
  },
  medium: {
    'font-family': fontStyles.button.medium.fontFamily,
    'font-size': fontStyles.button.medium.fontSize,
    'line-height': fontStyles.button.medium.lineHeight,
    padding: '8px 16px',
    borderRadius: '4px',
    height: '20px',
  },
  large: {
    'font-family': fontStyles.button.large.fontFamily,
    'font-size': fontStyles.button.large.fontSize,
    'line-height': fontStyles.button.large.lineHeight,
    padding: '12px 24px',
    borderRadius: '4px',
    height: '35px',
  }
};

type ToggleSize = keyof typeof toggleSizes;
type CommonProps = {
  selected?: boolean;
  stretch?: boolean;
  size?: ToggleSize;
};
export type ToggleSwitchProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
} & CommonProps & Omit<Omit<Omit<BaseCskuProps, 'hidden'>, 'color'>, 'style'>;
export type ToggleSwitchStatedProps = {
  initialSelected?: boolean;
  style?: React.CSSProperties;
  onClick?: (value: boolean) => void;
} & Omit<CommonProps, 'selected'>
  & Omit<BaseCskuProps, 'style'>;

const createAnimationLeftStyle = (p: CommonProps) => {
  if (p.stretch) {
    return `calc(100% * 1.5px)`;
  }
  return `${stripUnit(toggleSizes[p.size || 'medium'].height) * 1.5}px`;
};

const ContainerStyled = styled(Csku)<CommonProps>`
  &&& {
    position: relative;
    background: ${p => p.selected
      ? getThemeColor(p, 'teal.main', 'var(--color-primary1-main)')
      : getThemeColor(p, 'teal.20', colors.teal['20'])};
    width: ${p => p.stretch
        ? '100%'
        : `${stripUnit(toggleSizes[p.size || 'medium'].height) * 2.5}px`};
    padding: 0.35rem;
    border-radius: 1.8rem;
    cursor: pointer;
    transition: background .3s;

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
      to { left: 0; }
    }
  }`

const ToggleSwitchDotStyled = styled(Csku)<CommonProps>`
 &&& {
  position: relative;
  background: #FFFFFF;
  width: ${p => toggleSizes[p.size || 'medium'].height};
  height: ${p => toggleSizes[p.size || 'medium'].height};
  border-radius: 50%;

  animation: ${p => p.selected
    ? 'switch-slide-to-right .3s forwards 1'
    : 'switch-slide-to-left .3s forwards 1'};
 }
`;


const ToggleSwitchStyled = ({
  onClick,
  size = 'medium',
  selected = false,
  stretch = false,
  style = {},
  ...props
}: ToggleSwitchProps) => {
  return (
    <Csku {...props} onClick={onClick}>
      <ContainerStyled
        selected={selected}
        stretch={stretch}
        size={size}
      >
        <ToggleSwitchDotStyled
          selected={selected}
          stretch={stretch}
          size={size}
        />
      </ContainerStyled>
    </Csku>
  );
}

const ToggleSwitch = ({
  size = 'medium',
  initialSelected = false,
  stretch = false,
  onClick,
  ...props
}: ToggleSwitchStatedProps) => {
  const [state, setState] = useState(initialSelected);
  const handleToggle = () => {
    const value = !state;
    setState(value);
    onClick && onClick(value);
  }

  return (
    <ToggleSwitchStyled
      {...props}
      selected={state}
      stretch={stretch}
      size={size}
      onClick={handleToggle}
    />
  );
}

export {
  ToggleSwitchStyled,
  ToggleSwitch,
}
