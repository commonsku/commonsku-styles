import React from "react"

export function NavFinanceIcon({
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
      viewBox="0 0 180 180"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
    >
      <path fill="none" d="M0 0h180v180H0z" />
      <path
        d="M62.118 118.457s12.666 12.336 29.115 12.336c8.882 0 16.944-4.605 16.944-14.146 0-19.738-55.599-17.765-55.599-53.13 0-16.943 12.665-30.102 30.924-33.063V14.992h14.146v15.133c19.082 1.645 28.95 12.008 28.95 12.008l-9.21 17.272s-11.186-10.2-25.827-10.2c-9.869 0-17.6 5.758-17.6 13.983 0 19.574 55.434 16.12 55.434 52.966 0 16.778-11.678 31.09-31.747 33.72v15.134H83.502v-15.134c-21.22-2.467-32.899-15.461-32.899-15.461l11.515-15.956z"

        fill={color}
      />
    </svg>
  )
}

export default NavFinanceIcon;