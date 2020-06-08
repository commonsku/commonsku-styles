import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button } from './Button';
import { Col } from './FlexboxGrid';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { SizerCss, SizerTypes } from './Sizer'
import { document } from '../utils';

export const Overlay = styled.div`
  &&& {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(42, 56, 63, 0.45);
    display: flex;
    z-index: 999;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PopupWindow = styled.div<SharedStyleTypes & SizerTypes & {width?: string, height?: string}>`
  &&& {
    width: ${props => props.width ?? '90%'};
    height: ${props => props.height ?? '75%'}; 
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    ${props => props.height ?  '' : 'max-height: 700px;'}
    overflow-y: hidden;
    display: block;
    z-index: 1006;

    padding: 1rem;
    border: 1px solid #CCD5DA;
    background-color: #fefefe;
    border-radius: 3px;

    &:last-child {
        margin-bottom: 0;
    }
    .popup-content {
        overflow-y: auto;
        height: 90%;
    }
    ${SharedStyles}
    ${SizerCss}
  }
`;

export const PopupHeader = styled.div<SharedStyleTypes & SizerTypes>`
  &&& {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    padding: 3px;
    z-index: 99;
    .title {
        font-size: 1.8rem;
        font-weight: 500;
        text-align: left;
        align-self: center;
        padding-top: 3px;
        padding-left: 3px;
        border-bottom: none;
        font-family: "skufont-demibold",sans-serif;
        color: #123952;
    }
    ${SharedStyles}
    ${SizerCss}
  }
`;

const PopupContainer: React.FC<{}> = ({ children }) => {
  const ref = React.useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(ref.current);
    return () => {
      document.body.removeChild(ref.current);
    }
  }, []);

  return ReactDOM.createPortal(children, ref.current);
}

export type PopupProps = React.PropsWithChildren<{ 
    header?: React.Component,
    title?: string|React.Component,
    controls?: Array<React.ReactNode>,
    onClose?: (event?: React.MouseEvent) => void,
    closeOnClickOutside?: boolean,
    closeOnEsc?: boolean,
} & SharedStyleTypes> & React.HTMLAttributes<HTMLDivElement>;

export const Popup = ({ header, title, controls, children, onClose, closeOnEsc=true, closeOnClickOutside=false, ...props }: PopupProps) => {
  const ref = React.useRef();

  useEffect(() => {
    if(closeOnClickOutside) {
      //document.addEventListener("mousedown", handleClick);
    }
    if (closeOnEsc) {
      document.addEventListener("keyup", handleKeyDown);
    }

    return () => {
      if(closeOnClickOutside) {
        //document.removeEventListener("mousedown", handleClick);
      }
      if (closeOnEsc) {
        document.removeEventListener("keyup", handleKeyDown);
      }
    }
  }, []);

  const handleKeyDown = (e: Event) => {
    // @ts-ignore
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose && onClose();
    }
  };

  //there is a bug where this closes popup involuntarily
  const handleClick = (e: Event) => {
    // @ts-ignore
    if (ref.current?.contains(e.target)) {
      return;
    }
    onClose && onClose();
  };

  return <PopupContainer>
    <Overlay>
      <PopupWindow className="popup" {...props} ref={ref}>
          {header ? header : (
              <PopupHeader className="popup-header" xsStyle="flex-wrap: wrap-reverse;" smStyle="flex-wrap: wrap;">
                  <Col style={{textAlign: 'left', alignSelf: 'center'}}>
                      <span className="title">{title}</span>
                  </Col>
                  <Col style={{textAlign: 'right', alignSelf: 'center'}}>
                      {controls || <Button onClick={onClose}>Close</Button>}
                  </Col>
              </PopupHeader>
          )}
          <div className="popup-content">{children}</div>
      </PopupWindow>
    </Overlay>
  </PopupContainer>
}

export const ShowPopup: React.FC<Omit<PopupProps, 'onClose'> & {
  popup: React.ComponentType<PopupProps>,
  autoOpen?: boolean,
  render?: React.FC<{onClick: () => void}>
}> = ({ autoOpen = false, popup: PopupComponent, render, closeOnEsc=true, closeOnClickOutside=false, ...props }) => {
  const [showPopup, setShowPopup] = useState(autoOpen);
  return <>
    {showPopup && <PopupComponent onClose={() => setShowPopup(false)} closeOnEsc={closeOnEsc} closeOnClickOutside={closeOnClickOutside} {...props}/>}
    {render && render({onClick: () => setShowPopup(!showPopup)})}
  </>
}

export default Popup;
