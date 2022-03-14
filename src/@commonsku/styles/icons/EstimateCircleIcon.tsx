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
                    d="M32 4.546c0-2.51 2.045-4.58 4.53-4.224A32 32 0 0 1 63.678 27.47c.355 2.485-1.713 4.53-4.224 4.53-2.51 0-4.5-2.055-4.995-4.516A22.911 22.911 0 0 0 36.516 9.541C34.055 9.046 32 7.056 32 4.546Z"
                    fill={iconColors.stroke}
                />
                <path
                    d="M28.743 36h7.21v-1.68h-5.46V31.8h4.2v-1.68h-4.2v-2.24h5.32V26.2h-7.07V36Z"
                    fill={iconColors.textColor}
                />
            </> : <>
                <path
                    d="M37 9.546c0-2.51 2.045-4.58 4.53-4.224A32 32 0 0 1 68.678 32.47C69.033 34.955 66.965 37 64.454 37c-2.51 0-4.5-2.055-4.995-4.516a22.911 22.911 0 0 0-17.943-17.943C39.055 14.046 37 12.056 37 9.546Z"
                    fill={iconColors.stroke}
                />
                <path
                    d="M36.5 72.5c19.35 0 35-15.915 35-35.5S55.85 1.5 36.5 1.5 1.5 17.415 1.5 37s15.65 35.5 35 35.5Z"
                    stroke={iconColors.stroke}
                    strokeWidth={3}
                />
                <path
                    d="M33.743 41h7.21v-1.68h-5.46V36.8h4.2v-1.68h-4.2v-2.24h5.32V31.2h-7.07V41Z"
                    fill={iconColors.textColor}
                />
            </>}
        </svg>
    );
}
