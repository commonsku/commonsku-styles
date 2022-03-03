import { map, pick, keys, isUndefined } from 'lodash';
import styled, { css } from 'styled-components';
import { valIsValid } from '../utils';

export type SharedStyleTypes = {
  // [key: string]: any,
  pr?: boolean | number,
  pl?: boolean | number,
  pt?: boolean | number,
  pb?: boolean | number,
  px?: boolean | number,
  py?: boolean | number,
  mr?: boolean | number,
  ml?: boolean | number,
  mt?: boolean | number,
  mb?: boolean | number,
  mx?: boolean | number,
  my?: boolean | number,
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
  ${p => map(pick(p, keys(SHARED_STYLE_MAPS)), (v, k) => {
    return isUndefined(v) ? '' : SHARED_STYLE_MAPS[k](v);
  }).join('')}
`;

export const SHARED_STYLE_MAPS: { [key: string]: Function } = {
  // Padding
  pr: (val?: string | number) => `padding-right: ${valIsValid(val) ? val : '5'}px;`,
  pl: (val?: string | number) => `padding-left: ${valIsValid(val) ? val : '5'}px;`,
  pt: (val?: string | number) => `padding-top: ${valIsValid(val) ? val : '5'}px;`,
  pb: (val?: string | number) => `padding-bottom: ${valIsValid(val) ? val : '5'}px;`,
  px: (val?: string | number) => `
        padding-left: ${valIsValid(val) ? val : '5'}px;
        padding-right: ${valIsValid(val) ? val : '5'}px;
    `,
  py: (val?: string | number) => `
        padding-top: ${valIsValid(val) ? val : '5'}px;
        padding-bottom: ${valIsValid(val) ? val : '5'}px;
    `,
  // Margin
  mr: (val?: string | number) => `margin-right: ${valIsValid(val) ? val : '5'}px;`,
  ml: (val?: string | number) => `margin-left: ${valIsValid(val) ? val : '5'}px;`,
  mt: (val?: string | number) => `margin-top: ${valIsValid(val) ? val : '5'}px;`,
  mb: (val?: string | number) => `margin-bottom: ${valIsValid(val) ? val : '5'}px;`,
  mx: (val?: string | number) => `
        margin-left: ${valIsValid(val) ? val : '5'}px;
        margin-right: ${valIsValid(val) ? val : '5'}px;
    `,
  my: (val?: string | number) => `
        margin-top: ${valIsValid(val) ? val : '5'}px;
        margin-bottom: ${valIsValid(val) ? val : '5'}px;
    `,
  // Background
  bg: (val: string) => `background: ${val};`,
  // Display
  hidden: () => `display: none;`,
  block: () => `display: block;`,
  inline_block: () => `display: inline-block;`,
  'inline-block': () => `display: inline-block;`,
  inline: () => `display: inline;`,
  flex: () => `display: flex;`,
  'inline-flex': () => `display: inline-flex;`,
  inline_flex: () => `display: inline-flex;`,
  grid: () => `display: grid;`,
  // Float
  float: (val: string) => `${val === 'clearfix' ? `
        &::after {
            content: "";
            display: table;
            clear: both;
        }` : `float: ${val}`};`, // left, right, none, clearfix
  // Position
  pos: (val: string) => `position: ${val}`,
  position: (val: string) => `position: ${val}`,
  // Overflow
  overflow: (val: string) => `overflow: ${val}`,
  // z-index
  z: (val: string | number) => `z-index: ${val}`,
  // Custom Styles
  custom: (val?: string) => `${val}`,
};

export const Wrapper = styled.div`${SharedStyles}`;
