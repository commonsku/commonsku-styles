import React from 'react';
import { colors } from '../Theme';

export default function Icon({
    width=24,
    height=24,
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
                d="M20 4v12H8V4h12Zm0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8.5 9.67 1.69 2.26 2.48-3.1L19 15H9l2.5-3.33ZM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2Z"
                fill={fill}
            />
        </svg>
    );
}
