import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { white } from '../colors';

type NavSalesIconProps = SVGIconProps & {filled?: boolean};
export default function NavSalesIcon({
    color=white.main,
    size="medium",
    filled=false,
    altText="Sales",
    ...props
}: NavSalesIconProps) {
    const renderPath = filled ? 
      <>
         <rect x={1} y={12} width={6} height={9} rx={1} fill={color} />
         <rect x={9} y={3} width={6} height={18} rx={1} fill={color} />
         <rect x={17} y={9} width={6} height={12} rx={1} fill={color} />
      </>
    : 
      <>
        <mask id="nav-sales-icon-a" fill="#fff">
          <rect x={1} y={12} width={6} height={9} rx={1} />
        </mask>
        <rect
          x={1}
          y={12}
          width={6}
          height={9}
          rx={1}
          stroke={color}
          strokeWidth={4}
          mask="url(#nav-sales-icon-a)"
        />
        <mask id="nav-sales-icon-b" fill="#fff">
          <rect x={9} y={3} width={6} height={18} rx={1} />
        </mask>
        <rect
          x={9}
          y={3}
          width={6}
          height={18}
          rx={1}
          stroke={color}
          strokeWidth={4}
          mask="url(#nav-sales-icon-b)"
        />
        <mask id="nav-sales-icon-c" fill="#fff">
          <rect x={17} y={9} width={6} height={12} rx={1} />
        </mask>
        <rect
          x={17}
          y={9}
          width={6}
          height={12}
          rx={1}
          stroke={color}
          strokeWidth={4}
          mask="url(#nav-sales-icon-c)"
        />
      </>
    ;

    return <SVG size={size} fill="none" aria-labelledby="NavSalesIcon" {...props} >
        
        <title id="NavSalesIcon" >{altText}</title>
         {renderPath}
    </SVG>
}
