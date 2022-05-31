import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ProofReceivedIconProps = SVGIconProps;
export default function ProofReceivedIcon({
    color=teal[60],
    size="medium",
    altText="Proof Received",
    ...props
}: ProofReceivedIconProps) {
    return <SVG size={size} aria-labelledby="ProofReceivedIcon" {...props}>
        <title id="ProofReceivedIcon" >{altText}</title>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6.333l.445-.297A1 1 0 0 1 22 9.87V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.869a1 1 0 0 1 1.555-.833L4 9.333V3Zm0 8.737V20h16v-8.263l-6.89 4.594a2 2 0 0 1-2.22 0L4 11.737Zm14-1.07V4H6v6.667l6 4 6-4Z"
            fill={color}
        />
    </SVG>
}
