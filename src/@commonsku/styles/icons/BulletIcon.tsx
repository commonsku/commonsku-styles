import React from 'react';
import { themeOptions } from '../Theme';

export default function Icon({
    width=13,
    height=14,
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
            <circle cx={6.5} cy={7} r={6.5} fill={fill} />
        </svg>
    );
}
