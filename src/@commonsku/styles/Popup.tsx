import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button } from './Button';
import { Col } from './FlexboxGrid';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { SizerCss, SizerTypes } from './Sizer'
import { document, isClientSide } from '../utils';
import useClickOutside from './hooks/useClickOutside';
import { useFallbackRef } from './hooks';

export const Overlay = styled.div<{ zIndex?: number; }>`
  &&& {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(42, 56, 63, 0.45);
    display: flex;
    z-index: ${p => p.zIndex || 999};
    margin-left: auto;
    margin-right: auto;
  }
`;

const PopupWindow = styled.div<SharedStyleTypes & SizerTypes & {width?: string, height?: string, padding?: string; zIndex?: number;}>`
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
    z-index: ${p => p.zIndex || 1006};

    padding: ${props => props.padding ?? '1rem'};
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
    const current = ref.current;
    document.body.appendChild(current);
    return () => {
      document.body.removeChild(current);
    }
  }, []);

  if (!isClientSide()) {
    return null;
  }
  return ReactDOM.createPortal(children, ref.current);
}

export type PopupProps = React.PropsWithChildren<{ 
    header?: React.Component,
    noHeader?: boolean,
    title?: string|React.Component,
    controls?: Array<React.ReactNode>,
    onClose?: (event?: React.MouseEvent) => void,
    noCloseButton?: boolean,
    closeOnClickOutside?: boolean,
    closeOnEsc?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    zIndex?: number,
    overlayZIndex?: number;
    popupClassName?: string;
    contentClassName?: string;
} & SharedStyleTypes> & React.HTMLAttributes<HTMLDivElement>;

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>((
  {
    header,
    noHeader=false,
    title,
    controls,
    children,
    onClose,
    noCloseButton=false,
    closeOnEsc=true,
    closeOnClickOutside=false,
    overlayZIndex,
    popupClassName,
    contentClassName,
    ...props
  }: PopupProps, 
  forwardedRef 
) => {
  const ref = useFallbackRef<HTMLDivElement>(forwardedRef);
  useClickOutside({
    ref,
    onClick: (e) => {
      closeOnClickOutside && onClose && onClose(e);
    },
    onCleanup: onClose,
  });

  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      // @ts-ignore
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose && onClose();
      }
    };

    if (closeOnEsc) {
      document.addEventListener("keyup", handleKeyDown);
    }

    return () => {
      if (closeOnEsc) {
        document.removeEventListener("keyup", handleKeyDown);
      }
    }
  }, [closeOnClickOutside, closeOnEsc, onClose]);

  return <PopupContainer>
    <Overlay zIndex={overlayZIndex}>
      <PopupWindow className={"popup" + (popupClassName ? ` ${popupClassName}` : '')} {...props} ref={ref}>
          {noHeader ? null :
            header ? header : (
              <PopupHeader className="popup-header" xsStyle="flex-wrap: wrap-reverse;" smStyle="flex-wrap: wrap;">
                  <Col style={{textAlign: 'left', alignSelf: 'center'}}>
                      <span className="title">{title}</span>
                  </Col>
                  <Col style={{textAlign: 'right', alignSelf: 'center'}}>
                      { noCloseButton ? null :
                        controls || <Button onClick={onClose}>Close</Button>}
                  </Col>
              </PopupHeader>
          )}
          <div className={"popup-content" + (contentClassName ? ` ${contentClassName}` : '')}>{children}</div>
      </PopupWindow>
    </Overlay>
  </PopupContainer>
})

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
