// import React from "react"

// export function ProofingCompleteIcon({
//   color="#00d374", 
//   width, 
//   mr,
//   mt
// }: React.PropsWithChildren<{
//   color?:string, 
//   width?:string, 
//   mr?:number,
//   mt?:number
// }>) {
//   return (
//     <svg
//     viewBox="0 0 195 195"
//     fillRule="evenodd"
//     clipRule="evenodd"
//     strokeLinejoin="round"
//     strokeMiterlimit={2}
//     fill={color}
//     width={width}
//     style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
//     >
//       <path fill="none" d="M-.02-.008h194.445v194.445H-.02z" />
//       <path
//         d="M59.568 139.655l98.898-96.307a6.945 6.945 0 119.688 9.955L64.176 154.556a6.986 6.986 0 01-5.017 1.971 6.95 6.95 0 01-4.906-2.206L11.85 108.848c-2.615-2.803-2.458-7.207.345-9.821 2.803-2.607 7.2-2.458 9.814.345l37.559 40.283zM132.18 142.572l40.903-39.833a6.947 6.947 0 019.82.132c2.673 2.743 2.614 7.146-.129 9.82l-45.99 44.78a6.942 6.942 0 01-9.924-.24l-18.752-20.11a6.945 6.945 0 0110.16-9.472l13.913 14.923z"
//         fill={color}
//       />
//     </svg>
//   )
// }

// export default ProofingCompleteIcon



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
          d="M8.129 16.365 18.301 6.46a.715.715 0 0 1 .997 1.023L8.603 17.898a.715.715 0 0 1-1.02-.024L3.22 13.197a.715.715 0 0 1 1.045-.975l3.863 4.143ZM15.598 16.665l4.207-4.097a.715.715 0 0 1 .997 1.024l-4.73 4.606a.713.713 0 0 1-1.021-.025l-1.93-2.068a.714.714 0 0 1 1.046-.975l1.43 1.535Z"
          fill={color}
        />
    </SVG>
}
