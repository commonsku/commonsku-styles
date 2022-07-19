import React from 'react';
import { CSSObject, FlattenSimpleInterpolation, SimpleInterpolation } from 'styled-components';
import { sizes, sizeMedia, TSize } from './sizes';

export type ResponsiveValue<T = string | number> = T
  | Array<T | null>
  | {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
  };

export const isSizeObj = (val: any) => typeof val === 'object' && (
  val['xs'] || val['sm'] || val['md'] || val['lg'] || val['xl']
);

export const parseResponsiveValue = (
  value: ResponsiveValue<any>,
  transform: ((v: any) => any),
): (React.CSSProperties | CSSObject | (SimpleInterpolation | FlattenSimpleInterpolation)[]) => {
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
    return transform(value);
  } else if (Array.isArray(value)) {
    return value.map((v, i) => {
      if (i >= sizes.length) { return {}; }
      const size = sizes[i];
      if (v === null || v === undefined) { return {}; }
      return { [sizeMedia[size]]: transform(v) };
    }).reduce((acc, v) => ({ ...acc, ...v }), {});
  } else if (typeof value === 'object') {
    if (!isSizeObj(value)) {
      return value;
    }
    return Object.keys(value)
      .filter((k) => sizes.includes(k as TSize))
      .map((k) => ({ [sizeMedia[k]]: transform(value[k]) }))
      .reduce((acc, v) => ({ ...acc, ...v }), {})
  }

  return {};
};
