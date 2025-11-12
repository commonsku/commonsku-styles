import React from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components'
import { themeOptions } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import colors from './colors';
import SVG, { SVGIconProps } from './icons/SvgIcon';

type LightStatus = 'on' | 'off' | 'error';

type LightIndicatorLightProps = SVGIconProps & { lit?: boolean; large?: boolean; isError?: boolean; };
export default function LightIndicatorLight({
    width = 10,
    height = 10,
    lit = false,
    large = false,
    isError = false,
    ...props
}: LightIndicatorLightProps) {

    const size = large ? 16 : 10;
    const circleSize = large ? 8 : 10;
    const gradientTransform = large ? "matrix(0 8 -8 0 8 8)" : "matrix(0 10 -10 0 10 10)";

    const lightID = uniqueId("LightIndicatorLight");

    const fillOpacity =
        lit || isError ? 1 : 0.6;

    let stoplight = (
        <>
            <stop stopColor="#E4E4E4" stopOpacity={0.39} />
            <stop offset={1} stopColor="#9D9D9D" />
        </>
    );
    if (lit) { // lit has to come before isError because lit is true for error state as well
        stoplight = (
            <>
                <stop stopColor="#01D374" stopOpacity={0.39} />
                <stop offset={1} stopColor="#01D374" />
            </>
        );
    }
    if (isError) {
        stoplight = (
            <>
                <stop stopColor={colors.errors[50]} stopOpacity={0.39} />
                <stop offset={1} stopColor={colors.errors[50]} />
            </>
        );
    }

    return <SVG width={size} height={size} {...props} >
        <circle cx={circleSize} cy={circleSize} r={circleSize} fill={`url(#${lightID})`} fillOpacity={fillOpacity} />
        <defs>
            <radialGradient
                id={lightID}
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform={gradientTransform}
            >
                {stoplight}
            </radialGradient>
        </defs>
    </SVG>
}

type LightIndicatorTextType = {
    LightIndicatorTextColor: boolean;
    large?: boolean;
}
const LightIndicatorText = styled.p<LightIndicatorTextType>`
    &&& {
        font-size: ${props => props.large ? themeOptions.fontStyles.p.medium.fontSize : themeOptions.fontStyles.p.small.fontSize};
        font-family: ${themeOptions.fontStyles.p.small.fontFamily};
        line-height: ${themeOptions.fontStyles.p.small.lineHeight};
        color: ${props => {
        if (props.LightIndicatorTextColor === true) return colors.neutrals.bodyText;
        else return colors.neutrals[70]
    }};
        margin-top:0;
        margin-bottom:0;
    };
`;

const LightIndicatorContainer = styled.div<SharedStyleTypes & SizerTypes>`
  &&& {
    display: flex;
    vertical-align: middle;
    align-items: top;
    max-width: 100%;
    margin-bottom: 8px;
    margin-right: 16px;
    ${SharedStyles}
    ${SizerCss}
  }
`;

type LightIndicatorProps = {
    name: string;
    on?: boolean;
    status?: LightStatus
    large?: boolean;
    textProps?: React.HTMLAttributes<HTMLParagraphElement>;
}

export function LightIndicator({
    name = "Name this Indicator",
    on = false,
    status = 'off',
    large = false,
    textProps = {},
    ...props
}: LightIndicatorProps) {
    const lit = status === 'on' || status === 'error' || on === true;
    return (
        <LightIndicatorContainer {...props}>
            <LightIndicatorLight large={large} lit={lit} mr={8} mt={8} isError={status === 'error'} />
            <LightIndicatorText {...textProps} large={large} LightIndicatorTextColor={lit} >{name}</LightIndicatorText>
        </LightIndicatorContainer>
    );
}
