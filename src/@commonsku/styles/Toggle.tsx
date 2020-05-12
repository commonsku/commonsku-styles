import styled from 'styled-components'
import React from 'react'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const Wrapper = styled.div`
  &&& {
    display: inline-flex;
    max-width: 600px;
    justify-content: flex-start;
    width: 100%; 
  }`

const Container = styled.div<{stretch?:boolean}&SharedStyleTypes>`
  &&& {
    background: ${props => getThemeColor(props, 'primary0')};
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    width: ${props => props.stretch ? "100%" : "auto"};
    ${SharedStyles}
  }`

const ToggleLink = styled.a<{selected?: boolean, stretch?:boolean}&SharedStyleTypes>`
  &&& {
    font-family: 'skufont-medium', sans-serif;
    font-size: 14px;
    border-radius: 30px;
    display: flex;
    align-content: center;
    padding: 3px 12px;
    height: 33px;
    line-height: 33px;
    width: ${props => props.stretch? "50%" : "auto"};
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.selected ? getThemeColor(props, 'primary') : getThemeColor(props, 'primary0') };
    color:            ${props => props.selected ? "white" : getThemeColor(props, 'primary') };
    ${SharedStyles}
  }`

const Toggle = (props: React.PropsWithChildren<{stretch?:boolean}&SharedStyleTypes>) => {
  return <Wrapper {...props}>
    <Container stretch={props.stretch} {...props}>
      {props.children}
    </Container>
  </Wrapper>
}

export { Toggle, ToggleLink }
