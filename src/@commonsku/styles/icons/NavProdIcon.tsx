import React from "react"

export function NavProdIcon({
  color="#000000", 
  width, 
  mr,
  mt,
  style,
  ...props
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number,
  pinned?:boolean,
  style?: React.CSSProperties,
}>) {
  return (
      <svg
      viewBox="0 0 180 180"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt, ...style }}
      {...props}
    >
      <path fill="none" d="M0 0h180v180H0z" />
      <path
        d="M124.649 78.96h-46.03V65.335h46.03c3.747 0 6.812 3.066 6.812 6.813s-3.065 6.812-6.812 6.812m6.812 25.625c0 3.746-3.065 6.812-6.812 6.812h-46.03V97.772h46.03c3.747 0 6.812 3.065 6.812 6.813m0 32.364c0 3.747-3.065 6.812-6.812 6.812h-46.03v-13.624h46.03c3.747 0 6.812 3.065 6.812 6.812M61.275 79.81a7.662 7.662 0 11.002-15.322 7.662 7.662 0 01-.002 15.322m0 32.437a7.662 7.662 0 11.001-15.323 7.662 7.662 0 01-.001 15.323m0 31.913a7.661 7.661 0 110-15.322 7.661 7.661 0 010 15.322M90 26.862a7.662 7.662 0 11-.002 15.322A7.662 7.662 0 0190 26.862m38.802 15.514h-7.661v-6.409c0-.75-.613-1.363-1.363-1.363-7.62 0-14.375-3.704-18.563-9.411-2.613-3.561-6.798-5.625-11.215-5.625s-8.604 2.064-11.216 5.625C74.596 30.9 67.84 34.604 60.22 34.604c-.75 0-1.363.613-1.363 1.363v6.41h-7.66c-5.47 0-9.904 4.433-9.904 9.902v98.248c0 5.47 4.434 9.904 9.904 9.904h77.605c5.47 0 9.904-4.434 9.904-9.904V52.28c0-5.469-4.434-9.903-9.904-9.903"

        fill={color}
      />
    </svg>
  )
}

export default NavProdIcon