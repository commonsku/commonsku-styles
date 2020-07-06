import React from "react"

export function LockIcon({
  color="#2276A7", 
  width="13px", 
  mr,
  ml,
  mt,
  locked
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  ml?:number,
  mt?:number,
  locked?:boolean
}>) {
  return (
    <svg
      viewBox="0 0 246 222"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "middle", marginRight: mr, marginTop: mt, marginLeft: ml}}
    >
      <path fill="none" d="M0 0h246v222H0z" />
      <path
        d="M177 113.355c0-4.884-3.964-8.849-8.848-8.849H9.85c-4.884 0-8.85 3.965-8.85 8.85v98.796C1 217.036 4.967 221 9.85 221h158.302c4.884 0 8.849-3.965 8.849-8.85v-98.796zm-93.386 57.996c-6.395-2.229-10.99-8.317-10.99-15.469 0-9.038 7.339-16.376 16.377-16.376 9.038 0 16.376 7.338 16.376 16.376 0 7.433-4.963 13.717-11.752 15.714v27.864H83.614V171.35z"
        fill={color}
      />
      <path
        style={{transform: locked ? "none" : "translate(261px, -41px) scaleX(-1)", transition: "all .2s"}}
        d="M27 114.506v-21C27 59.56 54.56 32 88.508 32c33.946 0 61.506 27.56 61.506 61.506v98h-28v-98C122.013 75.013 106.999 60 88.507 60S55 75.013 55 93.506v21H27z"
        fill={color}
      />
    </svg>
  )
}

export default LockIcon
