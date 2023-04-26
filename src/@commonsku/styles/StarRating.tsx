import React from 'react'
import styled from 'styled-components'
import {
  StarLightIcon,
  StarDarkIcon
} from './icons';

import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const starStyles = {
  width: 13,
  height: 13,
  verticalAlign: 'top',
};
const StyledRating = styled.div<SharedStyleTypes>`
  ${SharedStyles}
`

export const StarRating = (props: {rating:number} & SharedStyleTypes) => {
  return <StyledRating {...props}>
    {[1,2,3,4,5].map((x,i) => i < props.rating ?
      <StarLightIcon style={starStyles} /> :
      <StarDarkIcon style={starStyles} />)}
  </StyledRating>
}
