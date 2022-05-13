import React from 'react';
import { SharedStyleTypes } from '../SharedStyles';
import { SizerTypes } from '../Sizer';
import { TSize } from './sizes';

type ButtonVariant = 'primary'
  | 'secondary'
  | 'cta'
  | 'error'
  | 'disabled'
  | 'text'
  | 'primary-light';

type BaseButtonProps = {
  secondary?: boolean;
  cta?: boolean;
  size?: TSize;
  variant?: ButtonVariant
} & SharedStyleTypes & SizerTypes;

type IconFuncProps = { color: string; [key: string]: any };
type TButtonIcon = ((props: IconFuncProps) => React.ReactElement) | React.ReactElement<IconFuncProps>;
type ButtonIconProps = React.PropsWithChildren<{
  Icon?: TButtonIcon | React.ReactElement<IconFuncProps>;
  iconPosition?: 'left' | 'right';
  size?: TSize;
  iconProps?: {[key: string]: any, style?: React.CSSProperties;};
  variant?: ButtonVariant;
}>;

type ButtonProps = React.PropsWithChildren<
  BaseButtonProps
  & ButtonIconProps
  & { style?: React.CSSProperties; }
  & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

type ButtonsGroupProps = SharedStyleTypes & SizerTypes;

export type {
  TSize,
  ButtonVariant,
  BaseButtonProps,
  TButtonIcon,
  ButtonIconProps,
  ButtonProps,
  ButtonsGroupProps,
};
