import styled, {keyframes} from 'styled-components';
import  { TIconSize } from './SvgIcon';
import { SharedStyleTypes } from '../SharedStyles';
import React from 'react';


export type SkubotSpinnerProps = {
  size?: TIconSize;
  width?: string | number;
  height?: string | number;
  altText?: string;
  color?: string | undefined;
  skubot?: boolean
} & SharedStyleTypes;

const logoSizes = {
  small:{
    width:24
  },
  medium : {
    width:64
  },
  large : {
    width : 120
  },

  default : {
    width : 120
  }
}

const containerSizes = {
  small:{
    width:48
  },
  medium : {
    width:100
  },
  large : {
    width : 200
  },
  default : {
    width : 200
  }
}
const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const colors = keyframes`
  0% {
    stroke: #02c0da;
  }
  25% {
    stroke: #02c0da;
  }
  50% {
    stroke: #02c0da;
  }
  75% {
    stroke: #02c0da;
  }
  100% {
    stroke: #02c0da;
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

const Container = styled.div<{size : number}>`
  position: relative;
  width: ${props => props.size + 'px' || '200px'};
  height:  ${props => props.size + 'px' || '200px'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.svg`
  animation: ${rotator} 1.4s linear infinite;
`;

const Path = styled.circle`
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dash} 1.4s ease-in-out infinite, ${colors} 5.6s ease-in-out infinite;
`;

const Logo = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
`;



export default function SkubotSpinner({
    color= '#00C1DE',
    size="default",
    altText="loading",
    skubot = true,
    ...props
}: SkubotSpinnerProps) {
    return  (
        <Container size = {containerSizes[size] ? containerSizes[size].width : 200 }> 
        <Spinner
          width = '200px'
          height= '200px'
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
        <Path cx="33" cy="33" r="30" />
        </Spinner>
            {skubot ?
              <Logo width={logoSizes[size] ? logoSizes[size].width : 120} viewBox = "0 0 100 54.9">
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
            </Logo> :  null
          }
      </Container>
    );
}
