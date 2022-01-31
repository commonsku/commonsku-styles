import React from 'react';

export default function Icon({
    width=35,
    height=34,
    fill='#01D374',
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
                d="M17.5.333C8.3.333.833 7.8.833 17c0 9.2 7.467 16.667 16.667 16.667 9.2 0 16.667-7.467 16.667-16.667C34.167 7.8 26.7.333 17.5.333Zm0 30C10.15 30.333 4.167 24.35 4.167 17c0-7.35 5.983-13.333 13.333-13.333 7.35 0 13.333 5.983 13.333 13.333 0 7.35-5.983 13.333-13.333 13.333Zm7.65-20.7L14.167 20.617l-4.317-4.3-2.35 2.35 6.667 6.666L27.5 12l-2.35-2.367Z"
                fill={fill}
            />
        </svg>
    );
}
