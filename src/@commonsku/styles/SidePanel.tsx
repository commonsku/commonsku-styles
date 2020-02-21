import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { slideInRight, slideOutRight } from 'react-animations';
import styled from 'styled-components';

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

export { SidePanel };

