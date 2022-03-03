import React from 'react';
import colors from '../colors';

export default function Icon({
    width=20,
    height=23,
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
                d="M18.125 2.292 16.5.667l-1.625 1.625L13.25.667l-1.625 1.625L10 .667 8.375 2.292 6.75.667 5.125 2.292 3.5.667v15.166H.25v3.25a3.246 3.246 0 0 0 3.25 3.25h13a3.246 3.246 0 0 0 3.25-3.25V.667l-1.625 1.625ZM13.25 20.167H3.5a1.087 1.087 0 0 1-1.083-1.084V18H13.25v2.167Zm4.333-1.084c0 .596-.487 1.084-1.083 1.084a1.087 1.087 0 0 1-1.083-1.084v-3.25h-9.75V3.917h11.916v15.166Z"
                fill={fill}
            />
            <path
                d="M13.25 6.083h-6.5V8.25h6.5V6.083ZM16.5 6.083h-2.167V8.25H16.5V6.083ZM13.25 9.333h-6.5V11.5h6.5V9.333ZM16.5 9.333h-2.167V11.5H16.5V9.333Z"
                fill={fill}
            />
        </svg>
    );
}
