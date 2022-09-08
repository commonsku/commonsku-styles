import React from "react";
import styled, { CSSObject } from "styled-components";
import colors from './colors';
import { fontStyles } from "./Theme";
import { InfoIcon, AlertIcon, CompletedCheckmarkIcon } from "./icons";
import LinkWithIcon from "./LinkWithIcon";
import { SharedStyleTypes, SharedStyles } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';

type AlertNotificationProps = React.PropsWithChildren<{
    alertType?: "neutral" | "success" | "error",
    style?: React.CSSProperties;
    learnMore ?: boolean;
    href?: string;
    linkText?: string;
}> & SharedStyleTypes & SizerTypes;


const NotificationVariantStyles = (alertType: string): CSSObject => {
    
    switch(alertType){
        case "neutral":
            return {
                backgroundColor: colors.navy.lightest,
                color: colors.navy.dark,
            };
                
        case "success":
            return {
                backgroundColor: colors.green.lightest,
                color: colors.green.darkest,
            };
        case "error":
            return {
                backgroundColor: colors.errors.lightest,
                color: colors.errors.dark,
            };
        default: 
            return {};
    }
};

const StyledNotification = styled.div<{alertType?: string }>`
    &&& {
        font-size: ${fontStyles.p.medium.fontSize};
        font-family: ${fontStyles.p.medium.fontFamily};
        line-height: ${fontStyles.p.medium.lineHeight};
        width: fit-container;
        border-radius: 5px;
        padding: 24px 16px;
        display:flex;
        flex-direction: row;
        ${props => props.alertType ? NotificationVariantStyles(props.alertType): {}};
        ${SharedStyles}
        ${SizerCss}
    }
`;

export default function AlertNotification({
    alertType="neutral",
    learnMore=false,
    href,
    linkText,
    children, 
    style={},
    ...props
}: AlertNotificationProps){

    function notificationIcon(){
        if(alertType === "success") {
            return <CompletedCheckmarkIcon color={colors.green.dark} mr={8} style={{flexShrink: 0}}/> 
        } else if (alertType === "error") {
            return <AlertIcon color={colors.errors.dark} mr={8} style={{flexShrink: 0}}/>
        } else {
            return <InfoIcon color={colors.navy.dark} mr={8} style={{flexShrink: 0}}/>
        }
    };

    NotificationVariantStyles(alertType);
    
    return (
        <StyledNotification alertType={alertType} {...props}>
            {notificationIcon()}
            {children}
            {learnMore ? 
            <LinkWithIcon href={href} style={{marginLeft: "auto"}} pl={24} flexShrink={true}>Learn More</LinkWithIcon> 
            : 
            linkText ? 
            <LinkWithIcon href={href} style={{marginLeft: "auto"}} pl={24} flexShrink={true}>{linkText}</LinkWithIcon>
            : null
            }
        </StyledNotification>
    )
};
