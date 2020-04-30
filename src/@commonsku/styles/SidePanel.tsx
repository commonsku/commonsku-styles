import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { slideInRight, slideOutRight } from 'react-animations';
import styled from 'styled-components';
import { Row, Col } from './FlexboxGrid';
import { Avatar } from './Avatar'
import { H2 } from './Headings'
import { useDelayUnmount } from './hooks';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { SizerTypes, SizerCss } from './Sizer'


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
    animationDuration: '.3s',
    delay: '0s'
  },
  slideOutRight: {
    animationName: slideOutRight,
    animationDuration: '.3s',
    delay: '0s'
  }
})

const StyledPanel = styled.div<SharedStyleTypes & SizerTypes>`
  background: white;
  height: 100vh;
  width: 560px;
  box-shadow: 0 0 10px rgba(61, 79, 90, 0.27);
  z-index: 300;
  position: fixed;
  right: 0;
  top: 0;
  padding: 1em;
  overflow: scroll;
  @media only screen and (max-width: 640px) {
    width: auto !important;
  }
  ${SharedStyles}
  ${SizerCss}
`;


const SidePanel = (props: React.PropsWithChildren<{ visible: boolean, title: string, controls: React.ReactNode } & SharedStyleTypes & SizerTypes>) => {
  const shouldRenderChild = useDelayUnmount(props.visible, 300);
  return shouldRenderChild ? <StyledPanel
    // style={{ visibility: (props.visible ? "visible" : "hidden") }}
    className={(props.visible ? css(styles.slideInRight) : css(styles.slideOutRight))}
    {...props}
  >
    {props.header || <Row>
      <Col><H2>{props.title}</H2></Col>
      <Col style={{ textAlign: "right" }}>{props.controls}</Col>
    </Row>}
    {props.children}
  </StyledPanel> : null;
}


const NameAndPosition = styled.div`
  display: inline-block;
  width: 90%;
`

const Name = styled.div`
  font-weight: bold;
`

const Position = styled.div`
  font-size: .8em;
`
const Contact = styled.div<SizerTypes>`
 &&& {
    display: flex;
    margin-bottom: 15px;
    ${SizerCss}
  }
`

// TODO: do we allow unnamed contacts?
const PanelContact = ({avatar, name, position, email, ...props}: { name:string, position?:string, email?:string, phone?:string, avatar?:React.ReactNode } & SizerTypes) => {
  return (
    <Contact {...props}>
      <Col xs>
        { avatar ? avatar : null }
        <NameAndPosition style={{ width: avatar ? '77%' : '95%' }}>
          <Name>{name}</Name>
          { position ? <Position>{position}</Position> : null }
        </NameAndPosition>
      </Col>
      { email ? <Col xs>
        <a href={"mailto:" + email}>{email}</a>
      </Col> : null }
    </Contact>
  )
}

export { SidePanel, PanelContact };

