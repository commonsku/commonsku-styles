import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type MergeIconProps = SVGIconProps;
export default function MergeIcon({
    color=teal.main,
    size="medium",
    altText="Merge",
    ...props
}: MergeIconProps) {

    return <SVG size={size} aria-labelledby="MergeIcon" {...props} >
      <path
        fill={color}
        d="m17 20.455 1.41-1.41-3.41-3.41-1.41 1.41 3.41 3.41ZM7.5 8.045H11v5.59l-5.41 5.41L7 20.455l6-6v-6.41h3.5l-4.5-4.5-4.5 4.5Z"
      />
    </SVG>
}

