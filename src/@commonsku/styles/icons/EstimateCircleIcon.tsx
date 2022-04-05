import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal, pink } from '../colors';

type IconVariants = 'primary' | 'cta';

type EstimateCircleIconProps = SVGIconProps &{variant?: IconVariants, selected?: boolean};
export default function EstimateCircleIcon({
    variant="primary",
    selected=false,
    size,
    altText="Estimate order stage",
    style={},
    ...props
}: EstimateCircleIconProps) {

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
            aria-labelledby="EstimateCircleIcon"
            iconSizes={iconSizes}
            >
                <title id="EstimateCircleIcon">{altText}</title>
                {selected ? <>
                        <path
                            d="M36 10.262c0-2.354 1.917-4.293 4.247-3.96a30 30 0 0 1 25.45 25.45c.334 2.33-1.605 4.248-3.959 4.248-2.353 0-4.219-1.926-4.683-4.234a21.476 21.476 0 0 0-16.821-16.821C37.926 14.48 36 12.615 36 10.262Z"
                            fill={iconColors.stroke}
                        />
                        <circle cx={36} cy={36} r={34} stroke={iconColors.stroke} strokeWidth={4} />
                        <path
                            d="M32.743 40h7.21v-1.68h-5.46V35.8h4.2v-1.68h-4.2v-2.24h5.32V30.2h-7.07V40Z"
                            fill={iconColors.textColor}
                        />
                    </> : <>
                        
                        <circle cx={36} cy={36} r={32} fill={iconColors.fill} />
                        <path
                            d="M36 10.262c0-2.354 1.917-4.293 4.247-3.96a30 30 0 0 1 25.45 25.45c.334 2.33-1.605 4.248-3.959 4.248-2.353 0-4.219-1.926-4.683-4.234a21.476 21.476 0 0 0-16.821-16.821C37.926 14.48 36 12.615 36 10.262Z"
                            fill={iconColors.stroke}
                        />
                        <path
                            d="M32.743 40h7.21v-1.68h-5.46V35.8h4.2v-1.68h-4.2v-2.24h5.32V30.2h-7.07V40Z"
                            fill={iconColors.textColor}
                        />
                        
                    </>}
    </SVG>
}