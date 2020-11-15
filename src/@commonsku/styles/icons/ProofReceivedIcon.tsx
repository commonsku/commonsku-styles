import React from "react"

export function ProofReceivedIcon({
  color="#02C0DA", 
  width, 
  mr,
  mt
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number
}>) {
  return (
    <svg
    viewBox="0 0 195 195"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    fill={color}
    width={width}
    style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
    >
      <path fill="none" d="M.007.004h194.446V194.45H.007z" />
      <path
        d="M20.607 69.609V7.825A6.947 6.947 0 0127.551.881h138.795a6.947 6.947 0 016.945 6.944v62.367l8.978-6.372a6.956 6.956 0 017.21-.511 6.95 6.95 0 013.756 6.172v99.956a23.612 23.612 0 01-23.61 23.611H24.978a23.612 23.612 0 01-23.611-23.611V69.481a6.952 6.952 0 013.739-6.161 6.939 6.939 0 017.189.472l8.311 5.817zm-5.35 13.211v86.617a9.723 9.723 0 002.85 6.872 9.723 9.723 0 006.872 2.85h144.645a9.723 9.723 0 006.872-2.85 9.7 9.7 0 002.85-6.872V82.926l-77.4 54.944a6.94 6.94 0 01-8 .028L15.257 82.82zm144.145-2.767V14.77H34.496V79.33l63.406 44.384 61.5-43.662z"
        fill={color}
      />
    </svg>
  )
}

export default ProofReceivedIcon