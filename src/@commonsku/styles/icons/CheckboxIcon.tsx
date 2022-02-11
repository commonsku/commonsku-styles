import React from 'react';
import colors from '../colors';

export default function Icon({
    width=20,
    height=21,
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
                d="M17.583.75H2.417A2.173 2.173 0 0 0 .25 2.917v15.166c0 1.192.975 2.167 2.167 2.167h15.166a2.173 2.173 0 0 0 2.167-2.167V2.917A2.173 2.173 0 0 0 17.583.75Zm0 17.333H2.417V2.917h15.166v15.166ZM16.49 7.25l-1.527-1.538-7.14 7.139-2.795-2.784-1.538 1.527 4.334 4.323 8.666-8.667Z"
                fill={fill}
            />
        </svg>
    );
}
