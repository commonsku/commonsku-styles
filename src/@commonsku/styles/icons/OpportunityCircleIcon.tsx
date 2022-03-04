import React from 'react';
import { colors } from '../Theme';
import SvgIcon, { SVGIconProps } from './SvgIcon';

type IconProps = React.PropsWithChildren<SVGIconProps & {
    variant?: 'primary' | 'primary-outline' | 'cta' | 'cta-outline',
    style?: React.CSSProperties,
}>;

export default function Icon({
    variant='primary',
    style={},
    size,
    ...props
}: IconProps) {
    const iconSizes = React.useMemo(() => {
        let baseSize = 74/3;
        if (['cta-outline', 'primary-outline'].includes(variant)) {
            baseSize = 64/3;
        }
        return {
            tiny: {
                width: baseSize,
                height: baseSize,
                viewBox: "0 0 74 74",
            },
            small: {
                width: baseSize*2,
                height: baseSize*2,
                viewBox: "0 0 74 74",
            },
            medium: {
                width: baseSize*3,
                height:baseSize*3,
                viewBox: "0 0 74 74",
            },
            large: {
                width: baseSize*4,
                height:baseSize*4,
                viewBox: "0 0 74 74",
            },
            huge: {
                width: baseSize*5,
                height:baseSize*5,
                viewBox: "0 0 74 74",
            },
            default: {
                height: baseSize*3,
                width: baseSize*3,
                viewBox: "0 0 74 74",
            },
        };
    }, [variant]);

    const iconColors = React.useMemo(() => {
        if (variant === 'cta-outline') {
            return {
                fill: 'none',
                stroke: colors.secondary1.main,
                textColor: colors.secondary1.main,
            };
        } else if (variant === 'primary-outline') {
            return {
                fill: 'none',
                stroke: colors.primary1.main,
                textColor: colors.primary1.main,
            };
        } else if (variant === 'cta') {
            return {
                fill: colors.secondary1['20'],
                stroke: 'none',
                textColor: colors.secondary1.main,
            };
        }
        return {
            fill: colors.primary1['20'],
            stroke: 'none',
            textColor: colors.primary1.main,
        };
    }, [variant]);

    return (
        <SvgIcon
            size={size}
            iconSizes={iconSizes}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            {variant === 'primary-outline' || variant === 'cta-outline' ? <>
                <path
                    d="M29.334 36.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Zm12.175 7.84h1.61v-3.92h.07s.63 1.12 2.24 1.12c1.61 0 3.08-1.47 3.08-3.57 0-2.1-1.47-3.57-3.08-3.57s-2.24 1.12-2.24 1.12h-.07v-.98h-1.61v9.8Zm3.5-4.41c-1.05 0-1.89-.84-1.89-1.96s.84-1.96 1.89-1.96c1.05 0 1.89.84 1.89 1.96s-.84 1.96-1.89 1.96Z"
                    fill={iconColors.textColor}
                />
                <path
                    d="M36.5 72.5c19.35 0 35-15.915 35-35.5S55.85 1.5 36.5 1.5 1.5 17.415 1.5 37s15.65 35.5 35 35.5Z"
                    stroke={iconColors.stroke}
                    strokeWidth={3}
                />
            </> : <>
                <circle cx={32} cy={32} r={32} fill={iconColors.fill} />
                <path
                    d="M24.334 31.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Zm12.175 7.84h1.61v-3.92h.07s.63 1.12 2.24 1.12c1.61 0 3.08-1.47 3.08-3.57 0-2.1-1.47-3.57-3.08-3.57s-2.24 1.12-2.24 1.12h-.07v-.98h-1.61v9.8Zm3.5-4.41c-1.05 0-1.89-.84-1.89-1.96s.84-1.96 1.89-1.96c1.05 0 1.89.84 1.89 1.96s-.84 1.96-1.89 1.96Z"
                    fill={iconColors.textColor}
                />
            </>}
        </SvgIcon>
    );
}
