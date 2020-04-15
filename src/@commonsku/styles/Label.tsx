import styled from 'styled-components'
import { colors } from './Theme';
import { aeval } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const Label = styled.label<SharedStyleTypes>`
  font-family: 'skufont-medium', sans-serif;
  color: ${props => aeval(props.theme.colors, 'textlabel', colors.textlabel)};
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  ${SharedStyles}
`;

export {Label};
