import React from 'react'
import styled from 'styled-components'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import StarLightIcon from './icons/StarLightIcon';
import StarDarkIcon from './icons/StarDarkIcon';

const StyledRating = styled.div<SharedStyleTypes>`
  ${SharedStyles}
`

const starStyles = {
  width: 13,
  height: 13,
  verticalAlign: 'top',
};

export const StarRating = (props: {rating:number} & SharedStyleTypes) => {
  return <StyledRating {...props}>
    {[1,2,3,4,5].map((x,i) => i < props.rating
      ? <StarLightIcon key={`StarLightIcon-${x}`} style={starStyles} />
      : <StarDarkIcon key={`StarDarkIcon-${x}`} style={starStyles} />)}
  </StyledRating>
}
