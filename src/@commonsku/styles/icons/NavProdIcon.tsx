import React from "react"

export function NavProdIcon({
  width=24,
  style={},
  fill="none",
  color="#fff",
  outline=true, // outline/completely filled in
  ...props
}: React.PropsWithChildren<{
  fill?: string,
  color?: string,
  width?: number,
  outline?: boolean,
  style?: React.CSSProperties,
}>) {
  return (
    <svg
      fill={fill}
      width={width}
      height={width}
      style={style}
      {...props}
    >
      {outline ? <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H4V5h16v14Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.701 11.127a1.003 1.003 0 0 0-1.418-1.42L14.82 12.17l-.705-.71a.997.997 0 0 0-1.415 1.405L14.82 15l3.881-3.873Z"
          fill={color}
        />
        <path
          d="M10 8a1 1 0 0 0-1-1H6a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1ZM10 12a1 1 0 0 0-1-1H6a1 1 0 1 0 0 2h3a1 1 0 0 0 1-1ZM10 16a1 1 0 0 0-1-1H6a1 1 0 1 0 0 2h3a1 1 0 0 0 1-1Z"
          fill={color}
        />
      </> : <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM9 17H6c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1s-.45 1-1 1Zm0-4H6c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1s-.45 1-1 1Zm0-4H6c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1s-.45 1-1 1Zm9.7 2.12-3.17 3.17c-.39.39-1.03.39-1.42 0l-1.41-1.42a.996.996 0 1 1 1.41-1.41l.71.71 2.47-2.47a.996.996 0 0 1 1.41 0l.01.01c.38.39.38 1.03-.01 1.41Z"
        fill={color}
      />}
    </svg>
  )
}

export default NavProdIcon