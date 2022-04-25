import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CheckboxIconProps = SVGIconProps;
export default function CheckboxIcon({
    color=teal.main,
    size="medium",
    altText="Unchecked Checkbox",
    ...props
}: CheckboxIconProps) {
    return <SVG size={size} aria-labelledby="CheckboxIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="CheckboxIcon" >{altText}</title>
        <path
            d="M17.583.75H2.417A2.173 2.173 0 0 0 .25 2.917v15.166c0 1.192.975 2.167 2.167 2.167h15.166a2.173 2.173 0 0 0 2.167-2.167V2.917A2.173 2.173 0 0 0 17.583.75Zm0 17.333H2.417V2.917h15.166v15.166ZM16.49 7.25l-1.527-1.538-7.14 7.139-2.795-2.784-1.538 1.527 4.334 4.323 8.666-8.667Z"
            fill={color}
        />
    </SVG>
}
