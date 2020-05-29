import React from "react"

export function InfoIcon({
  color="#2276A7", 
  width="13px", 
  mr,
  ml,
  mt
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  ml?:number,
  mt?:number
}>) {
  return (
    <svg
      viewBox="0 0 30 30"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "middle", marginRight: mr, marginTop: mt, marginLeft: ml }}
    >
      <path fill="none" d="M0 0h30v30H0z" />
      <circle
        cx={32.722}
        cy={31.031}
        r={15.159}
        fill={color}
        transform="translate(-17.378 -15.704) scale(.98948)"
      />
      <path
        d="M11.93 7.328c0 .392.085.757.225 1.093.14.337.336.617.617.87.252.251.588.476.98.616.393.168.814.252 1.234.252.477 0 .897-.084 1.261-.252.365-.14.701-.365.981-.617.253-.252.477-.532.617-.869.14-.336.224-.7.224-1.093 0-.392-.084-.757-.224-1.093a2.847 2.847 0 00-.617-.897 3.881 3.881 0 00-.98-.617 3.692 3.692 0 00-1.234-.224c-.448 0-.869.084-1.261.224-.393.168-.73.365-.981.617-.28.252-.477.56-.617.897-.14.336-.224.7-.224 1.093zm.281 17.8h5.578V11.391h-5.578v13.735z"
        fill="#fff"
        fillRule="nonzero"
      />
    </svg>
  )
}
