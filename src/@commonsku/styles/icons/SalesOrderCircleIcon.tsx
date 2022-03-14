import React from 'react';
import { colors } from '../Theme';

export default function Icon({
    variant='primary',
    style={},
    ...props
}: React.PropsWithChildren<{
    variant?: 'primary' | 'primary-outline' | 'cta' | 'cta-outline',
    style?: React.CSSProperties,
}>) {
    const iconColors = React.useMemo(() => {
        if (variant === 'cta-outline') {
            return {
                width: 64,
                height: 64,
                viewBox: '0 0 74 74',
                fill: 'none',
                stroke: colors.secondary1.main,
                textColor: colors.secondary1.main,
            };
        } else if (variant === 'primary-outline') {
            return {
                width: 64,
                height: 64,
                viewBox: '0 0 74 74',
                fill: 'none',
                stroke: colors.primary1.main,
                textColor: colors.primary1.main,
            };
        } else if (variant === 'cta') {
            return {
                width: 74,
                height: 74,
                viewBox: '0 0 74 74',
                fill: colors.secondary1['20'],
                stroke: colors.secondary1['30'],
                textColor: colors.secondary1.main,
            };
        }
        return {
            width: 74,
            height: 74,
            viewBox: '0 0 74 74',
            fill: colors.primary1['20'],
            stroke: colors.primary1['30'],
            textColor: colors.primary1.main,
        };
    }, [variant]);

    return (
        <svg
            width={iconColors.width}
            height={iconColors.height}
            viewBox={iconColors.viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            {variant === 'primary' || variant === 'cta' ? <>
                <circle cx={32} cy={32} r={32} fill={iconColors.fill} />
                <path
                    d="M32 4.546c0-2.51 2.045-4.58 4.53-4.224a32 32 0 0 1 0 63.356c-2.485.355-4.53-1.713-4.53-4.224 0-2.51 2.055-4.5 4.516-4.995a22.91 22.91 0 0 0 0-44.918C34.055 9.046 32 7.056 32 4.546Z"
                    fill={iconColors.stroke}
                />
                <path
                    d="M22.376 34.67s1.19 1.54 3.64 1.54c2.17 0 3.57-1.4 3.57-2.94 0-3.57-5.04-2.52-5.04-4.48 0-.63.56-1.19 1.61-1.19 1.26 0 1.96.91 1.96.91l1.19-1.19s-1.05-1.33-3.15-1.33c-2.1 0-3.43 1.33-3.43 2.8 0 3.57 5.04 2.52 5.04 4.48 0 .7-.63 1.33-1.75 1.33-1.61 0-2.45-1.12-2.45-1.12l-1.19 1.19ZM32.6 31.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Z"
                    fill={iconColors.textColor}
                />
            </> : <>
                <path
                    d="M37 9.546c0-2.51 2.045-4.58 4.53-4.224a32 32 0 0 1 0 63.356c-2.485.355-4.53-1.713-4.53-4.224 0-2.51 2.055-4.5 4.516-4.995a22.91 22.91 0 0 0 0-44.918C39.055 14.046 37 12.056 37 9.546Z"
                    fill={iconColors.stroke}
                />
                <path
                    d="M27.376 39.67s1.19 1.54 3.64 1.54c2.17 0 3.57-1.4 3.57-2.94 0-3.57-5.04-2.52-5.04-4.48 0-.63.56-1.19 1.61-1.19 1.26 0 1.96.91 1.96.91l1.19-1.19s-1.05-1.33-3.15-1.33c-2.1 0-3.43 1.33-3.43 2.8 0 3.57 5.04 2.52 5.04 4.48 0 .7-.63 1.33-1.75 1.33-1.61 0-2.45-1.12-2.45-1.12l-1.19 1.19ZM37.6 36.1c0-1.96 1.47-3.43 3.43-3.43 1.96 0 3.43 1.47 3.43 3.43 0 1.96-1.47 3.43-3.43 3.43-1.96 0-3.43-1.47-3.43-3.43Zm-1.82 0c0 2.8 2.31 5.11 5.25 5.11s5.25-2.31 5.25-5.11c0-2.8-2.31-5.11-5.25-5.11s-5.25 2.31-5.25 5.11Z"
                    fill={iconColors.stroke}
                />
                <path
                    d="M36.5 72.5c19.35 0 35-15.915 35-35.5S55.85 1.5 36.5 1.5 1.5 17.415 1.5 37s15.65 35.5 35 35.5Z"
                    stroke={iconColors.textColor}
                    strokeWidth={3}
                />
            </>}
        </svg>
    );
}
