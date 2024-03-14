import styled, { CSSObject } from 'styled-components';

const DEFAULT_COLOR = 'var(--color-neutrals-90)';

type TypographyName = 'h1' | 'h2' | 'h5' | 'p' | 'span';
type TypographyCommonProps = {
  color?: string;
  noBottom?: boolean;
  bold?: boolean;
  underlined?: boolean;
  italic?: boolean;
  clickable?: boolean;
  textTransform?: CSSObject['textTransform'],
  lineHeight?: CSSObject['lineHeight'],
  fontSize?: CSSObject['fontSize'];
  fontWeight?: CSSObject['fontWeight'];
};

const createStyles = (name: TypographyName) => {
  return ({
    color=DEFAULT_COLOR,
    noBottom = false,
    bold = false,
    underlined = false,
    italic = false,
    clickable = false,
    textTransform = undefined,
    lineHeight = undefined,
    fontSize = undefined,
    fontWeight = undefined,
  }: TypographyCommonProps): CSSObject => {
    const styles: CSSObject = {
      color: color,
      fontFamily: bold ? 'var(--skufont-bold)' : 'var(--skufont-regular)',
      ...(clickable ? { cursor: 'pointer' } : {}),
      ...(noBottom ? { marginBottom: '0px' } : {}),
      ...(underlined ? {borderBottom: '1px solid #ccc'} : {}),
      ...(italic ? {fontStyle: 'italic'} : {}),
      ...(textTransform ? { textTransform } : {}),
      ...(lineHeight ? { lineHeight } : {}),
    };
    if (name === 'h1') {
      styles.fontSize = '34px';
      styles.fontFamily = 'var(--skufont-demibold)';
    } else if (name === 'h2') {
      styles.fontSize = '28px';
      styles.fontFamily = 'var(--skufont-demibold)';
    } else if (name === 'h5') {
      styles.fontSize = '20px';
      styles.fontFamily = 'var(--skufont-demibold)';
    } else {
      if (typeof fontSize !== 'undefined' && fontSize !== null) {
        styles.fontSize = fontSize;
      }
      if (typeof fontWeight !== 'undefined' && fontWeight !== null) {
        styles.fontWeight = fontWeight;
      }
    }
    return styles;
  };
};

const H1 = styled.h1<TypographyCommonProps>`&&& { ${createStyles('h1')} }`;
const H2 = styled.h2<TypographyCommonProps>`&&& { ${createStyles('h2')} }`;
const H5 = styled.h5<TypographyCommonProps>`&&& { ${createStyles('h5')} }`;

const Text = styled.p<TypographyCommonProps>`&&& { ${createStyles('p')} }`;
const Span = styled.span<TypographyCommonProps>`&&& { ${createStyles('span')} }`;

type ITypography = typeof Text & {
  H1: typeof H1,
  H2: typeof H2,
  H5: typeof H5,
  Text: typeof Text,
  Span: typeof Span,
}

// @ts-ignore
const Typography: ITypography = Text;

Typography.H1 = H1;
Typography.H2 = H2;
Typography.H5 = H5;
Typography.Text = Text;
Typography.Span = Span;

export {
  Typography,
};
