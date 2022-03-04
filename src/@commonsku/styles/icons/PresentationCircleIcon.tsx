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
                width: 74,
                height: 74,
                fill: 'none',
                stroke: colors.secondary1.main,
                textColor: colors.secondary1.main,
            };
        } else if (variant === 'primary-outline') {
            return {
                width: 74,
                height: 74,
                fill: 'none',
                stroke: colors.primary1.main,
                textColor: colors.primary1.main,
            };
        } else if (variant === 'cta') {
            return {
                width: 64,
                height: 64,
                fill: colors.secondary1['20'],
                stroke: colors.secondary1['30'],
                textColor: colors.secondary1.main,
            };
        }
        return {
            width: 64,
            height: 64,
            fill: colors.primary1['20'],
            stroke: colors.primary1['30'],
            textColor: colors.primary1.main,
        };
    }, [variant]);

    return (
        <svg
            width={iconColors.width}
            height={iconColors.height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            {variant === 'primary' || variant === 'cta' ? <>
                <circle cx={32} cy={32} r={32} fill={iconColors.fill} />
                <path
                    d="M32 4.546c0-2.51 2.045-4.58 4.53-4.224.857.123 1.709.28 2.553.472 2.448.555 3.62 3.218 2.723 5.563l-.13.338c-.825 2.158-3.243 3.197-5.516 2.777C33.888 9.052 32 7.218 32 4.908v-.362Z"
                    fill={iconColors.stroke}
                />
                <path
                    d="M28.675 36h1.75v-3.36h2.31c1.96 0 3.36-1.4 3.36-3.22 0-1.82-1.4-3.22-3.36-3.22h-4.06V36Zm1.75-4.97v-3.22h2.24c.91 0 1.61.7 1.61 1.61 0 .91-.7 1.61-1.61 1.61h-2.24Z"
                    fill={iconColors.textColor}
                />
            </> : <>
                <path
                    d="M36.5 72.5c19.35 0 35-15.915 35-35.5S55.85 1.5 36.5 1.5 1.5 17.415 1.5 37s15.65 35.5 35 35.5Z"
                    stroke={iconColors.stroke}
                    strokeWidth={3}
                />
                <path
                    d="M37 9.546c0-2.51 2.045-4.58 4.53-4.224.857.123 1.709.28 2.553.472 2.448.555 3.62 3.218 2.723 5.563l-.13.338c-.825 2.158-3.243 3.197-5.516 2.777-2.272-.42-4.16-2.254-4.16-4.564v-.362ZM33.675 41h1.75v-3.36h2.31c1.96 0 3.36-1.4 3.36-3.22 0-1.82-1.4-3.22-3.36-3.22h-4.06V41Zm1.75-4.97v-3.22h2.24c.91 0 1.61.7 1.61 1.61 0 .91-.7 1.61-1.61 1.61h-2.24Z"
                    fill={iconColors.textColor}
                />
            </>}
        </svg>
    );
}
