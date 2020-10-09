import React from "react"

export function AwaitingProofIcon({
  color="#ffd302", 
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
            <g transform="translate(-4091.637 -2300.53) scale(5.53348)">
        <path fill="none" d="M739.432 415.747h35.14v35.14h-35.14z" />
        <clipPath id="prefix__a">
          <path d="M739.432 415.747h35.14v35.14h-35.14z" />
        </clipPath>
        <g clipPath="url(#prefix__a)">
          <path
            d="M739.825 434.62s.028-.524.102-.799l4.607-17.144c.148-.548.645-.93 1.213-.93h22.244c.562 0 1.055.373 1.208.913 0 0 5.066 17.724 5.066 17.96v11.955a4.267 4.267 0 01-4.267 4.267h-25.906a4.267 4.267 0 01-4.267-4.267V434.62zm31.93 1.255h-6.185l-.06 3.935a1.256 1.256 0 01-1.252 1.236l-13.79.018a1.254 1.254 0 01-1.257-1.255v-3.9c-1.794.043-5.03.11-6.876.078v10.588c0 .97.787 1.757 1.757 1.757h25.906c.971 0 1.757-.787 1.757-1.757v-10.7zm-.42-2.51l-4.291-15.108h-20.335l-4.094 15.232c2.577.039 7.814-.123 7.814-.123a1.257 1.257 0 011.292 1.254v3.933l11.299-.016.059-3.936c.01-.686.57-1.236 1.255-1.236h7z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  )
}

export default AwaitingProofIcon