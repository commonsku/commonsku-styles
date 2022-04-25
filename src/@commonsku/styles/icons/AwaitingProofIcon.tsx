import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { yellow } from '../colors';

type AwaitingProofIconProps = SVGIconProps;
export default function AwaitingProofIcon({
    color=yellow[60],
    size="medium",
    altText="Awaiting Proof",
    ...props
}: AwaitingProofIconProps) {
    return <SVG size={size} aria-labelledby="AwaitingProofIcon" {...props}>
        <title id="AwaitingProofIcon" >{altText}</title>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.686 2.725A1 1 0 0 1 5.647 2h12.176a1 1 0 0 1 .946.675L22 12.09V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.883l2.686-9.392ZM6.4 4 4 12h5v3h6v-3h5l-2.89-8H6.4ZM20 14h-3v3H7v-3H4v6h16v-6Z"
            fill={color}
        />
    </SVG>
}
