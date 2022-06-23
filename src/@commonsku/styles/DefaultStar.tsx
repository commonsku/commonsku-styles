import React, { useState } from 'react';
import styled from 'styled-components';
import { themeOptions } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import colors, { teal } from './colors';
import StarIcon from './icons/StarIcon';

type DefaultStarTextProps = {
    hover?: boolean;
    clicked?: boolean;
    hoverText: string;
    color?: string;
};

const DefaultStarText = styled.p<DefaultStarTextProps>`
    &&& {
        opacity: ${props => props.clicked ? 1 : props.hover ? 0.8 : 0};
        font-size: ${themeOptions.fontStyles.p.medium.fontSize};
        font-family: ${themeOptions.fontStyles.p.medium.fontFamily};
        line-height: ${themeOptions.fontStyles.p.medium.lineHeight};
        color: ${props => props.clicked ? props.color : colors.neutrals[60]};
        max-width: 180px;
        margin-top:0;
        margin-bottom:0;
    };
`;

type DefaultStarContainerProps = {
    noText?: boolean;
    width?: string | number;
};

const DefaultStarContainer = styled.div<SharedStyleTypes & SizerTypes & DefaultStarContainerProps>`
  &&& {
    display: flex;
    vertical-align: middle;
    align-items: top;
    width: ${props => props.width ? props.width : props.noText ? '24px' : '128px'};
    margin-bottom: 16px;
    margin-right: 16px;
    cursor: pointer;
    ${SharedStyles}
    ${SizerCss}
  }
`;

type DefaultStarProps = React.PropsWithChildren<{
    initialSelected ?: boolean;
    forceSelected?: boolean;
    hoverText?: any;
    noText?: boolean;
    width?: string | number;
    color?: string;
}>

export default function DefaultStar({
    initialSelected=false,
    forceSelected=false,
    hoverText,
    noText=false,
    children="Default",
    width,
    color=teal.main,
    ...props
}: DefaultStarProps ) {

    if(!hoverText) {
        hoverText = children
    }

    const [isHover, setHover] = useState(initialSelected);
    const [isClicked, setClicked] = useState(initialSelected);

    return (
       <DefaultStarContainer 
            onClick={() => setClicked(!isClicked)} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} 
            noText={noText} 
            width={width}>
                <StarIcon 
                    hover={isHover} 
                    filled={isHover || isClicked || forceSelected}
                    color={color} 
                    mr={noText ? 0 : 8}
                />
                {noText ? null : 
                    <DefaultStarText  
                        hoverText={hoverText} 
                        hover={isHover} 
                        clicked={isClicked || forceSelected}
                        color={color}
                    >
                             {!isClicked && isHover ? hoverText : children}

                    </ DefaultStarText>
                }
       </DefaultStarContainer>
    );
}
    
    