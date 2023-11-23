import styled from "styled-components";
import { Tooltip as BaseTooltip } from 'react-tooltip';
import colors from "./colors";
import { getThemeColor } from './Theme';

const Tooltip = styled(BaseTooltip)`
  max-width: 400px;
  &.type-dark.place-top {
    background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    padding: 0.3rem 1rem;

    &:after {
      border-top-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
      background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    }
  }
  &.type-dark.place-bottom {
    background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    padding: 0.3rem 1rem;

    &:after {
      border-bottom-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
      background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    }
  }
  &.type-dark.place-left {
    background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    padding: 0.3rem 1rem;

    &:after {
      border-left-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
      background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    }
  }
  &.type-dark.place-right {
    background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    padding: 0.3rem 1rem;

    &:after {
      border-right-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
      background-color: ${p => getThemeColor(p, 'neutrals.100', colors.neutrals['100'])};
    }
  }

  &.type-success.place-top,
  &.type-success.place-bottom,
  &.type-success.place-left,
  &.type-success.place-right {
    background-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
    color: ${p => getThemeColor(p, 'green.90', colors.green['90'])};
    padding: 0.3rem 1rem;
  }
  &.type-success.place-top {
    &:after {
      border-top-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
      background-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
    }
  }
  &.type-success.place-bottom {
    &:after {
      border-bottom-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
      background-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
    }
  }
  &.type-success.place-left {
    &:after {
      border-left-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
      background-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
    }
  }
  &.type-success.place-right {
    &:after {
      border-right-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
      background-color: ${p => getThemeColor(p, 'green.20', colors.green['20'])};
    }
  }
`;

export default Tooltip;
