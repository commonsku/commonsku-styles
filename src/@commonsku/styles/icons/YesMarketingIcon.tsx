import React from "react"

export function YesMarketingIcon({
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
      <path d="M1.99 10.731h27.756l.096.003.008.001a1.246 1.246 0 01.977.604l.003.006c.105.177.168.382.174.6V30.956a1.25 1.25 0 01-1.25 1.25H1.984a1.25 1.25 0 01-1.25-1.25v-19.01c.007-.219.069-.423.174-.6l.004-.007a1.24 1.24 0 01.456-.445c.154-.088.329-.144.515-.159h.009c.033-.003.066-.004.099-.004zm1.244 4.243v14.732h25.27V15.004L16.852 26.686a1.25 1.25 0 01-1.764.006L3.234 14.974zm23.508-1.743H5.027L15.96 24.04l10.78-10.808z" />
      <path
        d="M24.223 7.134l5.519-6.45a1.25 1.25 0 011.9 1.625l-6.429 7.514a1.247 1.247 0 01-1.864.04l-3.864-4.144a1.25 1.25 0 011.829-1.704l2.91 3.12z"
        fill="#00d76f"
      />
    </svg>
  )
}

export default YesMarketingIcon