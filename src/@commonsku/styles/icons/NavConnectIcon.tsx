import React from "react"

export function NavConnectIcon({
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
      {outline ? <path
        d="M16.67 13.13C18.04 14.06 19 15.32 19 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2ZM9 13c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1Z"
        fill={color}
      /> : <path
        d="M16.67 13.13C18.04 14.06 19 15.32 19 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM9 13c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z"
        fill={color}
      />}
    </svg>
  );
}

export default NavConnectIcon