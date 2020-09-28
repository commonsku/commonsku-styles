export const buildMediaQuery = (breakpoint: string | number) =>
  `@media screen and (min-width: ${
    typeof breakpoint === "number" ? breakpoint + "px" : breakpoint
  })`;

export interface SizeType {
  [key: string]: any,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
}
export const sizeMeasurements: SizeType = {
  xs: 0,
  sm: 647,
  md: 768,
  lg: 1024,
  xl: 1280
};

export const sizes: Array<string> = Object.keys(sizeMeasurements);
export const media: { [key: string]: Function } = sizes.reduce((acc, s) => {
  const sizeQuery = buildMediaQuery(sizeMeasurements[s]);
  return {
    [s]: (styles: any) => `${sizeQuery} {${styles}}`,
    ...acc
  };
}, {});
