import React from 'react';
import {primary1 } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type RadioIconProps = SVGIconProps & { fill?: string; selected?: boolean};
export default function RadioIcon({
    fill=primary1.main,
    selected=false,
    ...props
}: RadioIconProps) {

    const selectPath = React.useMemo(() => {
        if (selected === true) {
           return <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z" fill={fill} /><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill={fill} /></>
        }
    // default to unselected
    return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z" fill={fill} />
    }, [selected, fill]);
      
    return <SVG {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        {selectPath}
    </SVG>;

}