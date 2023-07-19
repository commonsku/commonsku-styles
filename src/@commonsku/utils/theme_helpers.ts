import { get } from 'lodash';
import { DefaultTheme } from 'styled-components';
import { themeOptions } from '../styles/Theme';

export const getThemeValue = (theme: DefaultTheme = themeOptions) => (baseKey: string, key: string | string[], fallback: string = '') => {
  if (!key) { return fallback; }

  return get(
    theme[baseKey],
    key,
    get(theme[baseKey], fallback ?? '', fallback)
  ) ?? fallback;
}

export const getColor = (theme: DefaultTheme = themeOptions) => (key: string, fallback: string = ''): string => {
  return getThemeValue(theme)('colors', key, fallback) as string;
}

export const getFontStyle = (theme: DefaultTheme = themeOptions) => (key: string, fallback: string = ''): string => {
  return getThemeValue(theme)('fontStyles', key, fallback) as string;
}

export const getFontSize = (theme: DefaultTheme = themeOptions) => (key: string, fallback: string = ''): string | number => {
  return getThemeValue(theme)('fontStyles', `${key}.fontSize`, fallback) as (string | number);
}

export const getFontFamily = (theme: DefaultTheme = themeOptions) => (key: string, fallback: string = ''): string => {
  return getThemeValue(theme)('fontStyles', `${key}.fontFamily`, fallback) as string;
}

export const getByKey = (theme: DefaultTheme = themeOptions) => (key: string, fallback: string = '') => {
  if (!key) { return fallback; }

  return get(
    theme,
    key,
    get(theme, fallback ?? '', fallback)
  ) ?? fallback;
}
