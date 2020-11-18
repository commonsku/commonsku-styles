import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { colors } from './Theme';
import { Transition } from 'react-transition-group';


export type WrapperProps = {
    duration?: number;
}
export type PanelTitleProps = {}
export type CollapsibleProps = WrapperProps & PanelTitleProps & {
    style?: React.CSSProperties,
    isOpen?: boolean;
    padded?: boolean;
    onEntering?: Function;
    onEntered?: Function;
    onExit?: Function;
    onExiting?: Function;
    onExited?: Function;
}

export type CollapsiblePanelProps = Omit<CollapsibleProps, "isOpen"> & {
    title: string;
    isDefaultOpen?: boolean;
}


const Wrapper = styled.div<WrapperProps>`
    border: 1px solid ${colors.primary0};
    border-radius: 5px;

    .entered:not(.show) {
        display: none;
    }

    .entering {
        position: relative;
        height: 0;
        overflow: hidden;
        transition: height ${p => p.duration ? p.duration/1000 : '0.35'}s ease;
    }

    @media (prefers-reduced-motion: reduce) {
        .entering {
            transition: none;
        }
    }
`;

export const PanelTitle = styled.div<PanelTitleProps>`
    background: #f3f6f7;
    border-bottom: 1px solid ${colors.primary0};
    color: ${colors.primary};
    padding: 20px;
    cursor: pointer;
`

const transitionStatusToClass = {
    entering: 'entering',
    entered: 'entered show',
    exiting: 'entering',
    exited: 'entered',
};

function getTransitionClass(status: string) {
    return transitionStatusToClass[status];
}

function getNodeHeight(node: HTMLElement) {
    return node.scrollHeight;
}

export function Collapsible({
    onEntering, onEntered, onExit, onExiting, onExited,
    duration=300, isOpen=false, children, style={}, padded=false, ...props
}: React.PropsWithChildren<CollapsibleProps>) {
    const [height, setHeight] = React.useState<null | number>(null);
    const onHandleEnters = (type: string) => (node: HTMLElement, isAppearing: boolean) => {
        switch (type) {
            case 'onEntering':
                const h = getNodeHeight(node);
                setHeight(padded ? Math.abs(h-40) : h);
                onEntering && onEntering(node, isAppearing);
                break;
            case 'onEntered':
                setHeight(null);
                onEntered && onEntered(node, isAppearing);
                break;
            default:
                break;
        }
    }
    const onHandleExits = (type: string) => (node: HTMLElement) => {
        switch (type) {
            case 'onExit':
                const h = getNodeHeight(node);
                setHeight(padded ? Math.abs(h-40) : h);
                onExit && onExit(node);
                break;
            case 'onExiting':
                const _unused = node.offsetHeight;
                setHeight(0);
                onExiting && onExiting(node);
                break;
            case 'onExited':
                setHeight(null);
                onExited && onExited(node);
                break;
            default:
                break;
        }
    }

    const bodyStyles = _.omit(style, ['padding', 'paddingTop', 'paddingBottom']);
    return (<Transition in={isOpen} timeout={duration}
            onEntering={onHandleEnters('onEntering')}
            onEntered={onHandleEnters('onEntered')}
            onExit={onHandleExits('onExit')}
            onExiting={onHandleExits('onExiting')}
            onExited={onHandleExits('onExited')}
        >
            {status => (
                <div {...props}
                    className={getTransitionClass(status)}
                    style={{
                        background: '#fff',
                        borderTop: `1px solid ${colors.primary0}`,
                        ...(height !== null ? { height } : {}),
                        ...(padded ? {padding: 20} : {}),
                        ...bodyStyles,
                    }}>{children}</div>
            )}
        </Transition>);
}


export function CollapsiblePanel({
    title, duration=300, isDefaultOpen=false, children, ...props
}: React.PropsWithChildren<CollapsiblePanelProps>) {
    const [open, setOpen] = React.useState(isDefaultOpen);
    const togglePanel = (e) => setOpen(!open);

    return (<Wrapper duration={duration}>
        <PanelTitle onClick={e => togglePanel(e)}>{title}</PanelTitle>
        <Collapsible {...props}
            duration={duration}
            isOpen={open}
        >{children}</Collapsible>
    </Wrapper>);
}
