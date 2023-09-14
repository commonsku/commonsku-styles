import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type MagicEraserIconProps = SVGIconProps & {hover?:boolean, filled?: boolean;};
export default function MagicEraserIcon({
    color=teal.main,
    size="medium",
    hover=false,
    filled=false,
    altText="AI Eraser",
    ...props
}: MagicEraserIconProps) {

    return <SVG size={size} aria-labelledby="MagicEraserIcon" {...props} >
        <title id="MagicEraserIcon" >{altText}</title>
        <path d="M20.4214 6.40604L21.3574 4.3783L23.4088 3.45302L21.3574 2.52774L20.4214 0.5L19.4853 2.52774L17.4339 3.45302L19.4853 4.3783L20.4214 6.40604Z" fill={color}/>
        <path d="M8.96951 6.40604L9.90558 4.3783L11.957 3.45302L9.90558 2.52774L8.96951 0.5L8.03345 2.52774L5.98207 3.45302L8.03345 4.3783L8.96951 6.40604Z" fill={color}/>
        <path d="M20.4214 11.8199L19.4853 13.8477L17.4339 14.7729L19.4853 15.6982L20.4214 17.7259L21.3574 15.6982L23.4088 14.7729L21.3574 13.8477L20.4214 11.8199Z" fill={color}/>
        <path d="M19.4853 9.8217L14.2374 4.62438C14.0382 4.43736 13.7892 4.33893 13.5303 4.33893C13.2714 4.33893 13.0225 4.43736 12.8233 4.62438L1.70006 15.6195C1.31169 16.0034 1.31169 16.6235 1.70006 17.0074L6.94801 22.2047C7.14717 22.4016 7.39613 22.5 7.65504 22.5C7.91395 22.5 8.1629 22.4016 8.36207 22.2145L19.4853 11.2195C19.8737 10.8356 19.8737 10.2056 19.4853 9.8217ZM13.5303 6.72103L17.3642 10.5206L14.9344 12.8928L11.1005 9.09329L13.5303 6.72103ZM7.65504 20.1277L3.82114 16.3282L9.69643 10.4812L13.5303 14.2808L7.65504 20.1277Z" fill={color}/>
    </SVG>
}
