import React from "react"

export function NavSalesIcon({
  color="#000000", 
  width, 
  mr,
  mt,
  style,
  ...props
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number,
  pinned?:boolean,
  style?: React.CSSProperties,
}>) {
  return (
      <svg
      viewBox="0 0 180 180"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt, ...style }}
      {...props}
    >
      <path fill="none" d="M0 0h180v180H0z" />
      <path
        d="M162.381 43.007c-14.21 6.232-33.594 12.154-48.42 12.914l18.373 8.997-38.41 37.12-20.643-22.363-53.962 48.38a5.124 5.124 0 006.84 7.629l46.443-41.637 20.903 22.645 45.951-44.406 8.367 18.675C149.09 76.169 155.67 57 162.381 43.007"
        fill={color}
      />
    </svg>
  )
}

export default NavSalesIcon