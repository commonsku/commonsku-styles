import React from 'react';

export function UpArrowIcon({
  width = '100%',
  height = 15,
  viewBox = '0 0 292.362 292.362',
  fill = '#00889B',
  style = {},
  ...props
}: React.PropsWithChildren<{
    width?: number|string,
    height?: number|string,
    viewBox?: string,
    fill?: string,
    style?: object,
}>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={style}
      {...props}
    >
      <path style={{fill: fill}} d="M286.935 197.286L159.028 69.379c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.286C1.807 200.9 0 205.184 0 210.132s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.428 12.85 5.428h255.813c4.949 0 9.233-1.811 12.848-5.428 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.232-5.427-12.846z" />
    </svg>
  )
}

export default UpArrowIcon;
