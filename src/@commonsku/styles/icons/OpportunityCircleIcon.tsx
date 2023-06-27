import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal, pink } from '../colors';

type IconVariants = 'primary' | 'cta';

type OpportunityCircleIconProps = SVGIconProps &{variant?: IconVariants, selected?: boolean};
export default function OpportunityCircleIcon({
    variant="primary",
    selected=false,
    size,
    altText="Opportunity",
    style={},
    ...props
}: OpportunityCircleIconProps) {

    const iconSizes = {
            tiny: {
                width: 24,
                height: 24,
                viewBox: "0 0 72 72",
            },
            small: {
                width: 40,
                height: 40,
                viewBox: "0 0 72 72",
            },
            medium: {
                width: 72,
                height:72,
                viewBox: "0 0 72 72",
            },
            large: {
                width: 96,
                height: 96,
                viewBox: "0 0 72 72",
            },
            huge: {
                width: 120,
                height: 120,
                viewBox: "0 0 72 72",
            },
            default: {
                height: 72,
                width: 72,
                viewBox: "0 0 72 72",
            },
        };

    const iconColors = React.useMemo(() => {
        if (variant === 'cta' && selected) {
            return {
                fill: 'none',
                stroke: pink.main,
                textColor: pink.main,
            };
        } else if (variant === 'primary' && selected) {
            return {
                fill: 'none',
                stroke: teal.main,
                textColor: teal.main,
            };
        } else if (variant === 'cta' && selected === false ) {
            return {
                fill: pink['20'],
                stroke: pink['30'],
                textColor: pink.main,
            };
        }
        return {
            fill: teal['20'],
            stroke: teal['30'],
            textColor: teal.main,
        };
    }, [variant, selected]);
    

    return <SVG 
            fill="none"
            style={style}
            {...props}
            size = {size}
            aria-labelledby="OpportunityCircleIcon"
            iconSizes={iconSizes}
            >
                <title id="OpportunityCircleIcon" >{altText}</title>
                {selected ? <>
                        <path
                            d="M28.334 35.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Zm12.175 7.84h1.61v-3.92h.07s.63 1.12 2.24 1.12c1.61 0 3.08-1.47 3.08-3.57 0-2.1-1.47-3.57-3.08-3.57s-2.24 1.12-2.24 1.12h-.07v-.98h-1.61v9.8Zm3.5-4.41c-1.05 0-1.89-.84-1.89-1.96s.84-1.96 1.89-1.96c1.05 0 1.89.84 1.89 1.96s-.84 1.96-1.89 1.96Z"
                            fill={iconColors.textColor}
                        />
                        <circle cx={36} cy={36} r={34} stroke={iconColors.stroke} strokeWidth={4} />
                    </> : <>
                        <circle cx={36} cy={36} r={32} fill={iconColors.fill} />
                        <path
                            d="M28.334 35.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Zm12.175 7.84h1.61v-3.92h.07s.63 1.12 2.24 1.12c1.61 0 3.08-1.47 3.08-3.57 0-2.1-1.47-3.57-3.08-3.57s-2.24 1.12-2.24 1.12h-.07v-.98h-1.61v9.8Zm3.5-4.41c-1.05 0-1.89-.84-1.89-1.96s.84-1.96 1.89-1.96c1.05 0 1.89.84 1.89 1.96s-.84 1.96-1.89 1.96Z"
                            fill={iconColors.textColor}
                        />
                        
                    </>}
    </SVG>
}
