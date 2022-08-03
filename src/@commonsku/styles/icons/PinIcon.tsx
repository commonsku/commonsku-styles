import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type PinIconProps = SVGIconProps & {filled?: boolean, pinned?: boolean; unpin?: boolean;};
export default function PinIcon({
    color=teal.main,
    size="medium",
    filled=false,
    unpin=false,
    pinned,
    altText,
    ...props
}: PinIconProps) {
 

    let renderPath;
    
    if(unpin) {
      altText = altText ? altText : "Unpin";

      renderPath = 
        filled ? 
          <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m21.313 2.658-1.288-1.53-2.038 1.714a.792.792 0 0 0-.002-.016L16.59 4h.02l-.61.514v-.018L5 13.75v.018L3 15.45l1.288 1.53L7.83 14h3.139v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V7.127l5.313-4.469ZM7 2h8.86L8 8.613V4H7c-.55 0-1-.45-1-1s.45-1 1-1Z"
            fill={color}
          />
          </> 
        : 
          <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m21.313 2.658-1.288-1.53-2.038 1.714a.792.792 0 0 0-.002-.016L16.59 4h.02l-.61.514v-.018L14 6.18v.017L9.966 9.59l.002-.02L5 13.75v.018L3 15.45l1.288 1.53L7.83 14h3.139v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V7.127l5.313-4.469ZM14 8.81 10.208 12H15c-.63-.84-1-1.88-1-3v-.19Z"
            fill={color}
          />
          <path
            d="M7 2h8.86l-2.377 2H10v2.93L8 8.613V4H7c-.55 0-1-.45-1-1s.45-1 1-1Z"
            fill={color}
          />
          </>
        ;
    } else {
      altText = altText ? altText : "Pin";

      renderPath = 
      filled ? 
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3Z"
          fill={color}
        /> 
      :
        <path
          d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4h4Zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1Z"
          fill={color}
        />
        ;
    };


    return <SVG size={size} aria-labelledby="PinIcon" {...props}>
        
        <title id="PinIcon" >{altText}</title>
         {renderPath}
    </SVG>
}
