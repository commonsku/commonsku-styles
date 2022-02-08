import React from 'react';
import { themeOptions } from '../Theme';

export default function Icon({
    width=19,
    height=16,
    fill=themeOptions.colors.errors.main,
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
            <path d="M9 15.5.34.5h17.32L9 15.5Z" fill={fill} />
        </svg>
    );
}
