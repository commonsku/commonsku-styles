import styled from 'styled-components'
import React from 'react'

import star_dark from './star_dark.svg'
import star_light from './star_light.svg'

import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const StyledStar = styled.img`
  width: 13px;
  height: 13px;
  vertical-align: top;
`
const StyledRating = styled.div<SharedStyleTypes>`
  ${SharedStyles}
`

export const StarRating = (props: {rating:number} & SharedStyleTypes) => {
  return <StyledRating {...props}>
    {[1,2,3,4,5].map((x,i) => i < props.rating ? <StyledStar src={star_light}/> : <StyledStar src={star_dark}/>)}
  </StyledRating>
}
