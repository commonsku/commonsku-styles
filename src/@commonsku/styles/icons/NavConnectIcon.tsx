import React from "react"

export function NavConnectIcon({
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
        d="M99.53 103.144H30.762c-10.782 0-19.605 8.822-19.605 19.605 0 9.944 7.505 18.213 17.129 19.442.706 1.155 5.036 8.91-2.248 14.87 0 0 11.194-4.702 16.353-14.707H99.53c10.782 0 19.605-8.823 19.605-19.605 0-10.783-8.823-19.605-19.605-19.605zm42.487-80.21H38.463c-19.973 0-36.316 16.343-36.316 36.316 0 19.974 16.343 36.316 36.316 36.316h91.308c10.926 14.742 31.977 16.093 31.977 16.093-10.79-3.966-10.476-13.812-9.958-17.449 15.265-4.296 26.543-18.37 26.543-34.96 0-19.973-16.341-36.316-36.316-36.316z"
        fill={color}
      />
    </svg>
  )
}

export default NavConnectIcon