import styled from 'styled-components'

const Box = styled.div`
  background: white;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  padding: 20px ${props => props.padded ? 20 : 0}px;
`;

export {Box};
