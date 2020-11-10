import React from "react"

export function ColumnSelectIcon({
  width, 
  mr,
  mt
}: React.PropsWithChildren<{
  width?:string, 
  mr?:number,
  mt?:number
}>) {
  return (
    <svg
    viewBox="0 0 115 115"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    width={width}
  >
    <path fill="none" d="M0 0h115v115H0z" />
    <path
      d="M40.408 114.735V.578h71.117a3 3 0 013 3v108.157a3 3 0 01-3 3H40.408zm31.996-6V23.342H42.408v85.393h29.996zm36.12-85.393H78.53v85.393h29.996V23.342zM42.409 6.578v10.764h29.996V6.578H42.408zm36.12 0v10.764h29.98V6.578h-29.98z"
      fill="#02c0da"
    />
    <path
      fill="#e91b70"
      fillOpacity={0.25}
      d="M3.307 3.612H39.4V111.77H3.307z"
    />
    <path
      d="M.069 21.517c-.154-.361 0-.758 0-1.175V3.578a3 3 0 013-3h39.33v114.19H3.309c-1.657 0-3.24-1.342-3.24-3V21.518zm36.33 1.825H6.309v85.427H36.4V23.342z"
      fill="#e91b70"
    />
  </svg>
  )
}

export default ColumnSelectIcon