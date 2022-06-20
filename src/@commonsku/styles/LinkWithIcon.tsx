import React, { useState } from "react";
import styled from "styled-components";
import colors from './colors';
import { fontStyles } from "./Theme";
import { SharedStyleTypes, SharedStyles } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import { TButtonIcon } from "./Button";

const StyledLink = styled.a<{alertType?: string, color?: string, hoverColor?: string, flexShrink?: boolean}>`
    &&& {
        font-size: ${fontStyles.p.medium.fontSize};
        font-family: ${fontStyles.p.medium.fontFamily};
        line-height: ${fontStyles.p.medium.lineHeight};
        color: ${props => props.color || colors.teal.main};
        text-decoration: none;
        cursor: pointer;
        display: flex;
        ${props => props.flexShrink ? `flex-shrink: 0;` : null};
        ${SharedStyles}
        ${SizerCss}
        &:hover {
            color: ${props => props.hoverColor ? props.hoverColor : colors.teal.dark};
        }
    }  
`;

type IconFuncProps = { color: string; [key: string]: any };

export type LinkWithIconProps = React.PropsWithChildren<{
  Icon?: TButtonIcon | React.ReactElement<IconFuncProps>;
  href?: string; 
  color?: string;
  hoverColor?: string;
  flexShrink?: boolean;
  iconProps?: {[key: string]: any};
  style?: React.CSSProperties;
} & SharedStyleTypes & SizerTypes>;

export default function LinkWithIcon({
    Icon,
    href,
    children,
    color=colors.teal.main,
    hoverColor=colors.teal.dark,
    flexShrink=false,
    iconProps,
    style={},
    ...props
}: LinkWithIconProps){

    const [isHover, setHover] = useState(false);

    const RenderIcon = React.useMemo(() => {
        if (!Icon) { return null; }

        if (typeof Icon !== 'function') {
          return React.cloneElement(Icon, iconProps);
        }
    
        return (
          <Icon 
            color={isHover ? hoverColor : color} 
            mr={8} 
            style={{flexShrink: "0"}}
            {...iconProps} 
            />
        );
      }, [Icon, color, hoverColor, iconProps, isHover]);

    return(
        <StyledLink 
            href={href} 
            color={color} 
            hoverColor={hoverColor} 
            flexShrink={flexShrink}
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} 
            style={style}
            {...props}
        >
            {RenderIcon}
            {children}
        </StyledLink>
    )
}