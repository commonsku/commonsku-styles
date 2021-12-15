import React from "react"

export function NextPrevIcon ({
  color="#000000", 
  width, 
  mr,
  mt,
  style,
  next,
  ...props
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number,
  next?:boolean,
  style?: React.CSSProperties,
}>) {
  return (
      <svg
      viewBox="0 0 19 35"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt, ...style }}
      {...props}
    >
      <path fill="none" d="M-.004 0h18.17v35H-.003z" />
      <path
        d={next ? "M6.43 1.653l9.776 14.796c.318.495.33 1.137.012 1.637l-9.776 15.24c-.452.698-1.381.901-2.078.454a1.497 1.497 0 01-.452-2.073l9.251-14.419-9.239-13.98a1.49 1.49 0 01.428-2.079 1.502 1.502 0 012.078.424z" : "M12.128 1.653L2.352 16.45a1.526 1.526 0 00-.012 1.637l9.776 15.24c.452.698 1.381.901 2.078.454a1.497 1.497 0 00.452-2.073L5.395 17.288l9.239-13.98a1.49 1.49 0 00-.428-2.079 1.502 1.502 0 00-2.078.424z"}
        fill={color}
      />
    </svg>
  )
}

export default NextPrevIcon;