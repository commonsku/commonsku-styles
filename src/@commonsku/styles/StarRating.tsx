import styled from 'styled-components'
import React from 'react'

import star_dark from './star_dark.svg'
import star_light from './star_light.svg'


const StyledStar = styled.img`
  width: 13px;
  height: 13px;
  vertical-align: top;
`

export const StarRating = (props: {rating:number}) => {
  return <div>
    {[1,2,3,4,5].map((x,i) => i < props.rating ? <StyledStar src={star_light}/> : <StyledStar src={star_dark}/>)}
  </div>
}
