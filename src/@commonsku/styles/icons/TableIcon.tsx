import React from 'react';

export function TableIcon({
  width = '100%',
  height = '100%',
  viewBox = '0 0 21 16',
  fill = '#5ca3b6',
  style = {},
  ...props
}: React.PropsWithChildren<{
    width?: number|string,
    height?: number|string,
    viewBox?: string,
    fill?: string,
    style?: object,
}>) {
  return (
    <svg 
      width={width} 
      height={height}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      xmlSpace="preserve" 
      style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2, ...style}}
      {...props}>
      <rect id="Artboard1" x={0} y={0} width="20.568" height="15.753" style={{fill: 'none'}} />
      <g>
        <clipPath id="_clip1">
          <path d="M13.718,4.877l6.147,0l0,3.224l-6.147,0.162l0,-3.386Z" />
        </clipPath>
        <g clipPath="url(#_clip1)">
          <rect x="6.034" y="-1.571" width="21.514" height="16.282" style={{fill: '#bf3f69', stroke: '#5ca3b6', strokeWidth: '0.24px'}} />
        </g>
        <path d="M20.349,0.548l0,15l-20,0l0,-15l20,0Zm-18,11.243l0,1.757l5,0l0,-1.831l-5,0.074Zm11,1.757l0,-1.919l-5,0.073l0,1.846l5,0Zm1,-1.934l0,1.934l4,0l0,-1.993l-4,0.059Zm-12,-2.823l0,2l5,-0.074l0,-2l-5,0.074Zm6,-0.089l0,2l5,-0.073l0,-2l-5,0.073Zm10,-0.147l-4,0.059l0,2l4,-0.059l0,-2Zm-16,-2.764l0,2l5,-0.074l0,-2l-5,0.074Zm6,-0.089l0,2l5,-0.073l0,-2l-5,0.073Zm10,-0.147l-4,0.059l0,2l4,-0.059l0,-2Zm-11,-3.007l-5,0l0,2.243l5,-0.074l0,-2.169Zm6,0l-5,0l0,2.154l5,-0.073l0,-2.081Zm5,2.007l0,-2.007l-4,0l0,2.066l4,-0.059Z" 
          style={{fill: fill}} />
      </g>
    </svg>
  );
}

export default TableIcon;
