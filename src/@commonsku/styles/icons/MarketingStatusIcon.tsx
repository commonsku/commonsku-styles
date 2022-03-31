import React from 'react';
import {errors, primary1, secondary3 } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type MarketingStatusIconProps = SVGIconProps & {approved?: boolean};
export default function MarketingStatusIcon({
    color=primary1.main,
    size="medium",
    approved=false,
    ...props
}: MarketingStatusIconProps) {

    const finalPath = React.useMemo(() => {
        if (approved === true) {
           return <><path
           d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h8v-2H4V8l8 5 8-5v4h2V6c0-1.1-.9-2-2-2Zm-8 7L4 6h16l-8 5Z"
           fill={color}
         />
         <path
           d="m17.04 21.07-2.835-2.835a.997.997 0 1 1 1.41-1.41l1.415 1.415 3.535-3.535a1.004 1.004 0 1 1 1.42 1.42L17.04 21.07Z"
           fill={secondary3.main}
         /></>
        }
    // default to unselected
    return <><path
    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h9v-2H4V8l8 5 8-5v4h2V6c0-1.1-.9-2-2-2Zm-8 7L4 6h16l-8 5Z"
    fill={color}
    />
    <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.345 20.29a1.004 1.004 0 0 0 1.42 0l1.402-1.403 1.403 1.402a1.004 1.004 0 1 0 1.42-1.42l-1.403-1.402 1.398-1.398a1.004 1.004 0 1 0-1.42-1.42l-1.398 1.398-1.397-1.398a1.004 1.004 0 1 0-1.42 1.42l1.397 1.398-1.402 1.402a1.004 1.004 0 0 0 0 1.42Z"
        fill={errors.main}
    /></>
    }, [approved, color]);
      
    return <SVG size={size} {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        {finalPath}
    </SVG>;

}
