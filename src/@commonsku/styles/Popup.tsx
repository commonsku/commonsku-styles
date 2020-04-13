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
    position: relative;
    background: rgb(255, 255, 255);
    width: 90%;
    height: 90%;
    margin: auto;
    border: 1px solid rgb(187, 187, 187);
    padding: 5px;
    overflow: auto;
`;

export const PopupHeader = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    padding: 3px;
    top: -5px;
    z-index: 99;
    .title {
        font-size: 1.8rem;
        font-weight: bold;
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
            {header ? header : <div>
                <PopupHeader className="popup-header">
                    <Col style={{textAlign: 'left', alignSelf: 'center'}}>
                        <span className="title">{title}</span>
                    </Col>
                    <Col style={{textAlign: 'right', alignSelf: 'center'}}>
                        {controls || <Button onClick={onClose}>Close</Button>}
                    </Col>
                </PopupHeader>
                <hr />
            </div>}
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
