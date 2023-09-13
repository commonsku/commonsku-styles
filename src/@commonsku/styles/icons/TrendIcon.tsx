import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { errors, green, neutrals } from '../colors';

type TrendDirections = 'up' | 'down' | 'flat';
type TrendProps = SVGIconProps & {direction?: TrendDirections;};
export default function TrendIcon({
    size="medium",
    direction="up",
    altText="Trend Direction",
    ...props
}: TrendProps) {

    return <SVG size={size} aria-labelledby="Trend" {...props} >
        <title id="Trend" >{altText}</title>
        {
            {
                'up': <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill={green['60']}/>,
                'down': <path d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z" fill={errors['60']}/>,
                'flat': <path d="M21.5 12L17.5 8V11H2.5V13H17.5V16L21.5 12Z" fill={neutrals['60']}/>
            }[direction]
        }
    </SVG>
}

