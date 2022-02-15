import { map, pick, keys, isUndefined } from 'lodash';
import styled, { css, CSSObject, StyledComponent } from 'styled-components';
import { mediaSizes, valIsValid } from '../utils';
import {
  FloatProperty, PositionProperty, OverflowProperty, ZIndexProperty,
  PaddingRightProperty,
  PaddingLeftProperty,
  PaddingTopProperty,
  PaddingBottomProperty,
  MarginRightProperty,
  MarginLeftProperty,
  MarginTopProperty,
  MarginBottomProperty,
  BackgroundProperty,
  FontWeightProperty,
} from 'csstype';

export type SharedStyleTypes = {
  // [key: string]: any,
  bold?: FontWeightProperty | boolean,
  pr?: PaddingRightProperty<string | number>,
  pl?: PaddingLeftProperty<string | number>,
  pt?: PaddingTopProperty<string | number>,
  pb?: PaddingBottomProperty<string | number>,
  px?: boolean | (PaddingLeftProperty<number> & PaddingRightProperty<number>),
  py?: boolean | (PaddingTopProperty<number> & PaddingBottomProperty<number>),
  mr?: MarginRightProperty<string | number>,
  ml?: MarginLeftProperty<string | number>,
  mt?: MarginTopProperty<string | number>,
  mb?: MarginBottomProperty<string | number>,
  mx?: boolean | (MarginLeftProperty<number> & PaddingRightProperty<number>),
  my?: boolean | (MarginTopProperty<number> & PaddingBottomProperty<number>),
  hidden?: boolean,
  block?: boolean,
  inline_block?: boolean,
  flex?: boolean,
  inline_flex?: boolean,
  grid?: boolean,
  custom?: CSSObject | TemplateStringsArray,
  bg?: BackgroundProperty<string | 0>,
  float?: FloatProperty,
  sx?: CSSObject,
  mediaXs?: CSSObject,
  mediaSm?: CSSObject,
  mediaMd?: CSSObject,
  mediaLg?: CSSObject,
  mediaXl?: CSSObject,
}

export const SharedStyles = css<SharedStyleTypes>`
  box-sizing: border-box;
  ${p => map(pick(p, keys(SHARED_STYLE_MAPS)), (v, k) => {
    const styleVal = SHARED_STYLE_MAPS[k](v);
    return css(isUndefined(v) ? {} : styleVal);
  })}
`;

export const SHARED_STYLE_MAPS: { [key: string]: (value?: any) => CSSObject| TemplateStringsArray } = {
  // Padding
  pr: (val?: string | number) => ({paddingRight: `${valIsValid(val) ? val : '5'}px`}),
  pl: (val?: string | number) => ({paddingLeft: `${valIsValid(val) ? val : '5'}px`}),
  pt: (val?: string | number) => ({paddingTop: `${valIsValid(val) ? val : '5'}px`}),
  pb: (val?: string | number) => ({paddingBottom: `${valIsValid(val) ? val : '5'}px`}),
  px: (val?: string | number) => ({
      paddingLeft: `${valIsValid(val) ? val : '5'}px`,
      paddingRight: `${valIsValid(val) ? val : '5'}px`,
  }),
  py: (val?: string | number) => ({
      paddingTop: `${valIsValid(val) ? val : '5'}px`,
      paddingBottom: `${valIsValid(val) ? val : '5'}px`,
  }),
  // Margin
  mr: (val?: string | number) => ({marginRight: `${valIsValid(val) ? val : '5'}px`}),
  ml: (val?: string | number) => ({marginLeft: `${valIsValid(val) ? val : '5'}px`}),
  mt: (val?: string | number) => ({marginTop: `${valIsValid(val) ? val : '5'}px`}),
  mb: (val?: string | number) => ({marginBottom: `${valIsValid(val) ? val : '5'}px`}),
  mx: (val?: string | number) => ({
        marginLeft: `${valIsValid(val) ? val : '5'}px`,
        marginRight: `${valIsValid(val) ? val : '5'}px`,
  }),
  my: (val?: string | number) => ({
        marginTop: `${valIsValid(val) ? val : '5'}px`,
        marginBottom: `${valIsValid(val) ? val : '5'}px`,
  }),
  // Background
  bg: (val: BackgroundProperty<string | 0>) => ({background: val}),
  // Display
  hidden: () => ({display: 'none'}),
  block: () => ({display: 'block'}),
  inline_block: () => ({display: 'inline-block'}),
  'inline-block': () => ({display: 'inline-block'}),
  inline: () => ({display: 'inline'}),
  flex: () => ({display: 'flex'}),
  'inline-flex': () => ({display: 'inline-flex'}),
  inline_flex: () => ({display: 'inline-flex'}),
  grid: () => ({display: 'inline-grid'}),
  // Float
  float: (val: FloatProperty | 'clearfix') => (
    val !== 'clearfix' ? {float: val} : {
      '::after': {
          content: '',
          display: 'table',
          clear: 'both',
      } as CSSObject
    } as CSSObject), // left, right, none, clearfix
  // Position
  pos: (val: PositionProperty) => ({position: val}),
  position: (val: PositionProperty) => ({position: val}),
  // Overflow
  overflow: (val: OverflowProperty) => ({overflow: val}),
  // z-index
  z: (val: ZIndexProperty) => ({zIndex: val}),
  // Custom Styles
  custom: (val?: CSSObject | TemplateStringsArray) => val ? val : {},

  bold: (val: FontWeightProperty | boolean) => ({
    fontWeight: typeof val === 'boolean' ? 'bold' : val,
  }),

  mediaXs: (styles?: CSSObject) => styles ? ({[`${mediaSizes.xs}`]: styles }) : {},
  mediaSm: (styles?: CSSObject) => styles ? ({[`${mediaSizes.sm}`]: styles }) : {},
  mediaMd: (styles?: CSSObject) => styles ? ({[`${mediaSizes.md}`]: styles }) : {},
  mediaLg: (styles?: CSSObject) => styles ? ({[`${mediaSizes.lg}`]: styles }) : {},
  mediaXl: (styles?: CSSObject) => styles ? ({[`${mediaSizes.xl}`]: styles }) : {},

  sx: (styles?: CSSObject) => styles ? styles : {}, // custom styles
};

export const Wrapper = styled.div<SharedStyleTypes>`${SharedStyles}`;
