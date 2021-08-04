import React from "react"

export function TrashIcon({
  color="#000000", 
  width, 
  mr,
  mt
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number,
  pinned?:boolean
}>) {
  return (
      <svg
      viewBox="0 0 35 35"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
    >
      <path fill="none" d="M0 0h35v35H0z" />
      <path
        d="M11.177 8.093H7.45c-.117 0-.23.016-.336.046H4.274a1.25 1.25 0 000 2.5H6.2v17.274a3.835 3.835 0 003.834 3.835h15.24a3.835 3.835 0 003.835-3.835V10.639h1.622a1.25 1.25 0 000-2.5h-2.536a1.245 1.245 0 00-.336-.046h-3.89V5.636a2.647 2.647 0 00-2.648-2.648h-7.496a2.648 2.648 0 00-2.65 2.648v2.457zm15.433 2.546v17.274c0 .738-.598 1.335-1.335 1.335h-15.24A1.334 1.334 0 018.7 27.913V10.639H26.61zM14.012 25.927V14.894a1.25 1.25 0 00-2.5 0v11.033a1.251 1.251 0 002.5 0zm5 0V14.894a1.25 1.25 0 00-2.5 0v11.033a1.251 1.251 0 002.5 0zm5 0V14.894a1.25 1.25 0 00-2.5 0v11.033a1.251 1.251 0 002.5 0zM21.47 8.093V5.636a.148.148 0 00-.148-.148h-7.496a.149.149 0 00-.15.148v2.457h7.794z"
        fill="#00d76f"
      />
    </svg>
  )
}

export default TrashIcon