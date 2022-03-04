import React from 'react';

export default function Icon({
    width=24,
    height=24,
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
                d="M18.791 11.005H7.621l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41l-4.88-4.88h11.17c.55 0 1-.45 1-1s-.45-1-1-1Z"
                fill={fill}
            />
        </svg>
    );
}
