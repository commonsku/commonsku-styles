import React from 'react';
import SVG, { iconSize, SVGProps } from '../SvgIcon';

type UserIconProps = SVGProps & { fill?: string;};

export default function UserIcon({
    fill="#fff",
    ...props
}: UserIconProps) {
    return <SVG viewBox={props.size ? iconSize[props.size].viewBox : null} {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z"
      fill={fill}
    />

    </SVG>
}