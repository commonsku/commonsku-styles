import styled from 'styled-components'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const Padding = styled.div<SharedStyleTypes>`
  padding: 20px;
  ${SharedStyles}
`;

export {Padding};
