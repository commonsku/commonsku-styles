import React from 'react';
import { CSSObject } from 'styled-components';
import { BaseCskuProps, CskuProps } from '../Csku';
import { TSize } from './sizes';


type ButtonVariant = 'primary'
  | 'secondary'
  | 'cta'
  | 'error'
  | 'disabled'
  | 'text'
  | 'primary-light'
  | 'text-error';

type ButtonPreset = 'edit'
  | 'delete'
  | 'add' 
  | 'remove'
  | 'close'
  | 'drag';

type BaseButtonProps = {
  secondary?: boolean;
  cta?: boolean;
  size?: TSize;
  variant?: ButtonVariant;
} & BaseCskuProps;

type IconFuncProps = { color: string; [key: string]: any };
type TButtonIcon = ((props: IconFuncProps) => React.ReactElement);
type ButtonIconProps = React.PropsWithChildren<{
  Icon?: TButtonIcon | React.ReactElement<IconFuncProps>;
  iconProps?: {[key: string]: any; style?: React.CSSProperties;};
  style?: React.CSSProperties;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  size?: TSize;
  variant?: ButtonVariant;
  variantStyles?: CSSObject;
  hasChildren?: boolean;
  isHovering?: boolean;
}>;

type ButtonProps = React.PropsWithChildren<
  BaseButtonProps
  & ButtonIconProps
  & { preset?: ButtonPreset; }
  & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

type ButtonsGroupProps = BaseCskuProps & { varaint: 'hello' };

export type {
  TSize,
  ButtonVariant,
  ButtonPreset,
  BaseButtonProps,
  TButtonIcon,
  ButtonIconProps,
  ButtonProps,
  ButtonsGroupProps,
};
