import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type PendingApprovalIconProps = SVGIconProps;
export default function PendingApprovalIcon({
    color=teal[60],
    size="medium",
    altText="Pending Approval",
    ...props
}: PendingApprovalIconProps) {
    return <SVG size={size} aria-labelledby="PendingApprovalIcon" {...props}>
        <title id="PendingApprovalIcon" >{altText}</title>
        <path
          d="M4 17.17 5.17 16H20V4H4v13.17ZM4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-4 4V4c0-1.1.9-2 2-2Z"
          fill={color}
        />
        <circle cx={7} cy={10} r={1} fill={color} />
        <circle cx={12} cy={10} r={1} fill={color} />
        <circle cx={17} cy={10} r={1} fill={color} />
    </SVG>
}
