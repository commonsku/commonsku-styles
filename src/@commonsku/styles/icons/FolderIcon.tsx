import React from 'react';
import colors from '../colors';

export default function Icon({
    width=22,
    height=19,
    fill=colors.primary1.main,
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
                d="m7.934 3 2.167 2.167h9.566V16H2.333V3h5.601Zm.9-2.167h-6.5A2.164 2.164 0 0 0 .176 3l-.01 13c0 1.192.975 2.167 2.166 2.167h17.334A2.173 2.173 0 0 0 21.833 16V5.167A2.173 2.173 0 0 0 19.667 3H11L8.833.833Z"
                fill={fill}
            />
        </svg>
    );
}
