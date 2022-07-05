import styled, { CSSObject, SimpleInterpolation, StyledComponent, StyledComponentProps } from 'styled-components';
import { parseMeasurement, stripUnit } from '../utils';
import { parseResponsiveValue, ResponseValue } from '../utils/styled';

export const createMeasurementStyle = (v: string | number, keys: string[]) => {
  const value = typeof v === 'string' && ['auto', 'none'].includes(v)
    ? v
    : parseMeasurement(v);
  return keys.reduce((acc: object, k) => ({ ...acc, [k]: value }), {});
};

const styleKeys = [
  'mx', 'my', 'px', 'py',
  'width', 'height',
  'color', 'bg', 'background', 'backgroundColor',
  'colSpan',
  'style', 'sx',
];
const stylesTransformMap = {
  mx: (v: string | number) => createMeasurementStyle(v, ['marginLeft', 'marginRight']),
  my: (v: string | number) => createMeasurementStyle(v, ['marginTop', 'marginBottom']),
  px: (v: string | number) => createMeasurementStyle(v, ['paddingLeft', 'paddingRight']),
  py: (v: string | number) => createMeasurementStyle(v, ['paddingTop', 'paddingBottom']),
  width: (v: string | number) => createMeasurementStyle(v, ['width']),
  height: (v: string | number) => createMeasurementStyle(v, ['height']),
  color: (v: string) => ({ color: v }),
  bg: (v: string) => ({ background: v }),
  background: (v: string) => ({ background: v }),
  backgroundColor: (v: string) => ({ backgroundColor: v }),
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
  mx?: ResponseValue<string | number>;
  my?: ResponseValue<string | number>;
  px?: ResponseValue<string | number>;
  py?: ResponseValue<string | number>;
  width?: ResponseValue<string | number>;
  height?: ResponseValue<string | number>;
  color?: ResponseValue<string>;
  bg?: ResponseValue<string>;
  background?: ResponseValue<string>;
  backgroundColor?: ResponseValue<string>;
  colSpan?: ResponseValue<string | number | boolean>;
  style?: ResponseValue<CSSObject>;
  sx?: ResponseValue<CSSObject>;
};

export type CskuProps = StyledComponent<"div", any, BaseCskuProps, never>;
const Csku = styled.div<BaseCskuProps>(
  p => {
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
          stylesObj = {
            ...stylesObj,
            ...parsedStyles,
          };
        }
      });
    return [ stylesObj, ...stylesArr ];
  },
);

export default Csku;
