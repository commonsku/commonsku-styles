import React from 'react';

export default function Icon({
    width=10,
    height=20,
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
                d="M5.3 8.839c-2.27-.623-3-1.267-3-2.27 0-1.15 1.01-1.952 2.7-1.952 1.42 0 2.13.57 2.39 1.477.12.423.45.74.87.74h.3c.66 0 1.13-.687.9-1.341-.42-1.246-1.4-2.28-2.96-2.681v-.729C6.5 1.207 5.83.5 5 .5s-1.5.707-1.5 1.583v.697C1.56 3.223 0 4.553 0 6.59c0 2.439 1.91 3.653 4.7 4.36 2.5.633 3 1.562 3 2.544 0 .728-.49 1.89-2.7 1.89-1.65 0-2.5-.623-2.83-1.51-.15-.412-.49-.707-.9-.707H.99c-.67 0-1.14.717-.89 1.372.57 1.467 1.9 2.333 3.4 2.67v.708c0 .876.67 1.583 1.5 1.583s1.5-.707 1.5-1.583v-.686c1.95-.391 3.5-1.584 3.5-3.748 0-2.997-2.43-4.021-4.7-4.644Z"
                fill={fill}
            />
        </svg>
    );
}
