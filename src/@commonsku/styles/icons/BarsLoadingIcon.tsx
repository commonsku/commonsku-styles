import * as React from "react"
import { colors } from "../Theme"
import { SharedStyles, SharedStyleTypes } from '../SharedStyles'
import styled from "styled-components"

const SVG = styled.svg`
  ${SharedStyles}
`;

export function BarsLoadingIcon({
  height=60,
  width=105,
  ...props
}: {
  height?: number,
  width?: number,
} & SharedStyleTypes) {
  return (
    <SVG width={`${width}px`} height={`${height}px`} viewBox="0 0 51 50" transform="scale(1, -1) translate(0, -1)" {...props}>
      <rect x="0" y="0" width="13" height={height} fill={colors.primary}>
        <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="19" y="0" width="13" height={height} fill={colors.special1}>
        <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="38" y="0" width="13" height={height} fill={colors.special2}>
        <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="57" y="0" width="13" height={height} fill={colors.special3}>
        <animate attributeName="height" values="50;10;50" begin="0.6s" dur="1s" repeatCount="indefinite" />
      </rect>
    </SVG>
  )
}

export default BarsLoadingIcon
