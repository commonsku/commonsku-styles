import { map, pick, keys, isUndefined, isNull, forEach } from 'lodash';
import styled, { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export type SharedStyleTypes = {
  // [key: string]: any,
  pr?: boolean | string | number,
  pl?: boolean | string | number,
  pt?: boolean | string | number,
  pb?: boolean | string | number,
  px?: boolean | string | number,
  py?: boolean | string | number,
  mr?: boolean | string | number,
  ml?: boolean | string | number,
  mt?: boolean | string | number,
  mb?: boolean | string | number,
  mx?: boolean | string | number,
  my?: boolean | string | number,
  hidden?: boolean,
  block?: boolean,
  inline_block?: boolean,
  flex?: boolean,
  inline_flex?: boolean,
  grid?: boolean,
  custom?: string,
  bg?: string,
  float?: string,
}

export const SharedStyles = css<SharedStyleTypes>`
  box-sizing: border-box;
  ${p => {
    const styles: FlattenSimpleInterpolation[] = [];
    forEach(pick(p, keys(SHARED_STYLE_MAPS)), (v, k) => {
      if (isUndefined(v) || isNull(v) || v === '') { return; }

      const style = SHARED_STYLE_MAPS[k](v);
      if (typeof style === 'string') {
        styles.push(css`${style}`);
      } else {
        styles.push(css(style));
      } 
    });

    return styles;
  }}
`;
function parseMeasurementStyle(styleKeys: string[], value?: string | number) {
  if (value === undefined || value === null || value === '') { return {}; }

  const styles = {};
  styleKeys?.forEach(k => {
    styles[k] = typeof value === 'string' ? value : `${value}px`;
  });
  return styles;
}
const measurementStyles = {
  pr: ['paddingRight'],
  pl: ['paddingLeft'],
  pt: ['paddingTop'],
  pb: ['paddingBottom'],
  px: ['paddingRight', 'paddingLeft'],
  py: ['paddingTop', 'paddingBottom'],
  mr: ['marginRight'],
  ml: ['marginLeft'],
  mt: ['marginTop'],
  mb: ['marginBottom'],
  mx: ['marginRight', 'marginLeft'],
  my: ['marginTop', 'marginBottom'],
};

type MediaQuery = {query: string; styles: CSSObject };

export const SHARED_STYLE_MAPS: { [key: string]: ((value?: any) => string | CSSObject) } = {
  // Padding
  pr: (val?: string | number) => parseMeasurementStyle(measurementStyles.pr, val),
  pl: (val?: string | number) => parseMeasurementStyle(measurementStyles.pl, val),
  pt: (val?: string | number) => parseMeasurementStyle(measurementStyles.pt, val),
  pb: (val?: string | number) => parseMeasurementStyle(measurementStyles.pb, val),
  px: (val?: string | number) => parseMeasurementStyle(measurementStyles.px, val),
  py: (val?: string | number) => parseMeasurementStyle(measurementStyles.py, val),
  // Margin
  mr: (val?: string | number) => parseMeasurementStyle(measurementStyles.mr, val),
  ml: (val?: string | number) => parseMeasurementStyle(measurementStyles.ml, val),
  mt: (val?: string | number) => parseMeasurementStyle(measurementStyles.mt, val),
  mb: (val?: string | number) => parseMeasurementStyle(measurementStyles.mb, val),
  mx: (val?: string | number) => parseMeasurementStyle(measurementStyles.mx, val),
  my: (val?: string | number) => parseMeasurementStyle(measurementStyles.my, val),
  // Background
  bg: (val: string) => ({background: val}),
  // Display
  hidden: () => ({display: 'none'}),
  block: () => ({display: 'block'}),
  inline_block: () => ({display: 'inline-block'}),
  'inline-block': () => ({display: 'inline-block'}),
  inline: () => ({display: 'inline'}),
  flex: () => ({display: 'flex'}),
  'inline-flex': () => ({display: 'inline-flex'}),
  inline_flex: () => ({display: 'inline-flex'}),
  grid: () => ({display: 'grid'}),
  // Float
  float: (val?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end' | 'clearfix') => {
    if (!val) { return {}; }

    return val === 'clearfix' ? {
      '::after': {
        content: "",
        display: 'table',
        clear: 'both',
      },
    }: {float: val};
  },
  // Position
  pos: (val?: string) => parseMeasurementStyle(['position'], val),
  position: (val: string) => parseMeasurementStyle(['position'], val),
  // Overflow
  overflow: (val: string) => ({overflow: val}),
  // z-index
  z: (val?: string | number) => parseMeasurementStyle(['zIndex'], val),
  // media queries
  mediaQueries: (queries?: MediaQuery[]) => {
    const styles: string[] = [];
    queries?.forEach(q => {
      styles.push(`
        ${q.query} { ${css(q.styles)} }
      `);
    });

    return styles.join('');
  },
  // media queries
  sx: (styles?: CSSObject) => styles || {},
  // Custom Styles
  custom: (val?: string) => val || '',
};

export const Wrapper = styled.div`${SharedStyles}`;
