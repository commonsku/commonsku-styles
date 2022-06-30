import React from 'react';
import styled, { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';
import { parseMeasurement, stripUnit } from '../utils';
import { media } from '../utils/sizes';

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
    colSpan?: number | string;
    xs?: boolean | number | string;
    sm?: boolean | number | string;
    md?: boolean | number | string;
    lg?: boolean | number | string;
    xl?: boolean | number | string;

    smStyle?: CSSObject | string;
    mdStyle?: CSSObject | string;
    lgStyle?: CSSObject | string;
    xlStyle?: CSSObject | string;
};
export type GridItemProps = React.HTMLAttributes<HTMLDivElement & BaseGridItemProps>;
export const GridItem = styled.div<BaseGridItemProps>(
    p => {
        const params: CSSObject = {gridColumn: 'auto'};
        const keys = [
            'sm', 'md', 'lg', 'xl',
            'smStyle', 'mdStyle', 'lgStyle', 'xlStyle',
        ];
        const styles = Object.keys(p)
            .filter(k => keys.includes(k))
            .reduce((acc: FlattenSimpleInterpolation[], k) => {
                const mediaStyles: CSSObject = (p[`${k}Style`] as CSSObject | undefined) || {};
                const val = p[k];
                if (typeof val !== 'undefined' && typeof val !== 'boolean') {
                    const colspan = stripUnit(val);
                    mediaStyles['gridColumn'] = `span ${colspan} / span ${colspan}`;
                } else if (val === false) {
                    mediaStyles['display'] = 'none';
                }

                return [...acc, css`${media[k](mediaStyles)}`];
            }, []);

        if (p.colSpan && p.colSpan !== 'auto') {
            const colSpan = stripUnit(p.colSpan);
            params['gridColumn'] = `span ${colSpan} / span ${colSpan}`;
        }
        if (typeof p.xs !== 'undefined' && typeof p.xs !== 'boolean') {
            const colspan = stripUnit(p.xs);
            params['gridColumn'] = `span ${colspan} / span ${colspan}`;
        } else if (p.xs === false) {
            params['display'] = 'none';
        }
        return [...styles, params];
    },
);
