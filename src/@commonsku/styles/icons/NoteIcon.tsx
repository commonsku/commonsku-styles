import React from "react"

export function NoteIcon({
  color="#000000", 
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
    viewBox="0 0 116 116"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    fill={color}
    width={width}
    style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
  >
    <path
      d="M79.65 1.119A3.5 3.5 0 0077.175.094H18.914A9.413 9.413 0 009.5 9.507V105.7a9.414 9.414 0 009.414 9.414H97.81c5.199 0 9.413-4.215 9.413-9.414V30.142a3.5 3.5 0 00-1.025-2.475L79.65 1.119zm-3.853 6.046l-.072-.071H18.914A2.413 2.413 0 0016.5 9.507V105.7a2.414 2.414 0 002.414 2.414H97.81a2.413 2.413 0 002.413-2.414V34.966H75.797V7.165z"
    />
  </svg>
  )
}

export default NoteIcon