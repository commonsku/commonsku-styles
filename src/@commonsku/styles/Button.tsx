import { get } from 'lodash';
import styled, { css, CSSObject } from 'styled-components'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import colors from './colors';

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
    'font-size': '.8em',
    'font-family': "'skufont-regular', sans-serif",
    padding: '5px 5px',
  },
  small: {
    'font-family': "'skufont-regular', sans-serif",
    padding: '7px 15px',
  },
  large: {
    padding: '17px 30px',
  },
  xl: {
    padding: '17px 50px',
  },
};
export type TSize = keyof typeof sizes;

type ButtonVariant = 'primary'
  | 'secondary'
  | 'cta'
  | 'error'
  | 'disabled'
  | 'text'
  | 'primary-outline'
  | 'secondary-outline'
  | 'cta-outline'
  | 'error-outline'
  | 'disabled-outline';

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

  const secondary = getThemeColor(props, 'secondary1.main', colors.secondary1.main);
  const secondaryDark = getThemeColor(props, 'secondary1.80', colors.secondary1['80']);
  const secondaryLight = getThemeColor(props, 'secondary1.20', colors.secondary1['20']);

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
    case 'primary-outline':
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
    case 'secondary':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: secondary,
        background: secondary,
        color: white,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: secondaryDark,
          background: secondaryDark,
          color: white,
        },
      };
    case 'secondary-outline':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: secondary,
        background: white,
        color: secondary,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: secondary,
          background: secondaryLight,
          color: secondary,
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
    case 'error-outline':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: error,
        background: white,
        color: error,
        ':hover': {
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: error,
          background: errorLight,
          color: error,
        },
      };
    case 'disabled':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: disabled,
        background: disabled,
        color: disabledText,
      };
    case 'disabled-outline':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: disabled,
        background: white,
        color: disabledText,
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
    border-radius: 5px;
    background: ${({ secondary, cta, ...props }) => 
      secondary ? "transparent" : 
      cta ? getThemeColor(props, 'cta') : getThemeColor(props, 'primary')
    };
    color: ${props => props.secondary ? getThemeColor(props, 'primary') : "white"};
    border-color: ${props => props.cta ? getThemeColor(props, 'cta') : getThemeColor(props, 'primary')};
    font-size: ${getSizeStyle('font-size', '1em')};
    padding: ${getSizeStyle('padding', '12px 25px')};
    font-family: ${getSizeStyle('font-family', "'skufont-demibold', sans-serif")};
    cursor: pointer;
    vertical-align: top;
    &:focus {
      outline: none;
      opacity: .9;
      box-shadow: 0 0 8px ${({ secondary, cta, ...props }) => 
        secondary ? getThemeColor(props, 'primary'): 
        cta ? getThemeColor(props, 'cta') : getThemeColor(props, 'primary')
      };
    }
    &:disabled {
      background-color: ${props => getThemeColor(props, 'disabledButton')};
      border-color: ${props => getThemeColor(props, 'disabledButtonBorder')};
      color: ${props => getThemeColor(props, 'primary')};
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
    display: inline-flex;
    max-width: 600px;
    margin-bottom: 10px;
    margin-right: 100px;
    justify-content: space-around;
    ${SharedStyles}
    ${SizerCss}
  }
`;

export {Button};
