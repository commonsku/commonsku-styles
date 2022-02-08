import React from 'react';
import { themeOptions } from '../Theme';

export default function Icon({
    width=24,
    height=24,
    fill=themeOptions.colors.primary1.main,
    style={},
    ...props
}: React.PropsWithChildren<{
    width?: number|string,
    height?: number|string,
    fill?: string,
    style?: React.CSSProperties,
}>) {
    return (
        <svg
            width={width}
            height={height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            <path
                d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z"
                fill={fill}
            />
        </svg>
    );
}
