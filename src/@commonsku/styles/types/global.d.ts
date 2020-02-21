/// <reference types="react-scripts" />
// TODO: temp delcaration for react-animations
declare module 'react-animations' {
    type Slide = {
        from: {
            transform: string,
            visibility?: string
        },
        to: {
            transform: string
            visibility?: string
        }
    };

    export const slideInRight: Slide; 
    export const slideOutRight: Slide; 
};
declare module '*.eot';
declare module '*.otf';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';