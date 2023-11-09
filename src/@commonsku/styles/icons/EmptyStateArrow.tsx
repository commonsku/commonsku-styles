import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type EmptyStateArrowProps = SVGIconProps ;
export default function EmptyStateArrowIcon({
    direction="Up",
    altText="Arrow",
    ...props
}: EmptyStateArrowProps) {

    var d1: string | undefined, d2: string | undefined, x1: number | undefined, x2: number | undefined, y1: number | undefined, y2: number | undefined;
    var arrowColor = teal['30'];

    switch (direction) {
        case "down":
            d1="m9.239 20.009 2.704.784c.037.011.077.011.114 0l2.704-.784c.164-.048.304.114.207.24l-2.818 3.68a.196.196 0 0 1-.3 0l-2.818-3.68c-.097-.125.043-.288.207-.24Z"
            d2="M5.15 0c5.411 2.2 6.084 16.033 6.084 21h1.57c0-5.275 0-18.5 6.246-21H5.15Z"
            x1=12.636
            x2=12.636
            y1=19.98
            y2=0
            break;
        case "up":
            d1="m14.761 3.991-2.704-.784a.205.205 0 0 0-.114 0L9.24 3.99c-.164.048-.304-.115-.207-.24L11.85.07a.196.196 0 0 1 .3 0l2.818 3.68c.097.126-.043.288-.207.24Z"
            d2="M18.85 24c-5.411-2.2-6.084-16.033-6.084-21h-1.57c0 5.276 0 18.5-6.246 21h13.9Z"
            x1=11.364
            x2=11.364
            y1=4.02
            y2=24
            break;
        case "up-right":
            d1="m22.406 2.203-1.173-.394a.145.145 0 0 0-.092 0l-1.173.394c-.134.044-.247-.108-.169-.227l1.266-1.91a.146.146 0 0 1 .244 0l1.265 1.91c.079.119-.035.271-.168.227Z";
            d2="M6.389 23.515C16.608 15.176 21.225 7.772 21.657 1.721l-.877-.064c.357 2.992-8.819 10.581-19.247 15.372l4.856 6.486Z";
            x1=21.05
            x2=14.656
            y1=2.11
            y2=12.611
            break;
    };

    return <SVG height={500} width={500} viewBox="0 0 633 633" aria-labelledby="Arrow" {...props} >
        <path
          fill={arrowColor}
          d={d1}
        />
        <path
          fill="url(#a)"
          d={d2}
        />
        <defs>
          <linearGradient
            id="a"
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={arrowColor} />
            <stop offset={1} stopColor={arrowColor} stopOpacity={0} />
          </linearGradient>
        </defs>
    </SVG>
}




