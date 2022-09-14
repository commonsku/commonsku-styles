import React from 'react';
import { teal, neutrals } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type CheckboxIconProps = SVGIconProps & {
    selected?: boolean, 
    hover?: boolean, 
    hoverColor?: string,
    disabled?: boolean,
    disabledColor?: string,
    indeterminate?: boolean
};

export default function CheckboxIcon({
    color=teal.main,
    hoverColor=teal.light,
    disabledColor=neutrals['60'],
    size="medium",
    hover=false,
    selected=false,
    disabled=false,
    indeterminate=false,
    altText="Select",
    ...props
}: CheckboxIconProps) {

    selected ? altText="Unselect" : altText="Select";

    const renderPath = React.useMemo(() => {
        if (indeterminate) {
            return <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" fill={disabled ?  disabledColor : color} />
        } else if (selected) {
           return <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-8.29 13.29a.996.996 0 0 1-1.41 0L5.71 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.58 7.59Z" fill={disabled ?  disabledColor : color} />
        } else if (hover === true && !disabled ) {
            return<><path
                d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1Zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z"
                fill={color} />
                <rect x={6} y={6} width={12} height={12} rx={1} fill={hoverColor} /></>
        }
    // default to unselected
    return <path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1Zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z" fill={disabled ?  disabledColor : color} />
    }, [selected, hover, hoverColor, disabled, disabledColor, color]);
      
    return <SVG size={size} aria-labelledby="CheckboxIcon" {...props}>
        <title id="CheckboxIcon">{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        {renderPath}
    </SVG>;

}
