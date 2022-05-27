import React from 'react';
import { teal, neutrals } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type RadioIconProps = SVGIconProps & {
    selected?: boolean, 
    hover?: boolean, 
    disabled?: boolean,
    disabledColor?: string
};

export default function RadioIcon({
    color=teal.main,
    disabledColor=neutrals['70'],
    size="medium",
    hover=false,
    selected=false,
    disabled=false,
    altText="Select",
    ...props
}: RadioIconProps) {

    selected ? altText="Unselect" : altText="Select";

    const renderPath = React.useMemo(() => {
        if (selected === true) {
           return <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z" fill={disabled ?  disabledColor : color} /><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill={disabled ?  disabledColor : color} /></>
        } else if (hover === true && !disabled ) {
            return<><path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"
                fill={color} />
                <circle cx={12} cy={12} r={7} fill={teal.light} /></>
        }
    // default to unselected
    return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z" fill={disabled ?  disabledColor : color} />
    }, [selected, hover, disabled, disabledColor, color]);
      
    return <SVG size={size} aria-labelledby="RadioIcon" {...props}>
        <title id="RadioIcon">{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        {renderPath}
    </SVG>;

}
