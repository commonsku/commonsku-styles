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
          d="M4.119 9.16V2.804c0-.395.32-.715.714-.715h14.276c.394 0 .714.32.714.715v6.414l.924-.655a.715.715 0 0 1 1.128.582v10.281a2.428 2.428 0 0 1-2.429 2.429H4.568a2.428 2.428 0 0 1-2.428-2.429V9.147a.715.715 0 0 1 1.124-.586l.855.598Zm-.55 1.358v8.91a1 1 0 0 0 1 1h14.877a1 1 0 0 0 1-1v-8.899l-7.961 5.651a.714.714 0 0 1-.823.003l-8.094-5.665Zm14.826-.284V3.519H5.547v6.64l6.522 4.566 6.326-4.491Z"
          fill={color}
        />
    </SVG>
}
