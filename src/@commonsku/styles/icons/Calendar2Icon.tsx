import React from 'react';
import colors from '../colors';

type IconProps = React.PropsWithChildren<{
  width?: number|string,
  height?: number|string,
  fill?: string,
  style?: object,
}>;
const Icon = React.forwardRef(({
  width=18,
  height=20,
  fill = colors.primary1.main,
  style = {},
  ...props
}: IconProps, ref: React.Ref<SVGSVGElement>) => {
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 20 20`}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path
        d="M16 2h-1V1c0-.55-.45-1-1-1s-1 .45-1 1v1H5V1c0-.55-.45-1-1-1S3 .45 3 1v1H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-1 16H3c-.55 0-1-.45-1-1V7h14v10c0 .55-.45 1-1 1ZM5 9h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1Z"
        fill={fill}
      />
    </svg>
  )
});

export default Icon;
