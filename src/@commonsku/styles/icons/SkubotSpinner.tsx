import React from 'react';
import styled, { keyframes } from "styled-components";
import { TIconSize } from "./SvgIcon";
import { SharedStyleTypes } from "../SharedStyles";
import SkubotLogo from "./SkubotLogo";
import { teal } from "../colors";

export type SkubotSpinnerProps = {
  size?: TIconSize | "button";
  width?: string | number;
  height?: string | number;
  altText?: string;
  color?: string | undefined;
  skubot?: boolean;
  style?: React.CSSProperties;
} & SharedStyleTypes;

const logoSizes = {
  tiny: {
    width: 24,
  },
  small: {
    width: 40,
  },
  medium: {
    width: 64,
  },
  large: {
    width: 120,
  },

  default: {
    width: 120,
  },
};

const containerSizes = {
  button: {
    width: 24,
  },
  tiny: {
    width: 48,
  },
  small: {
    width: 64,
  },
  medium: {
    width: 100,
  },
  large: {
    width: 200,
  },
  default: {
    width: 200,
  },
};
const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const colors = (color: string) => keyframes`
  0%, 25%, 50%, 75%, 100% {
    stroke: ${color};
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

const Container = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size + "px" || "200px"};
  height: ${(props) => props.size + "px" || "200px"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.svg`
  animation: ${rotator} 1.4s linear infinite;
`;

const Path = styled.circle<{ color: string }>`
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dash} 1.4s ease-in-out infinite,
    ${(props) => colors(props.color)} 5.6s ease-in-out infinite;
`;

export default function SkubotSpinner({
  color = teal.main,
  size = "default",
  altText = "loading",
  skubot = size !== "button",
  style={},
  ...props
}: SkubotSpinnerProps) {
  return (
    <Container size={containerSizes[size] ? containerSizes[size].width : 200} style={style}>
      <Spinner
        width={containerSizes[size] ? containerSizes[size].width : 200}
        height={containerSizes[size] ? containerSizes[size].width : 200}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path cx="33" cy="33" r="30" color={color} />
      </Spinner>
      {skubot ? (
        <SkubotLogo
          width={logoSizes[size] ? logoSizes[size].width : 120}
          color={color}
          style={{ position: "absolute" }}
        />
      ) : null}
    </Container>
  );
}
