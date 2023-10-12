import styled from 'styled-components'
import React from 'react'

import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const SpinningCircle = styled.div<{width?:number} & SharedStyleTypes>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props=>props.width}px;
  position: absolute;
  animation: spin 1s linear infinite;
  background: conic-gradient(from 180deg at 50% 50%, #00A0B6 0deg, rgba(40, 213, 238, 0) 360deg);
  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  border-radius: 100px;
  ${SharedStyles}
`

const Wrapper = styled.div<{width?:number} & SharedStyleTypes>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props=>props.width}px;
  border-radius: 100px;
  ${SharedStyles}
`


export const CircleSpinner = ( props : React.PropsWithChildren<{small?:boolean, width?: number, skubot?:boolean, color?:string, background?:string} & SharedStyleTypes>) => {
  return <Wrapper {...props}>
    <svg width={props.width} height={props.width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute", zIndex:"1000"}}>
      <circle cx="12" cy="12" r="10" fill={props.background}/>
      <path
      fill="#00A0B6"
      display={props.skubot ? "block" : "none"}
      d="M3.642 12.926a.476.476 0 0 0 .478-.474.476.476 0 0 0-.478-.475.476.476 0 0 0-.478.475c0 .262.214.474.478.474ZM20.387 12.927a.476.476 0 0 0 .478-.474.476.476 0 0 0-.478-.475.476.476 0 0 0-.478.475c0 .261.214.474.478.474ZM19.27 12.153a8.816 8.816 0 0 0-.141-1.194.34.34 0 0 0-.337-.264H17.59V8.85c0-.246-.142-.44-.301-.44-.85-.157-1.7-.263-2.566-.35v-.317a.356.356 0 0 0-.284-.351 12.474 12.474 0 0 0-2.424-.246c-.815 0-1.629.087-2.408.246a.36.36 0 0 0-.283.351v.334c-.85.07-1.717.193-2.566.351-.089 0-.16.053-.213.123a.542.542 0 0 0-.088.299v1.828H5.252c-.159 0-.318.105-.336.263a7.352 7.352 0 0 0-.16 1.212v.44c.019.404.072.808.142 1.195a.34.34 0 0 0 .337.263h1.203v1.88c0 .246.142.44.301.44 1.735.28 3.505.44 5.257.44 1.752 0 3.504-.142 5.257-.44.088 0 .159-.053.212-.123a.542.542 0 0 0 .088-.299v-1.88h1.204c.16 0 .319-.106.336-.264.089-.404.142-.79.142-1.195v-.457h.035Zm-2.548 3.023c0 .193-.16.351-.354.351-2.885.44-5.823.44-8.726 0a.35.35 0 0 1-.248-.105.318.318 0 0 1-.106-.246V9.57c0-.193.16-.351.354-.351a30.49 30.49 0 0 1 4.372-.316c1.451 0 2.92.105 4.354.316a.35.35 0 0 1 .247.105c.071.07.107.141.107.246v5.606Z"
    />
    <path
      fill="#00A0B6"
      display={props.skubot ? "block" : "none"}
      d="M9.748 13.998a.866.866 0 0 1-.867-.86v-1.371c0-.475.39-.861.867-.861.478 0 .867.386.867.86v1.371c0 .475-.389.861-.867.861ZM14.28 13.999a.866.866 0 0 1-.867-.861v-1.37c0-.475.39-.862.867-.862.478 0 .868.387.868.861v1.37c.017.475-.39.862-.868.862Z"
    />
      </svg>
    <SpinningCircle width={props.width}/>
    </Wrapper>
}

