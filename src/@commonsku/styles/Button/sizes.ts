import { themeOptions } from "../Theme";

const sizes = {
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

export default sizes;
