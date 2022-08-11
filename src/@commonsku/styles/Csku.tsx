import styled, { CSSObject, SimpleInterpolation, StyledComponent } from 'styled-components';
import { parseMeasurement, stripUnit } from '../utils';
import { isSizeObj, parseResponsiveValue, ResponsiveValue } from '../utils/styled';

export const createMeasurementStyle = (v: string | number, keys: string[]) => {
  const value = typeof v === 'string' && ['auto', 'none'].includes(v)
    ? v
    : parseMeasurement(v);
  return keys.reduce((acc: object, k) => ({ ...acc, [k]: value }), {});
};

const styleKeys = [
  'pr', 'pl', 'pt', 'pb', 'px', 'py',
  'mr', 'ml', 'mt', 'mb', 'mx', 'my',
  'width', 'height',
  'color', 'bg', 'background', 'backgroundColor',
  'colSpan',
  'style', 'sx',
];
const stylesTransformMap = {
  mr: (v: string | number) => createMeasurementStyle(v, ['marginRight']),
  ml: (v: string | number) => createMeasurementStyle(v, ['marginLeft']),
  mt: (v: string | number) => createMeasurementStyle(v, ['marginTop']),
  mb: (v: string | number) => createMeasurementStyle(v, ['marginBottom']),
  mx: (v: string | number) => createMeasurementStyle(v, ['marginLeft', 'marginRight']),
  my: (v: string | number) => createMeasurementStyle(v, ['marginTop', 'marginBottom']),
  pr: (v: string | number) => createMeasurementStyle(v, ['paddingRight']),
  pl: (v: string | number) => createMeasurementStyle(v, ['paddingLeft']),
  pt: (v: string | number) => createMeasurementStyle(v, ['paddingTop']),
  pb: (v: string | number) => createMeasurementStyle(v, ['paddingBottom']),
  px: (v: string | number) => createMeasurementStyle(v, ['paddingLeft', 'paddingRight']),
  py: (v: string | number) => createMeasurementStyle(v, ['paddingTop', 'paddingBottom']),
  width: (v: string | number) => createMeasurementStyle(v, ['width']),
  height: (v: string | number) => createMeasurementStyle(v, ['height']),
  color: (v: string) => ({ color: v }),
  bg: (v: string) => ({ background: v }),
  background: (v: string) => ({ background: v }),
  backgroundColor: (v: string) => ({ backgroundColor: v }),
  hidden: (v?: boolean) => (v ? { display: 'none' } : {}),
  block: (v?: boolean) => (v ? { display: 'block' } : {}),
  inline_block: (v?: boolean) => (v ? { display: 'inline-block' } : {}),
  flex: (v?: boolean) => (v ? { display: 'flex' } : {}),
  inline_flex: (v?: boolean) => (v ? { display: 'inline-flex' } : {}),
  grid: (v?: boolean) => (v ? { display: 'grid' } : {}),
  float: (v: string) => (v === 'clearfix'
    ? {'&::after': {
      content: '',
      display: 'table',
      clear: 'both',
    }}
    : {float: v}
  ), // left, right, none, clearfix
  colSpan: (v: string | number | boolean) => {
    if (v === 'auto' || v === true) {
        return { gridColumn: 'auto' };
    } else if (v === false) {
      return { display: 'none' };
    }
    const colSpan = stripUnit(v);
    return {gridColumn: `span ${colSpan} / span ${colSpan}`};
  },
  style: (v: CSSObject) => v,
  sx: (v: CSSObject) => v,
};

export type BaseCskuProps = {
  pr?: ResponsiveValue<string | number>;
  pl?: ResponsiveValue<string | number>;
  pt?: ResponsiveValue<string | number>;
  pb?: ResponsiveValue<string | number>;
  px?: ResponsiveValue<string | number>;
  py?: ResponsiveValue<string | number>;
  mr?: ResponsiveValue<string | number>;
  ml?: ResponsiveValue<string | number>;
  mt?: ResponsiveValue<string | number>;
  mb?: ResponsiveValue<string | number>;
  mx?: ResponsiveValue<string | number>;
  my?: ResponsiveValue<string | number>;
  width?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  color?: ResponsiveValue<string>;
  bg?: ResponsiveValue<string>;
  background?: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  hidden?: ResponsiveValue<boolean>;
  block?: ResponsiveValue<boolean>;
  inline_block?: ResponsiveValue<boolean>;
  flex?: ResponsiveValue<boolean>;
  inline_flex?: ResponsiveValue<boolean>;
  grid?: ResponsiveValue<boolean>;
  float?: ResponsiveValue<string>;
  colSpan?: ResponsiveValue<string | number | boolean>;
  style?: ResponsiveValue<CSSObject>;
  sx?: ResponsiveValue<CSSObject>;
};

export const parseCskuStyles = (p: BaseCskuProps) => {
  let sizeStylesObj: {[key: string]: CSSObject} = {};
  let stylesObj: CSSObject = {};
  const stylesArr: SimpleInterpolation[] = [];
  Object.keys(p)
    .filter(k => styleKeys.includes(k))
    .forEach(k => {
      const parsedStyles = parseResponsiveValue(
        p[k], stylesTransformMap[k]
      );
      if (Array.isArray(parsedStyles)) {
        parsedStyles.forEach(v => {
          stylesArr.push(v);
        })
      } else {
        if (isSizeObj(p[k]) || Array.isArray(p[k])) {
          Object.keys(parsedStyles).forEach(sk => {
            sizeStylesObj[sk] = {
              ...(sizeStylesObj[sk] || {}),
              ...parsedStyles[sk],
            };
          });
        } else {
          stylesObj = {
            ...stylesObj,
            ...parsedStyles,
          };
        }
      }
    });
  return [ stylesObj, sizeStylesObj, ...stylesArr ];
};

export type CskuProps = StyledComponent<"div", any, BaseCskuProps, never>;
const Csku = styled.div<BaseCskuProps>(parseCskuStyles);

export default Csku;
