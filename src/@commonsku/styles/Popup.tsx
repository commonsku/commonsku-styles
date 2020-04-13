import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, H3 } from './';

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
        text-align: left;
        padding: 7px;
        font-size: 20px;
        font-weight: bolder;
    }
    .close {
        font-size: 24px;
        font-weight: bolder;
        text-align: top;
        cursor: pointer;
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
                    <H3>{title}</H3>
                    {controls || 
                        <Button onClick={onClose}>Close</Button>}
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
