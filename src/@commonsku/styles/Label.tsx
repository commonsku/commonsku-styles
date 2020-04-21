import styled from 'styled-components'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const Label = styled.label<SharedStyleTypes>`
  font-family: 'skufont-medium', sans-serif;
  color: ${props => getThemeColor(props, 'textlabel')};
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  ${SharedStyles}
`;

export {Label};
