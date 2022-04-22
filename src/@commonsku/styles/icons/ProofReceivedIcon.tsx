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
          d="M4.005 9.153v-6.43c0-.4.325-.723.724-.723h14.468c.4 0 .724.324.724.723v6.49l.936-.663A.723.723 0 0 1 22 9.14v10.403A2.463 2.463 0 0 1 19.539 22H4.46A2.463 2.463 0 0 1 2 19.543V9.14a.723.723 0 0 1 1.14-.592l.865.605Zm-.557 1.375v9.015a1.011 1.011 0 0 0 1.013 1.012H19.54a1.015 1.015 0 0 0 1.013-1.012v-9.004l-8.068 5.718a.724.724 0 0 1-.834.003l-8.202-5.732Zm15.025-.288V3.445H5.453v6.72l6.61 4.619 6.41-4.544Z"
          fill={color}
        />
    </SVG>
}
