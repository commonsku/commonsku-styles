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

type StarRatingProps= {
  rating: number
}

export const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>((
  props: React.PropsWithChildren<{rating:number} & SharedStyleTypes>, ref) => {
  return <StyledRating ref={ref} {...props}>
    {[1,2,3,4,5].map((x,i) => i < props.rating ? <StyledStar key={`star${i}`} src={star_light}/> : <StyledStar key={`star${i}`} src={star_dark}/>)}
  </StyledRating>
});