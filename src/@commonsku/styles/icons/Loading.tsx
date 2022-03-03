import React from "react";
import { generateColor } from "../../utils";
import { colors } from "../Theme";
import { SharedStyleTypes } from "../SharedStyles";
import SVG from "./SVG";


function Loading({
    height = 50,
    width,
    animationDuration = 1000,
    barWidth = 14,
    barRadius = 2,
    colorful = false,
    bars = 4,
    viewBox = "10 0 51 50",
    rotate=false,
    startColor,
    endColor,
    ...props
}: {
    height?: number,
    width?: number,
    animationDuration?: number,
    barWidth?: number,
    barRadius?: number,
    colorful?: boolean,
    bars?: number,
    viewBox?: string,
    startColor?: string,
    endColor?: string,
    rotate?: boolean,
} & SharedStyleTypes) {
    const colorGradient = colorful
        ? generateColor(startColor || colors.special1, endColor || colors.primary, bars)
        : generateColor(startColor || colors.primary, endColor || colors.primary0, bars);

    const generateBar = (v: number) => {
        return (
            <rect
                key={`bar_${v}`}
                x={19 * v}
                y="0"
                width={barWidth || 14}
                height={height}
                fill={`#${colorGradient[v]}`}
                rx={barRadius}
            >
                <animate
                    attributeName="height"
                    values="50;10;50"
                    begin={`${v * 0.2}s`}
                    dur={`${animationDuration / 1000}s`}
                    repeatCount="indefinite"
                />
            </rect>
        );
    };

    const generateBars = () => {
        const result = [] as any[];
        for (let i = 0; i < bars; i++) {
          result.push(generateBar(i));
        }
        return result;
    };

    return (
        <SVG
            width={width ? `${width}px` : "100%"}
            height={height ? `${height}px` : "100%"}
            viewBox={viewBox}
            transform="scale(1, -1) translate(0, -1)"
            {...props}
        >{generateBars()}</SVG>
    );
}

export default Loading;
