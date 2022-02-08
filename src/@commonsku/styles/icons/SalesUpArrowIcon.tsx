import React from 'react';
import { themeOptions } from '../Theme';

export default function Icon({
    width=19,
    height=16,
    fill=themeOptions.colors.secondary3['60'],
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
            <path d="m9.5.5 8.66 15H.84L9.5.5Z" fill={fill} />
        </svg>
    );
}
