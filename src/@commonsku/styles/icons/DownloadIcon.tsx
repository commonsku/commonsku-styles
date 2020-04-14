import * as React from "react"

export const DownloadIcon = (props: {[key: string]: any}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M2.494 31.387v1.91a6.23 6.23 0 006.242 6.23l22.551-.041a6.23 6.23 0 006.22-6.231v-1.868a1.905 1.905 0 00-3.809 0v1.868a2.423 2.423 0 01-2.419 2.424l-22.55.04a2.425 2.425 0 01-2.428-2.423v-1.909c0-1.05-.853-1.904-1.903-1.904s-1.904.854-1.904 1.904zM18.097 24.8V2.377a1.904 1.904 0 113.807 0v22.42l6.556-6.557a1.903 1.903 0 112.692 2.692l-9.807 9.809a1.903 1.903 0 01-2.692 0l-9.806-9.805a1.903 1.903 0 112.692-2.692l6.558 6.556z"
        fill="#fff"
      />
    </svg>
  )
}
