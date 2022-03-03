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
            <g clipPath="url(#arrow_right-a)">
                <path
                    d="M5.709 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41l4.87 4.89H5.709c-.55 0-1 .45-1 1s.45 1 1 1Z"
                    fill={fill}
                />
            </g>
            <defs>
            <clipPath id="arrow_right-a">
                <path fill={fill} transform="translate(.5)" d="M0 0h24v24H0z" />
            </clipPath>
            </defs>
        </svg>
    );
}
