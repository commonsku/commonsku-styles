import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { colors } from './Theme';
import { Transition } from 'react-transition-group';

export type CollapseStyledProps = {
    duration?: number;
    height?: null|number;
}
export type CollapseWrapperProps = CollapseStyledProps
export type CollapsiblePanelTitleProps = {}

export type CollapsibleProps = React.PropsWithChildren<CollapseWrapperProps & CollapsiblePanelTitleProps & {
    style?: React.CSSProperties,
    isOpen?: boolean;
    padded?: boolean;
    onEntering?: Function;
    onEntered?: Function;
    onExit?: Function;
    onExiting?: Function;
    onExited?: Function;
}>

export type CollapsiblePanelProps = React.PropsWithChildren<Omit<
CollapsibleProps & {onClick?: null | ((i?: number|null) => void);}, "isOpen"> & {
    title?: string;
    isDefaultOpen?: boolean;
    components?: { [key in string]: any };
    titleProps?: { [key in string]: any };
}>

export type CollapsiblePanelsProps = React.PropsWithChildren<{
    panels?: Array<CollapsiblePanelProps & {wrapperProps?: { [key in string]: any }}>;
    spaceBetween?: boolean; // space between panels
    onClickPanel?: null | ((i?: number|null) => void);
}>

export const CollapseStyled = styled.div<CollapseStyledProps>`
&&& {
    .collapsed:not(.show) {
        display: none;
    }

    .collapsing {
        position: relative;
        height: 0;
        overflow: hidden;
        transition: height ${p => p.duration ? p.duration/1000 : '0.35'}s ease;
    }

    @media (prefers-reduced-motion: reduce) {
        .collapsing {
            transition: none;
        }
    }
}
`;

export const CollapseWrapper = styled.div<CollapseWrapperProps>`
&&& {
    border: 1px solid ${colors.primary0};
    border-radius: 5px;
}
`;

export const CollapsiblePanelTitle = styled.div<CollapsiblePanelTitleProps>`
&&& {
    background: #f3f6f7;
    border-bottom: 1px solid ${colors.primary0};
    color: ${colors.primary};
    padding: 20px;
    cursor: pointer;
}
`

const transitionStatusToClass = {
    entering: 'collapsing',
    entered: 'collapsed show',
    exiting: 'collapsing',
    exited: 'collapsed',
    unmounted: 'collapsed',
};

function getTransitionClass(status: "entering" | "entered" | "exiting" | "exited" | "unmounted") {
    return transitionStatusToClass[status];
}

function getNodeHeight(node: HTMLElement) {
    return node.scrollHeight;
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(({
    onEntering, onEntered, onExit, onExiting, onExited,
    duration=300, isOpen=false, children, style={}, padded=false, ...props
}: React.PropsWithChildren<CollapsibleProps>, ref) => {
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
    return (<CollapseStyled ref={ref} duration={duration}>
        <Transition in={isOpen} timeout={duration}
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
                        ...(height !== null ? { height } : {}),
                        ...bodyStyles,
                    }}>{children}</div>
            )}
        </Transition>
    </CollapseStyled>);
});


export const CollapsiblePanel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(({
    title, duration=300, isDefaultOpen=false, components, children, titleProps={}, ...props
}: React.PropsWithChildren<CollapsiblePanelProps>, ref) => {
    const [open, setOpen] = React.useState(isDefaultOpen);
    const togglePanel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e && e.preventDefault();
        setOpen(!open);
    }
    const _titleProps = {
        isOpen: open,
        onClick: togglePanel,
        ...titleProps
    }
    return (<CollapseWrapper ref={ref} duration={duration}>
        {components && components.Title
            ? <components.Title {..._titleProps} />
            : <CollapsiblePanelTitle {..._titleProps}>{title}</CollapsiblePanelTitle>}
        <Collapsible {...props} duration={duration} isOpen={open}>{children}</Collapsible>
    </CollapseWrapper>);
});

export const CollapsiblePanels = React.forwardRef<HTMLDivElement, CollapsiblePanelsProps>(({
    panels=[], spaceBetween=false, onClickPanel=null
}: React.PropsWithChildren<CollapsiblePanelsProps>, ref) => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);
    const updatePanelIndex = (i: number | null) => {
        let idx: number|null = null;
        if (i !== openIndex) {
            idx = i;
        }
        setOpenIndex(idx);
        onClickPanel && onClickPanel(idx);
        return idx;
    }

    return (<>
        {panels.map((v, i) => {
            const {
                duration=300,
                components={},
                title="",
                children,
                titleProps={},
                wrapperProps={},
                onClick=null,
                ...panelProps
            } = v;
            const togglePanel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e && e.preventDefault();
                const idx = updatePanelIndex(i);
                onClick && onClick(idx);
            }
            const _titleProps = {
                isOpen: i === openIndex,
                onClick: togglePanel,
                ...titleProps,
            }
            const { style={}, ..._wrapperProps } = wrapperProps;
            return (
                <CollapseWrapper ref={ref} key={`CSKU_CollapsiblePanels_${i}`} duration={duration} style={{
                    ...(spaceBetween ? {marginBottom: 10} : {}),
                    ...style,
                }} {..._wrapperProps}>
                    {components && components.Title
                        ? <components.Title {..._titleProps} />
                        : <CollapsiblePanelTitle {..._titleProps}>{title}</CollapsiblePanelTitle>}
                    <Collapsible {...panelProps} duration={duration} isOpen={_titleProps.isOpen}>{children}</Collapsible>
                </CollapseWrapper>
            );
        })}
    </>);
});