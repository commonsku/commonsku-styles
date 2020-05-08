import styled from 'styled-components'
import { colors } from './Theme'
import { SharedStyleTypes, SharedStyles } from './SharedStyles'

export const StyledBadge = styled.span<{color?:string} & SharedStyleTypes>`
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: ${p => p.color === 'cta' ? colors.cta : p.color==='grey' ? colors.primary0 : colors.primary};
  color: ${p => p.color==='grey' ? colors.primary100 : colors.white}
  border-radius: 10px;
  ${SharedStyles}
`;

