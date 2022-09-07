import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CreditCardIcon = SVGIconProps;
export default function CreditCardIcon({
    color=teal.main,
    size="medium",
    altText="Credit Card",
    ...props
}: CreditCardIcon) {
    return <SVG size={size} aria-labelledby="CreditCardIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="CreditCardIcon" >{altText}</title>
        <path
            d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM18 14H2V8H18V14ZM18 4H2V2H18V4Z"
            fill={color}
        />
    </SVG>
}