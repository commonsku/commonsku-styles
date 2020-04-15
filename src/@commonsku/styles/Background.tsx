import styled from 'styled-components'
import { colors } from './Theme';
import { aeval } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

export const Background = styled.div<{padded?: boolean, fillWindow?:boolean}&SharedStyleTypes>`
  background: ${props => aeval(props.theme.colors, 'bggray', colors.bggray)};
  padding: 20px ${props => props.padded ? 20 : 0}px;
  min-height: ${props => props.fillWindow ? "100vh" : 0};
  ${SharedStyles}
`