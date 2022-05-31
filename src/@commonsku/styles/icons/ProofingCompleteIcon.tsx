import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { green } from '../colors';

type ProofingCompleteIconProps = SVGIconProps;
export default function ProofingCompleteIcon({
    color=green.main,
    size="medium",
    altText="Proofing Complete",
    ...props
}: ProofingCompleteIconProps) {
    return <SVG size={size} aria-labelledby="ProofingCompleteIcon" {...props}>
        <title id="ProofingCompleteIcon" >{altText}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.322 5.712a.983.983 0 0 1 0 1.378L6.588 18l-3.91-3.974a.983.983 0 0 1 1.401-1.378l2.51 2.55 9.332-9.486a.983.983 0 0 1 1.401 0ZM21.338 10.714a.972.972 0 0 1 0 1.358L15.56 18l-2.898-2.973a.973.973 0 0 1 1.393-1.357l1.505 1.544 4.386-4.5a.973.973 0 0 1 1.392 0Z"
          fill={color}
        />
    </SVG>
}
