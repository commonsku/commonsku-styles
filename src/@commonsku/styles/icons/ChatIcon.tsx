import React from "react"

export function ChatIcon({
  color="#000000", 
  width, 
  mr,
  mt,
  notifs
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number,
  notifs?:number
}>) {
  return (
      <svg
      viewBox="0 0 23 24"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
      >
      <path fill="none" d="M0 0h22.964v23.004H0z" />
      <path
        d="M22.541 8.754c0-4.643-3.77-8.41-8.41-8.41H8.573c-4.64 0-8.41 3.767-8.41 8.41a8.41 8.41 0 005.449 7.869l-1.564 3.142a1.998 1.998 0 00.626 2.512 1.998 1.998 0 002.578-.206l4.907-4.914h1.972c4.64 0 8.41-3.767 8.41-8.403zm-12.59 4.958a2.02 2.02 0 00-1.378-.553 4.409 4.409 0 01-4.41-4.405 4.414 4.414 0 014.41-4.411h5.558a4.414 4.414 0 014.41 4.411 4.409 4.409 0 01-4.41 4.405H11.33c-.517 0-1.009.2-1.379.553z"
        fill={color}
      />
      <path
        d="M20.538 8.7c0-3.503-2.872-6.35-6.407-6.35H8.573c-3.535 0-6.407 2.847-6.407 6.35 0 3.503 2.872 6.35 6.407 6.35l-2.731 5.443 5.488-5.444h2.8c3.536 0 6.408-2.846 6.408-6.349z"
        fill="#fff"
      />
      <text
        x={"50%"}
        y={"42%"}
        fontFamily="'Arial-BoldMT','Arial',sans-serif"
        fontWeight={700}
        fontSize={notifs && notifs > 99 ? 8 : 11}
        fill={color}
        dominant-baseline="middle"
        text-anchor="middle"
      >
        {notifs ? (notifs > 99 ? "99+" : notifs) : ""}
      </text>
      </svg>


  )
}

export default ChatIcon