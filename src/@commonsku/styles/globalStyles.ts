import _ from 'lodash';
import { createGlobalStyle as baseCreateGlobalStyle, CSSObject, DefaultTheme, ThemedStyledProps } from 'styled-components';

type ColorObj = {[key: string]: string | ColorObj};
const parseColorVars = (colors: ColorObj, prefix: string = '') => {
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

const createGlobalStyle = (styles?: (props?: ThemedStyledProps<object, DefaultTheme>) => string|CSSObject) => baseCreateGlobalStyle`
:root {
  ${p => {
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
  }}

  ${p => parseColorVars(_.get(p, ['theme', 'colors'], {}), '')}
}
${styles}
`

const GlobalStyle = createGlobalStyle();
export default GlobalStyle;
