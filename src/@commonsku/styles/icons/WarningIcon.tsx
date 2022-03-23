import React from "react"

export function WarningIcon({
  width = 30,
  height = 31,
  ...props
}: React.PropsWithChildren<{
  width?: number,
  height?: number,
}>) {
  return (
    <svg
      width={31}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.167 0H26a5 5 0 015 5v25H5.167a5 5 0 01-5-5V0z"
        fill="url(#prefix__paint0_linear_1503_2433)"
      />
      <path
        d="M14.482 17.9h2.22l.2-10.1h-2.64l.22 10.1zm-.12 4.1h2.46v-2.36h-2.46V22z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_1503_2433"
          x1={6.5}
          y1={35}
          x2={27.5}
          y2={-7.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA2272" />
          <stop offset={1} stopColor="#FA224E" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default WarningIcon;