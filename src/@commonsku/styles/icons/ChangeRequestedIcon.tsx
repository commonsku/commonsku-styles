import React from "react"

export function ChangeRequestedIcon({
  color="#ff297c", 
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
      <path fill="none" d="M.014.011H194.46v194.446H.014z" />
      <path
        d="M87.13 97.478L5.796 16.145a6.948 6.948 0 010-9.823 6.948 6.948 0 019.822 0l81.334 81.334 81.334-81.334c2.705-2.71 7.105-2.71 9.816 0a6.948 6.948 0 010 9.823l-81.328 81.333 81.328 81.334a6.94 6.94 0 010 9.816c-2.71 2.711-7.11 2.711-9.816 0L96.952 107.3l-81.334 81.328a6.948 6.948 0 01-9.822 0 6.94 6.94 0 010-9.816L87.13 97.478z"
        fill={color}
      />
    </svg>
  )
}

export default ChangeRequestedIcon