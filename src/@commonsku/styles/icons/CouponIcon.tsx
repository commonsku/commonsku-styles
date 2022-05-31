import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CouponIconProps = SVGIconProps;
export default function CouponIcon({
    color=teal.main,
    size="medium",
    altText="Coupon",
    ...props
}: CouponIconProps) {
    return <SVG size={size} aria-labelledby="CouponIcon" {...props}>
        <title id="CouponIcon" >{altText}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 6a1 1 0 0 0-1 1v.468a4.5 4.5 0 0 1 0 8.064V16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4Zm-3 8a2.5 2.5 0 0 0 0-5V7a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-2Zm13 1 2.857-5 .65-1.138L18 8h-2l-2.857 5-.65 1.139L12 15h2Zm3-1.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12.5 9a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm0 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9 8H8v1h1V8Zm-1 3h1v1H8v-1Zm1 3H8v1h1v-1Z"
          fill={color}
        />
    </SVG>
}
