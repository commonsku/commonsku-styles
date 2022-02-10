import React from 'react';

export default function Icon({
    width=22,
    height=16,
    fill="#fff",
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
                d="M15.67 9.13C17.04 10.06 18 11.32 18 13v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM14 8c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM8 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2ZM8 9c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Zm6 5H2v-.99C2.2 12.29 5.3 11 8 11s5.8 1.29 6 2v1Z"
                fill={fill}
            />
        </svg>
    );
}
