import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1, secondary1 } from '../colors';

type IconVariants = 'primary' | 'cta';

type PresentationCircleIconProps = SVGIconProps &{variant?: IconVariants, selected?: boolean};
export default function PresentationCircleIcon({
    variant="primary",
    selected=false,
    size,
    style={},
    ...props
}: PresentationCircleIconProps) {

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
                stroke: secondary1.main,
                textColor: secondary1.main,
            };
        } else if (variant === 'primary' && selected) {
            return {
                fill: 'none',
                stroke: primary1.main,
                textColor: primary1.main,
            };
        } else if (variant === 'cta' && selected === false ) {
            return {
                fill: secondary1['20'],
                stroke: secondary1['30'],
                textColor: secondary1.main,
            };
        }
        return {
            fill: primary1['20'],
            stroke: primary1['30'],
            textColor: primary1.main,
        };
    }, [variant, selected]);
    

    return <SVG 
            fill="none"
            style={style}
            {...props}
            size = {size}
            iconSizes={iconSizes}
            >
         {selected ? <>
                <circle cx={36} cy={36} r={34} stroke={iconColors.stroke} strokeWidth={4} />
                <path
                    d="M36 10.262c0-2.354 1.917-4.293 4.247-3.96.804.115 1.602.263 2.393.442 2.296.521 3.394 3.017 2.553 5.216l-.121.317c-.774 2.023-3.041 2.997-5.172 2.603-2.13-.393-3.9-2.113-3.9-4.279v-.34ZM32.675 40h1.75v-3.36h2.31c1.96 0 3.36-1.4 3.36-3.22 0-1.82-1.4-3.22-3.36-3.22h-4.06V40Zm1.75-4.97v-3.22h2.24c.91 0 1.61.7 1.61 1.61 0 .91-.7 1.61-1.61 1.61h-2.24Z"
                    fill={iconColors.textColor}
                />
            </> 
            : 
            <>    
            <circle cx={36} cy={36} r={32} fill={iconColors.fill} />
            <path
                d="M36 10.262c0-2.354 1.917-4.293 4.247-3.96.804.115 1.602.263 2.393.442 2.296.521 3.394 3.017 2.553 5.216l-.121.317c-.774 2.023-3.041 2.997-5.172 2.603-2.13-.393-3.9-2.113-3.9-4.279v-.34Z"
                fill={iconColors.stroke}
            />
            <path
                d="M32.675 40h1.75v-3.36h2.31c1.96 0 3.36-1.4 3.36-3.22 0-1.82-1.4-3.22-3.36-3.22h-4.06V40Zm1.75-4.97v-3.22h2.24c.91 0 1.61.7 1.61 1.61 0 .91-.7 1.61-1.61 1.61h-2.24Z"
                fill={iconColors.textColor}
            />  
            </>}
    </SVG>
}