import styled from 'styled-components'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

export const Background = styled.div<{padded?: boolean, fillWindow?:boolean}&SharedStyleTypes>`
  background: ${props => getThemeColor(props, 'bggray')};
  padding: 20px ${props => props.padded ? 20 : 0}px;
  min-height: ${props => props.fillWindow ? "100vh" : 0};
  ${SharedStyles}
`