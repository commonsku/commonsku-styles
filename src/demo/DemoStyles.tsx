import React from 'react';
import styled from 'styled-components'
import { colors, fontStyles } from '../@commonsku/styles/Theme';
import { SharedStyles, SharedStyleTypes } from '@commonsku/styles';

export const mainTitle = styled.h1<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.h1.fontFamily};
    font-size: 40px;
    line-height: 64px;
    color: ${colors.teal.main};
    margin-bottom: 24px;
    margin-top: 0px;
    margin-right: 24px;
    display: block;
    ${SharedStyles}
`;


export const H1 = styled.h1<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.h1.fontFamily};
    font-size: ${fontStyles.h1.fontSize};
    line-height: ${fontStyles.h1.lineHeight};
    color: ${colors.neutrals.bodyText};
    margin-bottom: 24px;
    margin-top: 0px;
    margin-right: 24px;
    display: block;
    // border-bottom: ${props => props.underline ? `1px solid ${colors.neutrals[50]}` : `none`};
    ${SharedStyles}
`;

export const H2 = styled.h2<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.h2.fontFamily};
    font-size: ${fontStyles.h2.fontSize};
    line-height: ${fontStyles.h2.lineHeight};
    color: ${colors.neutrals.bodyText};
    margin-bottom: 24px;
    margin-top: 0px;
    margin-right: 24px;
    display: block;
    // border-bottom: ${props => props.underline ? `1px solid ${colors.neutrals[50]}` : `none`};
    ${SharedStyles}
`;

export const H3 = styled.h3<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.h3.fontFamily};
    font-size: ${fontStyles.h3.fontSize};
    line-height: ${fontStyles.h3.lineHeight};
    color: ${colors.neutrals.bodyText};
    margin-bottom: 24px;
    margin-top: 0px;
    margin-right: 24px;
    display: block;
    // border-bottom: ${props => props.underline ? `1px solid ${colors.neutrals[50]}` : `none`};
    ${SharedStyles}
`;

export const SmallLabel = styled.p<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.p.small.fontFamily};
    font-size: ${fontStyles.p.small.fontSize};
    line-height: ${fontStyles.p.small.lineHeight};
    color: ${colors.neutrals.bodyText};
    margin-bottom: "8px";
    margin-right: "8px";
    border-bottom: ${props => props.underline ? `1px solid ${colors.neutrals[50]}` : `none`};
    ${SharedStyles}
`;

export const MediumLabel = styled.p<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.p.medium.fontFamily};
    font-size: ${fontStyles.p.medium.fontSize};
    line-height: ${fontStyles.p.medium.lineHeight};
    color: ${colors.neutrals.bodyText};
    margin-bottom: "8px";
    margin-right: "8px";
    border-bottom: ${props => props.underline ? `1px solid ${colors.neutrals[50]}` : `none`};
    ${SharedStyles}
`;

export const LargeLabel = styled.p<{ underline?: boolean } & SharedStyleTypes>`
    font-family: ${fontStyles.p.large.fontFamily};
    font-size: ${fontStyles.p.large.fontSize};
    line-height: ${fontStyles.p.large.lineHeight};
    color: ${colors.neutrals.bodyText};
    margin-bottom: "16px";
    margin-right: "8px";
    border-bottom: ${props => props.underline ? `1px solid ${colors.neutrals[50]}` : `none`};
    ${SharedStyles}
`;

const OuterBox = styled.div`
    display:flex;
    flex-direction:column;
    width: auto;
    margin: 24px 0;
    padding: 24px;
    border-radius: 12px;
    background-color: ${colors.neutrals.white}
`;

const InnerBox = styled.div<{ borderless?: boolean, padded?: boolean } & SharedStyleTypes>`
    display:block;
    width: 100%;
    margin-top: 24px;
    margin-bottom: 24px;
    padding: 0;
    ${SharedStyles}
`;

export const SeperationLine = styled.hr`
    width: 100%;
    border: 1px solid ${colors.neutrals[50]};
    border-radius: 5px;
    margin-top: 40px;
`;


type ContainerProps = React.PropsWithChildren<{
  title?: string | React.ReactNode,
  id?: string;
  href?: string;
  class?: string;
  noBottomLine?: boolean;
} & SharedStyleTypes>;

export let OuterContainerArray: Array<string | undefined> = [];

export let InnerContainerArray: Array<string | undefined> = [];



export const OuterContainer = ({
    title,
    href,
    children,
    ...props
  }: ContainerProps) => {


   if(props => props.id) {
      OuterContainerArray.push(props.id)
    } else {

    };

    return (
      <OuterBox className="outer" {...props}>
        {title ? <H1>{title}</H1> : null}
        {children}
      </OuterBox>
    )
};


export function InnerContainer({
  title,
  noBottomLine,
  children,
  ...props
}: ContainerProps) {


  if(props => props.id !== undefined) {
    InnerContainerArray.push(props.id);
  } 
  

  return (<InnerBox className="inner" {...props}>
    {title ? <H2>{title}</H2> : null}
    {children}
    {noBottomLine ? null : <SeperationLine />}
  </InnerBox>
  )
};

InnerContainerArray = InnerContainerArray.filter(function( element ) {
  return element !== undefined;
});
