import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1, secondary1 } from '../colors';

type IconVariants = 'primary' | 'cta';

type SalesOrderCircleIconProps = SVGIconProps &{variant?: IconVariants, selected?: boolean};
export default function SalesOrderCircleIcon({
    variant="primary",
    selected=false,
    size,
    style={},
    ...props
}: SalesOrderCircleIconProps) {

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
                <path
                    d="M36 10.262c0-2.354 1.918-4.293 4.248-3.96a30 30 0 0 1 0 59.396c-2.33.333-4.248-1.606-4.248-3.96 0-2.353 1.926-4.219 4.234-4.683a21.477 21.477 0 0 0 0-42.11C37.926 14.48 36 12.615 36 10.262Z"
                    fill={iconColors.stroke}
                />
                <circle cx={36} cy={36} r={34} stroke={iconColors.stroke} strokeWidth={4} />
                <path
                    d="M26.376 38.67s1.19 1.54 3.64 1.54c2.17 0 3.57-1.4 3.57-2.94 0-3.57-5.04-2.52-5.04-4.48 0-.63.56-1.19 1.61-1.19 1.26 0 1.96.91 1.96.91l1.19-1.19s-1.05-1.33-3.15-1.33c-2.1 0-3.43 1.33-3.43 2.8 0 3.57 5.04 2.52 5.04 4.48 0 .7-.63 1.33-1.75 1.33-1.61 0-2.45-1.12-2.45-1.12l-1.19 1.19ZM36.6 35.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Z"
                    fill={iconColors.textColor}
                />
            </> 
            : 
            <>    
            <circle cx={36} cy={36} r={32} fill={iconColors.fill}/>
            <path
                d="M36 10.262c0-2.354 1.918-4.293 4.248-3.96a30 30 0 0 1 0 59.396c-2.33.333-4.248-1.606-4.248-3.96 0-2.353 1.926-4.219 4.234-4.683a21.477 21.477 0 0 0 0-42.11C37.926 14.48 36 12.615 36 10.262Z"
                fill={iconColors.stroke}
            />
            <path
                d="M26.376 38.67s1.19 1.54 3.64 1.54c2.17 0 3.57-1.4 3.57-2.94 0-3.57-5.04-2.52-5.04-4.48 0-.63.56-1.19 1.61-1.19 1.26 0 1.96.91 1.96.91l1.19-1.19s-1.05-1.33-3.15-1.33c-2.1 0-3.43 1.33-3.43 2.8 0 3.57 5.04 2.52 5.04 4.48 0 .7-.63 1.33-1.75 1.33-1.61 0-2.45-1.12-2.45-1.12l-1.19 1.19ZM36.6 35.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Z"
                fill={iconColors.textColor}
            /> 
            </>}
    </SVG>
}