import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { slideInRight, slideOutRight } from 'react-animations';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { Avatar } from './Avatar'

/* 

SidePanel: a narrow modal with a slide animation

PanelContact: a contact designed to fit within a panel
Address: an address designed to fit within a panel
Project: a project designed to fit within a panel

TODO: consider breaking these up into separate components
      with the layout being determined by the amount of space we have. 

*/



const styles = StyleSheet.create({
  slideInRight: {
    animationName: slideInRight,
    animationDuration: '.5s'
  },
  slideOutRight: {
    animationName: slideOutRight,
    animationDuration: '.5s'
  }
})

const StyledPanel = styled.div`
  background: white;
  height: 100vh;
  width: 45vw;
  box-shadow: 0 0 10px rgba(61, 79, 90, 0.27);
  z-index: 300;
  position: fixed;
  right: 0;
  top: 0;
  padding: 1em;
  overflow: scroll;
`;

const SidePanel = (props: React.PropsWithChildren<{ visible: boolean }>) => {
  return <StyledPanel
    style={{ visibility: (props.visible ? "visible" : "hidden") }} 
    className={(props.visible ? css(styles.slideInRight) : css(styles.slideOutRight))}
  >
    {props.children}
  </StyledPanel>
}


// TODO: do we allow unnamed contacts?
const PanelContact = (props: { name:string, position?:string, email?:string, phone?:string, avatar?:React.ReactNode }) => {
  const NameAndPosition = styled.div`
    display: inline-block;
    width: calc(100% - 80px);
  `

  const Name = styled.div`
    font-weight: bold;
  `

  const Position = styled.div`
    font-size: .8em;
  `
  const Contact = styled.div`
    display: flex;
    margin-bottom: 15px;
  `

  return (
    <Contact>
      <Col xs>
        { props.avatar ? props.avatar : null }
        <NameAndPosition>
          <Name>{props.name}</Name>
          { props.position ? <Position>{props.position}</Position> : null }
        </NameAndPosition>
      </Col>
      { props.email ? <Col xs>
        <a href={"mailto:" + props.email}>{props.email}</a>
      </Col> : null }
    </Contact>
  )
}

export { SidePanel, PanelContact };

