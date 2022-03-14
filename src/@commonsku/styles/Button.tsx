import React from 'react';
import { get } from 'lodash';
import styled, { css, CSSObject } from 'styled-components'
import { getThemeColor, themeOptions } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import colors from './colors';
import { Row } from '.';

/*

  PASS THE BUTTON TYPE AS A PROP:
    - primary (default)
    - secondary
    - cta
    - link

  PASS A SIZE AS A PROP:
    - xl
    - large
    - medium (default)
    - small
    - tiny
  
  OPTIONAL PROPS:
    - disabled

*/

export const sizes = {
  tiny: {
    'font-family': themeOptions.fontStyles.button.tiny.fontFamily,
    'font-size': themeOptions.fontStyles.button.tiny.fontSize,
    'line-height': themeOptions.fontStyles.button.tiny.lineHeight,
    padding: '3px 9px', // 6px 12px minus 3px each for border
    iconOnlyPadding: '3px', // 6px minus 3px each for border
    borderRadius: '3px',
    iconSize: '16px',
  },
  small: {
    'font-family': themeOptions.fontStyles.button.small.fontFamily,
    'font-size': themeOptions.fontStyles.button.small.fontSize,
    'line-height': themeOptions.fontStyles.button.small.lineHeight,
    padding: '5px 13px', //8px 16px minus 3px each for border
    iconOnlyPadding: '5px', //8px minus 3px each for border
    borderRadius: '4px',
    iconSize: '16px'

  },
  medium: {
    'font-family': themeOptions.fontStyles.button.medium.fontFamily,
    'font-size': themeOptions.fontStyles.button.medium.fontSize,
    'line-height': themeOptions.fontStyles.button.medium.lineHeight,
    padding: '5px 21px', //8px 24px minus 3px each for border
    iconOnlyPadding: '5px', //5px minus 3px each for border
    borderRadius: '4px',
    iconSize: '24px'

  },
  large: {
    'font-family': themeOptions.fontStyles.button.large.fontFamily,
    'font-size': themeOptions.fontStyles.button.large.fontSize,
    'line-height': themeOptions.fontStyles.button.large.lineHeight,
    padding: '9px 21px', //12px 24px minus 3px each for border
    iconOnlyPadding: '9px', //12px minus 3px each for border
    borderRadius: '4px',
    iconSize: '32px'
  },
  huge: {
    'font-family': themeOptions.fontStyles.button.huge.fontFamily,
    'font-size': themeOptions.fontStyles.button.huge.fontSize,
    'line-height': themeOptions.fontStyles.button.huge.lineHeight,
    padding: '13px 29px', // 16px 32px minus 3px each for border
    iconOnlyPadding: '13px', //16px minus 3px each for border
    borderRadius: '5px',
    iconSize: '48px'

  },
};
export type TSize = keyof typeof sizes;

export type ButtonVariant = 'primary'
  | 'secondary'
  | 'cta'
  | 'error'
  | 'disabled'
  | 'text';

type ButtonProps = {
  secondary?: boolean;
  cta?: boolean;
  size?: TSize;
  variant?: ButtonVariant
} & SharedStyleTypes & SizerTypes;

const getSizeStyle = (style: string, defaults: string) => {
  return ({ size }: ButtonProps) => {
    if (size) {
      return get(sizes, [size, style]) || defaults;
    }
    return defaults;
  };
}

const getVariantStyles = (props: ButtonProps, variant: ButtonVariant): CSSObject => {
  const white = getThemeColor(props, 'neutrals.white', colors.neutrals.white);
  const disabled = getThemeColor(props, 'neutrals.50', colors.errors['50']);
  const disabledText = getThemeColor(props, 'neutrals.70', colors.errors['70']);

  const primary = getThemeColor(props, 'primary1.main', colors.primary1.main);
  const primaryDark = getThemeColor(props, 'primary1.75', colors.primary1['75']);
  const primaryLight = getThemeColor(props, 'primary1.20', colors.primary1['20']);

  const cta = getThemeColor(props, 'secondary1.main', colors.secondary1.main);
  const ctaDark = getThemeColor(props, 'secondary1.80', colors.secondary1['80']);
  const ctaLight = getThemeColor(props, 'secondary1.20', colors.secondary1['20']);

  const error = getThemeColor(props, 'errors.main', colors.errors.main);
  const errorDark = getThemeColor(props, 'errors.80', colors.errors['80']);
  const errorLight = getThemeColor(props, 'errors.20', colors.errors['20']);

  switch (variant) {
    case 'primary':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: primary,
        background: primary,
        color: white,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: primaryDark,
          background: primaryDark,
          color: white,
        },
      };
    case 'secondary':
    // case 'primary-outline':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: primary,
        background: white,
        color: primary,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: primary,
          background: primaryLight,
          color: primary,
        },
      };
    case 'cta':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: cta,
        background: cta,
        color: white,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: ctaDark,
          background: ctaDark,
          color: white,
        },
      };
    case 'error':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: error,
        background: error,
        color: white,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: errorDark,
          background: errorDark,
          color: white,
        },
      };
    case 'disabled':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: disabled,
        background: disabled,
        color: disabledText,
        cursor: 'default',
      };
      case 'text':
        return {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: white,
          background: white,
          color: primary,
          ':hover': {
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: primaryLight,
            background: primaryLight,
            color: primary,
          },
        };
    default:
      return {};
  }
};

const Button = styled.button<ButtonProps>`
  &&& {
    border: 3px solid white;
    border-radius: ${props => props.size && sizes[props.size] ? sizes[props.size].borderRadius : '4px'};
    background: ${({ secondary, cta, ...props }) => 
      secondary ? "transparent" : 
      cta ? getThemeColor(props, 'cta', colors.cta) : getThemeColor(props, 'primary', colors.primary)
    };
    color: ${props => props.secondary ? getThemeColor(props, 'primary', colors.primary) : "white"};
    border-color: ${props => props.cta ? getThemeColor(props, 'cta', colors.cta) : getThemeColor(props, 'primary', colors.primary)};
    font-size: ${getSizeStyle('font-size', '1rem')};
    line-height: ${getSizeStyle('line-height', '1.5rem')};
    padding: ${p => getSizeStyle('padding', '12px 25px')};
    font-family: ${getSizeStyle('font-family', "'skufont-demibold', sans-serif")};
    cursor: pointer;
    vertical-align: top;
    /*
    &:focus {
      outline: none;
      opacity: .9;
      box-shadow: 0 0 8px ${({ secondary, cta, ...props }) => 
        secondary ? getThemeColor(props, 'primary', colors.primary): 
        cta ? getThemeColor(props, 'cta', colors.cta) : getThemeColor(props, 'primary', colors.primary)
      };
    }
    */
    &:disabled {
      background-color: ${props => getThemeColor(props, 'disabledButton', colors.disabledButton)};
      border-color: ${props => getThemeColor(props, 'disabledButtonBorder', colors.disabledButtonBorder)};
      color: ${props => getThemeColor(props, 'primary', colors.primary)};
      cursor: default;
      opacity: 0.5;
    }
    ${p => css(p.variant ? getVariantStyles(p, p.variant): {})}
    ${SharedStyles}
    ${SizerCss}
  }
`;

export const ButtonsGroup = styled.div<SharedStyleTypes & SizerTypes>`
  &&& {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 10px;
    margin-right: 100px;
    ${SharedStyles}
    ${SizerCss}
  }
`;

type IconFuncProps = { fill: string; [key: string]: any };
export type TButtonIcon = ((props: IconFuncProps) => React.ReactElement);
export type IconButtonProps = React.PropsWithChildren<ButtonProps & {
  Icon: TButtonIcon;
  iconPosition?: 'left' | 'right';
  style?: React.CSSProperties;
}>;
export function IconButton({
  Icon,
  children,
  iconPosition='left',
  size,
  ...props
}: IconButtonProps) {
  const variantStyles = props.variant
    ? getVariantStyles(props, props.variant)
    : { color: '#fff' };

  
  const RenderIcon = React.useMemo(() => {
    
    const BtnIconSize = (size?: TSize): "medium" | "small" => {
      if (size !== "tiny" && size !== "small") {
        return "medium";
      }
      return "small";
    };
  

    return (
      <Icon size={BtnIconSize(size)} fill={variantStyles.color || '#fff'} style={{verticalAlign: 'top', paddingRight: children ? '5px' : '0px', paddingTop: props => props.size === 'small' ? '10px' : '0px' }} />
    );
  }, [variantStyles.color, Icon, size, children]);

  const hasChildren = (
    (children && children !== null && children !== undefined)
    || (children && Array.isArray(children) && children.length > 0
        && children[0] !== null && children[0] !== undefined)
  );

  const buttonPadding = !hasChildren
    ? getSizeStyle('iconOnlyPadding', '12px')
    : getSizeStyle('padding', '12px');

  console.log(buttonPadding);

  return (
    <Button size={size} {...props} style={{
      ...(props.style || {}),
      padding: buttonPadding({ ...props, size: size }),
    }}>
      {iconPosition !== 'right' ? RenderIcon : null}
      {children}
      {iconPosition === 'right' ? RenderIcon : null}
    </Button>
  );
}

export {Button};
