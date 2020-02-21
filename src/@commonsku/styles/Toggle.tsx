import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.div`
  display: inline-flex;
  max-width: 600px;
  justify-content: space-around;
  width: 100%; `

const Container = styled.div`
  background: #DAE9EE;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const ToggleLink = styled.a<{selected?: boolean}>`
  font-family: 'skufont-medium', sans-serif;
  font-size: 14px;
  border-radius: 30px;
  display: flex;
  align-content: center;
  padding: 3px 12px;
  height: 33px;
  line-height: 33px;
  width: 50%;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.selected ? "#02C0DA" : "#DAE9EE" };
  color:            ${props => props.selected ? "white" : "#02c0da" };
`

const Toggle = ({ children }: React.PropsWithChildren<{}>) => {
  return <Wrapper>
    <Container>
      {children}
    </Container>
  </Wrapper>
}

export {Toggle, ToggleLink};