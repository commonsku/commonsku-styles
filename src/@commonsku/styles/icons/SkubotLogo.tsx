import React from 'react';
import  SVG, { TIconSize } from './SvgIcon';
import { SharedStyleTypes } from '../SharedStyles';

export type SkubotLogoProps = {
    size?: TIconSize;
    width?: string | number;
    height?: string | number;
    altText?: string;
    color?: string | undefined;
  } & SharedStyleTypes;


export default function SkubotLogo({
    color= '#00C1DE',
    width =64,
    height= 64,
    altText="Skubot Logo",
    ...props
}: SkubotLogoProps) {
    return  (
        <SVG width={width} height = {height} viewBox = "0 0 100 54.9">
        <circle fill= {color}cx="2.7" cy="30.2" r="2.7"/>
        <circle fill= {color} cx="97.3" cy="30.2" r="2.7"/>
        <path fill= {color} d="M91,28.5c-0.1-2.3-0.4-4.6-0.8-6.8c-0.2-0.9-1-1.5-1.9-1.5h-6.8V9.7c0-1.4-0.8-2.5-1.7-2.5
    c-4.8-0.9-9.6-1.5-14.5-2V3.4c0-0.9-0.6-1.8-1.6-2C59.2,0.5,54.6,0,50,0c-4.6,0-9.2,0.5-13.6,1.4c-0.9,0.2-1.6,1-1.6,2v1.9
    c-4.8,0.4-9.7,1.1-14.5,2c-0.5,0-0.9,0.3-1.2,0.7c-0.3,0.4-0.5,1.1-0.5,1.7v10.4h-6.8c-0.9,0-1.8,0.6-1.9,1.5
    C9.4,24,9.1,26.2,9,28.5V31c0.1,2.3,0.4,4.6,0.8,6.8c0.2,0.9,1,1.5,1.9,1.5h6.8V50c0,1.4,0.8,2.5,1.7,2.5
    c9.8,1.6,19.8,2.5,29.7,2.5c9.9,0,19.8-0.8,29.7-2.5c0.5,0,0.9-0.3,1.2-0.7c0.3-0.4,0.5-1.1,0.5-1.7V39.4h6.8
    c0.9,0,1.8-0.6,1.9-1.5c0.5-2.3,0.8-4.5,0.8-6.8V28.5z M76.6,45.7c0,1.1-0.9,2-2,2c-16.3,2.5-32.9,2.5-49.3,0c-0.5,0-1-0.2-1.4-0.6
    c-0.4-0.4-0.6-0.8-0.6-1.4V13.8c0-1.1,0.9-2,2-2C33.5,10.6,41.8,10,50,10c8.2,0,16.5,0.6,24.6,1.8c0.5,0,1,0.2,1.4,0.6
    c0.4,0.4,0.6,0.8,0.6,1.4V45.7z"/>
    <path fill= {color} d="M37.2,39L37.2,39c-2.7,0-4.9-2.2-4.9-4.9v-7.8c0-2.7,2.2-4.9,4.9-4.9h0c2.7,0,4.9,2.2,4.9,4.9v7.8
    C42.1,36.8,39.9,39,37.2,39z"/>
    <path fill= {color} d="M62.8,39L62.8,39c-2.7,0-4.9-2.2-4.9-4.9v-7.8c0-2.7,2.2-4.9,4.9-4.9h0c2.7,0,4.9,2.2,4.9,4.9v7.8
    C67.8,36.8,65.5,39,62.8,39z"/>
    </SVG>
    );
}