import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type TagIconProps = SVGIconProps;
export default function TagIcon({
    color=teal.main,
    size="medium",
    altText="Tag",
    ...props
}: TagIconProps) {

    return <SVG size={size} aria-labelledby="TagIcon" {...props} >
      <path
        fill={color}
        d="M17.13 5.84c-.36-.51-.96-.84-1.63-.84l-11 .01c-1.1 0-2 .89-2 1.99v10c0 1.1.9 1.99 2 1.99l11 .01c.67 0 1.27-.33 1.63-.84L21.5 12l-4.37-6.16ZM15.5 17h-11V7h11l3.55 5-3.55 5Z"
      />
    </SVG>
}

