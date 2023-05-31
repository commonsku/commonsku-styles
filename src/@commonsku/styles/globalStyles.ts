import _ from 'lodash';
import { createGlobalStyle, CSSObject, DefaultTheme, ThemedStyledProps, ThemeProps } from 'styled-components';
import datepickerStyles from './datepickerStyles';

type ColorObj = {[key: string]: string | ColorObj};
const parseColorVars = (colors: ColorObj, prefix: string = ''): string => {
  return Object.keys(colors).map(k => {
    const v = colors[k];
    const key = (prefix ? `${prefix}-` : '') + k.replaceAll(' ', '_');

    if (typeof v === 'string') {
      return `
        --color-${key}: ${v};
      `;
    }

    return parseColorVars(v, key);
  }).join('\n');
};

type AdditionalStyle = CSSObject | string
  | ((p: ThemeProps<DefaultTheme>) => CSSObject | string | undefined | null);

export type AdditionalStyles = AdditionalStyle | AdditionalStyle[];

function createFontStyles(p: ThemedStyledProps<{additionalStyles?: AdditionalStyles;}, DefaultTheme>) {
  const fontFamilies = _.get(p, ['theme', 'fontFamilies'], {});
  return Object.keys(fontFamilies).map(
    k => {
      if (Array.isArray(fontFamilies[k])) {
        return `
        --font-family-${k}: ${fontFamilies[k].join(',')};
      `;
      }
      return `
      --skufont-${k}: ${fontFamilies[k]};
      --font-family-${k}: ${[fontFamilies[k]].concat(fontFamilies['fallbacks']).join(',')};
    `;
    }
  ).join('');
}

const parseAdditionalStyles = (
  p: ThemedStyledProps<{additionalStyles?: AdditionalStyles;}, DefaultTheme>
) => {
  if (!p.additionalStyles) { return null; }

  if (Array.isArray(p.additionalStyles)) {
    return p.additionalStyles.map(
      v => parseAdditionalStyles({
        ...p, additionalStyles: v,
      })
    )
  }

  switch (typeof p.additionalStyles) {
    case 'function':
      return p.additionalStyles(p);
    case 'object':
    case 'string':
      return p.additionalStyles;
    default:
      return null;
  }
};

const GlobalStyle = createGlobalStyle<{ additionalStyles?: AdditionalStyles }>`
:root {
  ${p => createFontStyles(p)}
  ${p => parseColorVars(_.get(p, ['theme', 'colors'], {}), '')}
  ${parseAdditionalStyles}
}
&&& {
  .commonsku-styles-select__input {
    input {
      height: auto;
    }
  }
  ${datepickerStyles}
}
`;

export default GlobalStyle;
