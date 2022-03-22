import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css, CSSObject } from 'styled-components'
import {themeOptions } from './Theme';
import colors, { primary1 } from './colors';
import {TButtonIcon} from './Button';

export const IconContainer = styled.div`
  display:flex;
  width:100%;
  flex-wrap: wrap;
  > * {
    margin-right:32px;
    margin-bottom:32px;
  }
`;

export const IconGroup = styled.div`
  > * {
  margin-right: 8px;
  }
  *:last-child {
      margin-right: 0;
  }
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  text-align: center;
`;

export const IconLabel = styled.p`
&&& {
  font-family: ${themeOptions.fontStyles.p.small.fontFamily};
  font-size: ${themeOptions.fontStyles.p.small.fontSize};
  color: ${colors.neutrals.bodyText};
  margin-top:8px;
};
`;

// type IconFuncProps = { fill: string; [key: string]: any };

type ShowcaseProps ={
    name: string;
    size?: string;
    iconColor?: string;
    iconProps?: {[key: string]: any};
    style?: React.CSSProperties;
};

type IconShowcaseProps = ShowcaseProps & {
    Icon: TButtonIcon;
};

export function IconShowcase({
Icon,
name,
iconColor=primary1.main,
iconProps,
size="medium",
...props
}: IconShowcaseProps) {

    return (
        <IconBox>
            <IconGroup>
            <Icon fill={iconColor} size={size} {...iconProps}/>
            </IconGroup>
            <IconLabel>{name}</IconLabel>
        </IconBox>
    );
}


type IconsShowcaseProps = ShowcaseProps & {
  Icons: React.ReactElement[];
};

export function IconsShowcase({
  Icons,
  name,
  iconColor=primary1.main,
  iconProps,
  size="medium"
}: IconsShowcaseProps) {

    return (
        <IconBox>
            <IconGroup>
             {Icons.map((Icon, i) => React.cloneElement(Icon, { 
                //  fill: iconColor, 
                //  color: iconColor,
                 size: size, 
                //  width: "24",
                 ...iconProps
                 }
                ))}
            </IconGroup>
            <IconLabel>{name}</IconLabel>
        </IconBox>
    );
}

