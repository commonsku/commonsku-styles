import styled from 'styled-components';

type BackdropTypes = {
    animationDuration?: number,
}

export const Backdrop = styled.div<BackdropTypes>`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(67, 83, 91, .3);
    z-index: 100;
    transition: all ${p => ((p.animationDuration || 300)/1000)}s ease-in-out;
    -moz-transition: all ${p => ((p.animationDuration || 300)/1000)}s ease-in-out;
    -webkit-transition: all ${p => ((p.animationDuration || 300)/1000)}s ease-in-out;
    opacity: 0.8;
`;
