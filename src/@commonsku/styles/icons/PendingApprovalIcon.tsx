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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.94 18.31h-.69A2.25 2.25 0 0 1 3 16.06V6.25A2.25 2.25 0 0 1 5.25 4h13.526a2.25 2.25 0 0 1 2.25 2.25v9.81a2.25 2.25 0 0 1-2.25 2.25h-8.71l-2.962 3.459a.662.662 0 0 1-1.164-.43V18.31Zm1.324 1.238 1.995-2.33a.663.663 0 0 1 .503-.231h9.014a.926.926 0 0 0 .927-.927V6.25a.926.926 0 0 0-.927-.927H5.25a.929.929 0 0 0-.927.927v9.81a.927.927 0 0 0 .927.927h1.352c.365 0 .662.296.662.661v1.9Zm.4-10.096a1.514 1.514 0 1 1-.002 3.027 1.514 1.514 0 0 1 .001-3.027Zm4.35 0a1.514 1.514 0 1 1-.002 3.027 1.514 1.514 0 0 1 .001-3.027Zm4.349 0a1.514 1.514 0 1 1-.001 3.027 1.514 1.514 0 0 1 .001-3.027Z"
          fill={color}
        />
    </SVG>
}
