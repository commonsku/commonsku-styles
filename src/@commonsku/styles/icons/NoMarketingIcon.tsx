import React from "react"

export function NoMarketingIcon({
  color="00b2ff", 
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
    viewBox="0 0 35 35"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    width={width}
    style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
  >
    <path fill="none" d="M-.004-.002h35v35h-35z" />
    <path
      d="M1.99 10.731h27.755l.096.003.008.001a1.246 1.246 0 01.977.604l.003.006c.105.177.168.382.174.6V30.956a1.25 1.25 0 01-1.25 1.25H1.983a1.25 1.25 0 01-1.25-1.25V11.968l.001-.022c.006-.219.068-.423.173-.6l.004-.007a1.24 1.24 0 01.456-.445c.154-.088.33-.144.515-.159h.01c.032-.003.065-.004.098-.004zm1.243 4.243v14.732h25.27V15.004L16.851 26.686a1.25 1.25 0 01-1.764.006L3.233 14.974zm23.508-1.743H5.026L15.96 24.04l10.781-10.808z"
      fill={color}
    />
    <path
      d="M22.759 10.233L15.883 4.06a1.5 1.5 0 012.004-2.232l7.117 6.39 7.117-6.39a1.5 1.5 0 012.004 2.232l-6.876 6.174 6.876 6.175a1.5 1.5 0 01-2.004 2.232l-7.117-6.39-7.117 6.39a1.5 1.5 0 01-2.004-2.232l6.876-6.175z"
      fill="#d70064"
    />
  </svg>
  )
}

export default NoMarketingIcon