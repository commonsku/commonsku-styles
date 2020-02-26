import styled from 'styled-components'

export const Background = styled.div<{padded?: boolean}>`
  background: #ebf0f3;
  padding: 20px ${props => props.padded ? 20 : 0}px;
`