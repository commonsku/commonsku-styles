import React from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components'
import { themeOptions } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';
import colors from './colors';
import SkubotSpinner from './icons/SkubotSpinner';
import SVG, { SVGIconProps } from './icons/SvgIcon';

export type LightStatus = 'on' | 'off' | 'loading' | 'warning' | 'error';

type StopLightGradientProps = {
    outerColor?: string;
    outerOpacity?: number;
    innerColor?: string;
    innerOpacity?: number;
}
type LightIndicatorLightProps = SVGIconProps & {
    lit?: boolean;
    large?: boolean;
    isLoading?: boolean;
    stoplightGradient?: StopLightGradientProps;
};
export default function LightIndicatorLight({
    width = 10,
    height = 10,
    lit = false,
    large = false,
    isLoading = false,
    stoplightGradient = {},
    ...props
}: LightIndicatorLightProps) {

    const size = large ? 16 : 10;
    const circleSize = large ? 8 : 10;
    const gradientTransform = large ? "matrix(0 8 -8 0 8 8)" : "matrix(0 10 -10 0 10 10)";

    if (isLoading) {
        // Resize the spinner logo to match the light indicator size and position
        const resizeFactor = large ? 0.667 : 0.83;
        const margin = large ? "5px 11px 1px -3px" : "7px 9px 1px -1px";

        return <SkubotSpinner
            skubot={false}
            spinnerSize={size * resizeFactor}
            containerSize={size}
            style={{ margin }}
            color={colors.primary}
            spinnerWeight={circleSize}
        />
    }

    const lightID = uniqueId("LightIndicatorLight");

    const fillOpacity = lit ? 1 : 0.6;
    const stoplightColours = {
        ...{
            outerColor: "#9D9D9D",
            outerOpacity: 1,
            innerColor: "#E4E4E4",
            innerOpacity: 0.39,
        },
        ...stoplightGradient
    };
    const stoplight = (
        <>
            <stop stopColor={stoplightColours.innerColor} stopOpacity={stoplightColours.innerOpacity} />
            <stop offset={1} stopColor={stoplightColours.outerColor} stopOpacity={stoplightColours.outerOpacity} />
        </>
    );

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
        if (props.LightIndicatorTextColor === true) {
            return colors.neutrals.bodyText;
        }
        return colors.neutrals[70];
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

type LightIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
    name: string;
    on?: boolean;
    status?: LightStatus
    large?: boolean;
    textProps?: React.HTMLAttributes<HTMLParagraphElement>;
    stoplightGradient?: StopLightGradientProps;
    lightStyles?: React.CSSProperties;
}

export function LightIndicator({
    name = "Name this Indicator",
    on = false,
    status = 'off',
    large = false,
    textProps = {},
    stoplightGradient,
    lightStyles = {},
    ...props
}: LightIndicatorProps) {
    const lit = (['on', 'error']).includes(status) || on === true;
    let lightTheme = {};
    switch (status) {
        case 'error':
            lightTheme = { outerColor: colors.errors[50], innerColor: colors.errors[50] };
            break;
        case 'warning':
            lightTheme = { outerColor: colors.secondary2[60], innerColor: colors.secondary2[20] };
            break;
        default:
            if (lit) {
                lightTheme = { outerColor: "#01D374", innerColor: "#01D374" };
            }
            break;
    }
    return (
        <LightIndicatorContainer {...props}>
            <LightIndicatorLight
                large={large}
                lit={lit}
                mr={8}
                mt={8}
                isLoading={status === 'loading'}
                stoplightGradient={stoplightGradient ?? lightTheme}
                style={lightStyles}
            />
            <LightIndicatorText {...textProps} large={large} LightIndicatorTextColor={lit} >{name}</LightIndicatorText>
        </LightIndicatorContainer>
    );
}
