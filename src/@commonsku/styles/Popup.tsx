import React, { useState } from 'react'
import styled from 'styled-components';

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
/*
    display: block;
    overflow: hidden;
    z-index: 1005;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(42, 56, 63, 0.45);
    overflow-y: auto;
*/
`;

const PopupWindow = styled.div`
/*
    position: fixed;
    overflow: auto;
    padding: 0 10px 10px 10px;
    width: 80%;
    height: 80%;
    left: 10%; 
    top: 10%;
    background: white;
    box-shadow: 2px 2px 10px -1px rgba(0,0,0,0.2);
    border-radius: 7px;
    z-index: 99999;
*/

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
    onClose: (event?: React.MouseEvent) => void,
}> & React.HTMLAttributes<HTMLDivElement>;

export const Popup = ({ header, title, children, onClose, ...props }: PopupProps) => {
    return <Overlay>
        <PopupWindow className="popup" {...props}>
            {header ? header : <div>
                <PopupHeader className="popup-header">
                    <span></span>
                    <span className="title">{title}</span>
                    <span className="close" onClick={onClose}>&times;</span>
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
