import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type BotIconProps = SVGIconProps;
export default function BotIcon({
    color=primary1.main,
    ...props
}: BotIconProps) {
    return <SVG {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M20 9.5v-2c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3s-3 1.34-3 3H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3Zm-2 10H6v-12h12v12Zm-9-6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5ZM8 15.5h8v2H8v-2Z"
            fill={color}
        />
    </SVG>
}


