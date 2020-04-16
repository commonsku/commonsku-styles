import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { slideInRight, slideOutRight } from 'react-animations';
import styled from 'styled-components';
import { Row, Col } from './FlexboxGrid';
import { Avatar } from './Avatar'
import { H2 } from './Headings'
import { colors } from './Theme';
import { aeval } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'


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

const StyledPanel = styled.div<SharedStyleTypes>`
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
  ${SharedStyles}
`;

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: number;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

const SidePanel = (props: React.PropsWithChildren<{ visible: boolean, title: string, controls: React.ReactNode } & SharedStyleTypes>) => {
  const shouldRenderChild = useDelayUnmount(props.visible, 500);
  return shouldRenderChild ? <StyledPanel
    // style={{ visibility: (props.visible ? "visible" : "hidden") }}
    className={(props.visible ? css(styles.slideInRight) : css(styles.slideOutRight))}
    {...props}
  >
    <Row>
      <Col xl={6} xs={6}>
        <H2>{props.title}</H2>
      </Col>
      <div style={{ textAlign: "right" }}>
        {props.controls}
      </div>
    </Row>
    {props.children}
  </StyledPanel> : null;
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

