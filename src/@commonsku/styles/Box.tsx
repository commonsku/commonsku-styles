import styled from 'styled-components'

export const Box = styled.div<{borderless: boolean, padded: boolean}>`
  background: white;
  margin-top: 20px;
  box-shadow: ${props => props.borderless ? 0 : `0 2px 4px rgba(0, 0, 0, 0.07)`};
  border-radius: 5px;
  padding: 20px ${props => props.padded ? 20 : 0}px;
`;
