import React from "react"

export function PinIcon({
  color="#000000", 
  width, 
  mr,
  mt,
  pinned
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number,
  pinned?:boolean
}>) {
  return (
      <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
    >
      <path d="M0 0h300v300H0z" fill="none" />
      { pinned ? <path d="M99.121 72.42l121.64 129.943h-55.974v47.414l-13.85 46.566-15.724-49.274v-44.706H45.86c3.953-28.506 17.238-53.626 36.291-71.411A53.561 53.561 0 0099.117 91.84c.003-6.41.004-13.21.004-19.42zM84.132 9.587A13.922 13.922 0 0194.377 5.09h111.246a13.922 13.922 0 0113.924 13.924v31.047h-.002c-10.309 0-18.666 8.357-18.666 18.665V91.84a53.565 53.565 0 0016.967 39.113c15.835 14.778 27.686 34.622 33.506 57.263L84.132 9.586z" fill={color} /> : <path d="M82.736 197.462l-67.37-67.37c24.474-18.512 53.43-27.436 81.206-26.48a57.116 57.116 0 0042.28-16.696c5.813-5.808 12.05-12.045 17.43-17.424 7.772-7.773 7.772-20.375 0-28.147l-.002-.002 23.41-23.409a14.849 14.849 0 0120.996 0l83.873 83.873a14.84 14.84 0 014.35 10.5 14.854 14.854 0 01-4.348 10.499l-23.41 23.409c-7.771-7.772-20.376-7.775-28.149-.003l-17.427 17.427a57.132 57.132 0 00-16.695 42.286c.962 27.777-7.965 56.73-26.476 81.206l-67.371-67.372-35.748 35.748-45.55 24.67 25.294-49.009 33.707-33.706z" fill={color} /> }
    </svg>
  )
}

export default PinIcon