import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from './Button';
import { H3 } from './Headings';
import { Col } from './FlexboxGrid';

export const Overlay = styled.div`
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
`;

const PopupWindow = styled.div`
/*
    padding: 5px;
    position: relative;
    overflow: auto;
    margin: auto;
    height: 90%;
    border: 1px solid rgb(187, 187, 187);
    background: rgb(255, 255, 255);
*/
    width: 90%;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    height: 75%;
    max-height: 700px;
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
`;

export const PopupHeader = styled.div`
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
`;

export type PopupProps = React.PropsWithChildren<{ 
    header?: React.Component,
    title?: string|React.Component,
    controls?: Array<React.ReactNode>,
    onClose?: (event?: React.MouseEvent) => void,
}> & React.HTMLAttributes<HTMLDivElement>;

export const Popup = ({ header, title, controls, children, onClose, ...props }: PopupProps) => {
    return <Overlay>
        <PopupWindow className="popup" {...props}>
            {header ? header : (
                <PopupHeader className="popup-header">
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
}


export const Showpopup = ({
    show=false, children
}: {show?: boolean, children ?: React.ReactNode}) => {
    const [showPopup, setShowPopup] = useState(show);
    return <div>
            {showPopup && <Popup
                title={'Hello popup'}
                onClose={() => {
                    setShowPopup(false);
                }}
            >Hello from Popup</Popup>}
    </div>
}


export default Popup;
