import React from "react"

export function PanelIcon({
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
    viewBox="0 0 56 56"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    fill={color}
    width={width}
    style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
  >
    <g transform="matrix(.82383 0 0 .74487 -1.154 1.892)">
      <path fill="none" d="M1.401-2.54h67.975v75.181H1.401z" />
      <clipPath id="prefix__a">
        <path d="M1.401-2.54h67.975v75.181H1.401z" />
      </clipPath>
      <g clipPath="url(#prefix__a)">
        <path d="M38.49-2.542H20.932c-6.094 0-11.033 5.464-11.033 12.202v51.153c0 6.738 4.94 12.202 11.033 12.202H38.49c2.01 0 3.642-1.805 3.642-4.027 0-2.224-1.632-4.028-3.642-4.028H20.932c-2.07 0-3.75-1.857-3.75-4.147V9.66c0-2.29 1.68-4.147 3.75-4.147H38.49c2.01 0 3.642-1.804 3.642-4.027 0-2.222-1.632-4.028-3.642-4.028zm-9.609 38.58c-.032-1.085.333-2.161 1.048-2.963l8.924-10.006c1.412-1.582 3.72-1.598 5.15-.038 1.432 1.56 1.448 4.113.036 5.696l-2.81 3.15h17.603c2.01 0 3.642 1.804 3.642 4.027s-1.632 4.028-3.642 4.028H40.928l3.057 3.48c1.401 1.594 1.367 4.146-.074 5.696-1.442 1.549-3.75 1.511-5.149-.082L29.91 38.947c-.712-.808-1.053-1.863-1.029-2.909z" />
      </g>
    </g>
  </svg>
  )
}

export default PanelIcon