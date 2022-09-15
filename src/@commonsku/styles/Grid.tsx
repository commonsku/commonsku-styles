import { parseResponsiveValue, ResponsiveValue } from '../utils/styled';
import React from 'react';
import styled, { CSSObject, FlattenSimpleInterpolation, SimpleInterpolation } from 'styled-components';
import { parseMeasurement, stripUnit } from '../utils';

type BaseGridProps = {
    columns?: number;
    gap?: number | string;
};
export type GridProps = React.HTMLAttributes<HTMLDivElement & BaseGridProps>;
export const Grid = styled.div<BaseGridProps>(
    p => {
        const params: CSSObject = {
            display: 'grid',
            gridTemplateColumns: `repeat(${p.columns || 12}, minmax(0px, 1fr))`,
        };
        if (p.gap) {
            params['gap'] = parseMeasurement(p.gap);
        }

        return params;
    },
);

type BaseGridItemProps = {
    colSpan?: ResponsiveValue<string | number | boolean>;
    style?: ResponsiveValue<CSSObject>;
};

export type GridItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & BaseGridItemProps;
export const GridItem = styled.div<BaseGridItemProps>(
    p => {
        let params: CSSObject = {gridColumn: 'auto'};
        const styles: (FlattenSimpleInterpolation | SimpleInterpolation | CSSObject)[] = [];
        if (p.colSpan) {
            const colStyles = parseResponsiveValue(
                p.colSpan,
                (v) => {
                    if (v === 'auto') {
                        return { gridColumn: 'auto' };
                    }
                    const colSpan = stripUnit(v);
                    return {gridColumn: `span ${colSpan} / span ${colSpan}`};
                }
            );
            if (Array.isArray(colStyles)) {
                colStyles.forEach(v => { styles.push(v) });
            } else {
                params = {
                    ...params,
                    ...colStyles,
                };
            }
        }
        return [...styles, params];
    },
);
