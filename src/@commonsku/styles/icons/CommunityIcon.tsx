import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CommunityIconProps = SVGIconProps;
export default function CommunityIcon({
    size="medium",
    altText="Community",
    color=teal.main,
    ...props
}: CommunityIconProps) {
    return <SVG size={size} aria-labelledby="CommunityIcon" {...props}>
        <title id="CommunityIcon" >{altText}</title>
        <g fill={color} clipPath="url(#a)">
            <path d="M12.102 6.478a3.242 3.242 0 0 0 3.245-3.24A3.242 3.242 0 0 0 12.102 0a3.242 3.242 0 0 0-3.246 3.239 3.242 3.242 0 0 0 3.246 3.239Z" />
            <path
              fillRule="evenodd"
              d="M16.331 10.23c0-1.304-1.938-2.361-4.328-2.361-2.39 0-4.328 1.057-4.328 2.36h8.656Z"
              clipRule="evenodd"
            />
            <path d="M19.577 20.248a3.243 3.243 0 0 0 3.246-3.239 3.242 3.242 0 0 0-3.246-3.239 3.242 3.242 0 0 0-3.246 3.24 3.242 3.242 0 0 0 3.246 3.238Z" />
            <path
              fillRule="evenodd"
              d="M23.807 24c0-1.304-1.938-2.36-4.328-2.36-2.39 0-4.328 1.056-4.328 2.36h8.656Z"
              clipRule="evenodd"
            />
            <path d="M4.626 20.248a3.242 3.242 0 0 0 3.246-3.239 3.242 3.242 0 0 0-3.246-3.239 3.242 3.242 0 0 0-3.246 3.24 3.242 3.242 0 0 0 3.246 3.238Z" />
            <path
              fillRule="evenodd"
              d="M8.856 24c0-1.304-1.938-2.36-4.328-2.36C2.138 21.64.2 22.695.2 24h8.656Z"
              clipRule="evenodd"
            />
        </g>
    </SVG>
}