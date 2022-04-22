import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { yellow } from '../colors';

type AwaitingProofIconProps = SVGIconProps;
export default function AwaitingProofIcon({
    color=yellow.main,
    size="medium",
    altText="Awaiting Proof",
    ...props
}: AwaitingProofIconProps) {
    return <SVG size={size} aria-labelledby="AwaitingProofIcon" {...props}>
        <title id="AwaitingProofIcon" >{altText}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.304 12.674s.014-.265.051-.405L5.69 3.581a.637.637 0 0 1 .615-.471h11.273c.284 0 .534.189.612.462 0 0 2.568 8.983 2.568 9.102v6.059a2.162 2.162 0 0 1-2.163 2.162H5.466a2.163 2.163 0 0 1-2.162-2.162v-6.059Zm16.182.636H16.35l-.03 1.994a.636.636 0 0 1-.635.627l-6.989.009a.636.636 0 0 1-.637-.636v-1.977c-.909.023-2.549.057-3.484.04v5.366c0 .491.398.89.89.89h13.13a.89.89 0 0 0 .89-.89V13.31Zm-.214-1.272-2.174-7.656H6.792L4.717 12.1c1.307.02 3.96-.062 3.96-.062a.637.637 0 0 1 .655.635v1.993l5.726-.008.03-1.994a.636.636 0 0 1 .636-.627h3.548Z"
          fill={color}
        />
    </SVG>
}
