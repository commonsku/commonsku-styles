import _ from 'lodash';
import { createGlobalStyle } from 'styled-components';
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

const GlobalStyle = createGlobalStyle`
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

${datepickerStyles}
`;

export default GlobalStyle;
