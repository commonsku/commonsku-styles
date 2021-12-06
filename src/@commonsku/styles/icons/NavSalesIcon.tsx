import React from "react"

export function NavSalesIcon({
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
        <mask id="nav-sales-icon-a" fill={color}>
          <rect x={1} y={12} width={6} height={9} rx={1} />
        </mask>
        <rect
          x={1}
          y={12}
          width={6}
          height={9}
          rx={1}
          stroke={color}
          strokeWidth={4}
          mask="url(#nav-sales-icon-a)"
        />
        <mask id="nav-sales-icon-b" fill={color}>
          <rect x={9} y={3} width={6} height={18} rx={1} />
        </mask>
        <rect
          x={9}
          y={3}
          width={6}
          height={18}
          rx={1}
          stroke={color}
          strokeWidth={4}
          mask="url(#nav-sales-icon-b)"
        />
        <mask id="nav-sales-icon-c" fill={color}>
          <rect x={17} y={9} width={6} height={12} rx={1} />
        </mask>
        <rect
          x={17}
          y={9}
          width={6}
          height={12}
          rx={1}
          stroke={color}
          strokeWidth={4}
          mask="url(#nav-sales-icon-c)"
        />
      </> : <>
        <rect x={1} y={12} width={6} height={9} rx={1} fill={color} />
        <rect x={9} y={3} width={6} height={18} rx={1} fill={color} />
        <rect x={17} y={9} width={6} height={12} rx={1} fill={color} />
      </>}
    </svg>
  )
}

export default NavSalesIcon