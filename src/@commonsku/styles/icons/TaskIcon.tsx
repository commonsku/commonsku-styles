import React from "react"

export function TaskIcon({
  color="#000000", 
  width, 
  mr,
  mt
}: React.PropsWithChildren<{
  color?:string, 
  width?:string, 
  mr?:number,
  mt?:number
}>) {
  return (
      <svg
      viewBox="0 0 116 116"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill={color}
      width={width}
      style={{display:"inline-block", verticalAlign: "top", marginRight: mr, marginTop: mt }}
      >
        <path d="M80.368.867H23.032a22.562 22.562 0 00-15.91 6.564 22.376 22.376 0 00-6.6 15.861V91.99a22.394 22.394 0 006.6 15.862 22.557 22.557 0 0015.91 6.558h69.032a22.568 22.568 0 0015.916-6.558 22.394 22.394 0 006.598-15.862V60.42a3.569 3.569 0 00-3.563-3.568 3.57 3.57 0 00-3.568 3.568v31.57c0 4.052-1.618 7.94-4.496 10.808a15.44 15.44 0 01-10.887 4.486H23.032a15.43 15.43 0 01-10.882-4.486 15.247 15.247 0 01-4.5-10.808V23.292a15.23 15.23 0 014.5-10.808 15.43 15.43 0 0110.882-4.486h57.336a3.568 3.568 0 003.563-3.563A3.569 3.569 0 0080.368.867z" />
        <path d="M56.946 77.374l51.479-58.56a3.508 3.508 0 014.945-.32 3.514 3.514 0 01.32 4.95l-53.973 61.4a3.507 3.507 0 01-5.14.135L29.444 59.281a3.504 3.504 0 01.053-4.955 3.51 3.51 0 014.96.053l22.49 22.995z" />
      </svg>


  )
}

export default TaskIcon