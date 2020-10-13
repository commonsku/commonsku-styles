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
    viewBox="0 0 35 35"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    fill={color}
    width={width}
    style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
    >
      <path
        d="M.59 18.811s.027-.516.1-.787L5.23 1.13c.146-.54.636-.917 1.196-.917h21.92c.553 0 1.039.367 1.19.9 0 0 4.992 17.466 4.992 17.698v11.78a4.204 4.204 0 01-4.204 4.205H4.795A4.205 4.205 0 01.59 30.592v-11.78zm31.465 1.237H25.96l-.059 3.877a1.237 1.237 0 01-1.234 1.218l-13.59.018a1.236 1.236 0 01-1.238-1.237v-3.843c-1.768.043-4.957.11-6.775.077v10.434c0 .955.775 1.731 1.731 1.731h25.529c.956 0 1.731-.776 1.731-1.731V20.048zm-.414-2.473L27.412 2.687H7.374l-4.035 15.01c2.54.038 7.7-.121 7.7-.121a1.239 1.239 0 011.273 1.235v3.876l11.135-.016.058-3.878a1.236 1.236 0 011.237-1.218h6.899z"
        fill="#ffca00"
      />
    </svg>
  )
}

export default AwaitingProofIcon