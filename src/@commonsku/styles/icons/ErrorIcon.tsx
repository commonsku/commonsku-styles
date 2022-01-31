import React from 'react';

export default function Icon({
    fill="#E52633",
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
            width={25}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            <rect
                x={0.979}
                y={0.791}
                width={23.042}
                height={22.419}
                rx={3}
                fill={fill}
            />
            <path
                d="M11.137 13.03h2.72l.56-7.44h-3.84l.56 7.44Zm-.4 2.32c0 .88.72 1.6 1.76 1.6s1.76-.72 1.76-1.6c0-.88-.72-1.6-1.76-1.6s-1.76.72-1.76 1.6Z"
                fill="#fff"
            />
        </svg>
    );
}
