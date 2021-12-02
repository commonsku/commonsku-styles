import React from "react"
import styled from "styled-components"

export function NavManagementIcon({
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
        d="M89.082 90.27l-13.038 24.108-24.311-25.294-.541-.541c-11.77 14.567-19.975 35.614-22.293 59.597-.01.095-.02.19-.028.286-.683 7.222 3.015 13.676 7.783 13.676h106.608c4.82 0 8.566-6.526 7.868-13.825l-.014-.137c-2.313-23.925-10.483-44.93-22.208-59.492l-24.73 25.73-13.042-24.115c10.605-.327 20.062-5.216 26.473-12.772a36.043 36.043 0 008.585-23.401c0-19.99-16.204-36.192-36.193-36.192-19.988 0-36.192 16.203-36.192 36.192a36.05 36.05 0 008.31 23.076c.092.11.186.22.28.329C68.853 85.1 78.391 90.004 89.082 90.27z"

        fill={color}
      />
    </svg>
  )
}

export default NavManagementIcon