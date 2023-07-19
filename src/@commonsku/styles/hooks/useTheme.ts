import { merge } from 'lodash';
import { useMemo } from 'react';
import { useTheme as useBaseTheme } from 'styled-components';
import { themeOptions } from '../Theme';
import {
  getByKey,
  getColor,
  getFontFamily,
  getFontSize,
  getFontStyle,
  getThemeValue,
} from '../../utils/theme_helpers';

function useTheme() {
  const defaultTheme = useBaseTheme();
  const theme = useMemo(
    () => merge(themeOptions, defaultTheme),
    [defaultTheme]
  );

  return {
    theme,
    getColor: getColor(theme),
    getFontStyle: getFontStyle(theme),
    getFontSize: getFontSize(theme),
    getFontFamily: getFontFamily(theme),
    getByKey: getByKey(theme),
    getThemeValue: getThemeValue(theme),
  };
}

export default useTheme;
