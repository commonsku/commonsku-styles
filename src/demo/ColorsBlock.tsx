import React, { useState } from "react";
import styled, { css, CSSObject } from "styled-components";
import { fontStyles } from '../@commonsku/styles/Theme';
import { SharedStyleTypes, SizerTypes } from '../@commonsku/styles/';
import { neutrals} from "../@commonsku/styles/colors";

type ColorsBlockProps = React.PropsWithChildren <{
    colors: {
        highlighted?: boolean; 
        color: string; 
        label: string, 
        hex: string, 
        labelColor?: string, 
        style?:CSSObject,
    }[];
    style?: React.CSSProperties;
} & SharedStyleTypes & SizerTypes> ;

const ColorsContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 312px;
`;

const ColorBlock = styled.div<{color: string, hover:boolean}>`
    &&& { 
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        position:relative;
        padding-right: 8px;
        padding-left:8px;
        min-height: 48px;
        background-color: ${props => props.color};
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
            transition: .2s ease-in-out;
        }  
    } 
`;

const HighlightedColor = styled.div<{
        color: string, 
        hover: boolean, 
        style?: CSSObject
    }>`
    &&& {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:flex-end;
        position:relative;
        padding-right: 8px;
        padding-left:8px;
        height: 160px;
        margin-bottom: 32px;
        border-radius: 5px;
        background-color: ${props => props.color};
        cursor: pointer;
        ${props => css(props.style ? props.style: {})};

        &:hover {
            transform: scale(1.05);
            transition: .2s ease-in-out;
        }  

        
    }
`;

const ColorBlockText = styled.p<{labelColor ?: string}>`
    font-family: ${fontStyles.p.medium.fontFamily};
    font-size: ${fontStyles.p.medium.fontSize};
    color: ${props => props.labelColor ? props.labelColor : "white"};
`;

const ColorBlockHoverContainer = styled.div<{show?: boolean}>`
    display: ${props => props.show ? 'flex' : 'none'};
    background-color: white;
    position:absolute;
    z-index:2;
    top:0;
    left:0;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    opacity: .8;
`;

const ColorBlockHoverText = styled.div<{show?: boolean}>`
    display: ${props => props.show ? 'flex' : 'none'};
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:3;
    font-family: ${fontStyles.p.large.fontFamily};
    font-size: ${fontStyles.p.large.fontSize};
    justify-content: center;
    align-items: center;
    color: ${neutrals.bodyText};
    opacity:1;
`;


export default function ColorsBlock({
    colors,
    style={},
    ...props
}: ColorsBlockProps) {

    // create new array with highlighted colors at the beginning of the array

    function findHighlightedColor(colors) {
        return colors.highlighted;
    }

    function findRestColors(colors) {
        return !colors.highlighted;
    }

    const highlightedColor = colors.filter(findHighlightedColor);
    const restColors = colors.filter(findRestColors);
    const newColors = [...highlightedColor, ...restColors];


    // hover and clicked (copied) state

    const [hoveredColorBlock, setHoveredColorBlock] = useState<any>(null);
    const [isCopied, setCopied] = useState<any>(null);

    
    const RenderColorsBlock = newColors.map((color, index) => {

        let isHover = hoveredColorBlock === index ? true : false;

        function copyToClipboard(){
            if(color.label.includes(' ') === false) {
                console.log('no space');
                navigator.clipboard.writeText(color.label);
            } else {
                navigator.clipboard.writeText(color.label.substr(0, color.label.indexOf(' ')));
            }
        };
 
        if(color.highlighted === true) {
            return (
                <HighlightedColor 
                key={index}
                color={color.color} 
                onMouseEnter={() => setHoveredColorBlock(index)}
                onMouseLeave={() => setHoveredColorBlock(null)}
                hover={isHover}
                style={{...color.style}}
                onClick={() => { 
                    copyToClipboard();
                    setCopied(index);
                }}>
                    {/* Hover Overlay */}
                    <ColorBlockHoverContainer show={isHover} ></ColorBlockHoverContainer>
                    <ColorBlockHoverText show={isHover}>
                            {isCopied === index ? 'Copied!' : 'Click to copy'}
                    </ColorBlockHoverText>
                    
                    {/* Label and hex */}
                    <ColorBlockText labelColor={color.labelColor}>{color.label}</ColorBlockText>
                    <ColorBlockText labelColor={color.labelColor}>{ color.hex.toUpperCase()}</ColorBlockText>
                </HighlightedColor>
            )
        }
        return (
            <ColorBlock 
                key={index}
                color={color.color}
                onMouseEnter={() => setHoveredColorBlock(index)}
                onMouseLeave={() => setHoveredColorBlock(null)}
                hover={isHover}
                onClick={() => { 
                    copyToClipboard();
                    setCopied(index);
                }}
            >   
                {/* Hover Overlay */}
                <ColorBlockHoverContainer show={isHover} ></ColorBlockHoverContainer>
                <ColorBlockHoverText show={isHover}>
                        {isCopied === index ? 'Copied!' : 'Click to copy'}
                </ColorBlockHoverText>
                    
                {/* Label and hex */}
                <ColorBlockText labelColor={color.labelColor}>{color.label}</ColorBlockText>
                <ColorBlockText labelColor={color.labelColor}>{color.hex.toUpperCase()}</ColorBlockText>
            </ColorBlock>
        )
    });

    return (
        <ColorsContainer>
            {RenderColorsBlock}
         </ColorsContainer>

        
    )
        
};