import React, { memo } from "react";
import styled, { CSSObject } from "styled-components";
import colors from './colors';
import { fontStyles } from "./Theme";
import { InfoIcon, AlertIcon, CompletedCheckmarkIcon, SkubotSpinner } from "./icons";
import LinkWithIcon from "./LinkWithIcon";
import { SharedStyleTypes, SharedStyles } from './SharedStyles';
import { SizerCss, SizerTypes } from './Sizer';

type NotificationExtraContentProps = {
  learnMore?: boolean;
  href?: string;
  linkText?: string;
  target?: string;
};
type NotificationIconProps = {
  alertType?: "neutral" | "success" | "error" | "warn" | "loading",
};
type AlertNotificationProps = React.PropsWithChildren<{
  style?: React.CSSProperties;
}>
  & NotificationIconProps
  & NotificationExtraContentProps
  & SharedStyleTypes
  & SizerTypes;

const NotificationExtraContent = memo((props: NotificationExtraContentProps) => {
  const { learnMore, linkText, href, target } = props;
  if (learnMore) {
    return (
      <LinkWithIcon href={href} style={{ marginLeft: "auto" }} pl={24} flexShrink={true} target={target}>Learn More</LinkWithIcon>
    );
  }
  if (linkText) {
    return (
      <LinkWithIcon href={href} style={{ marginLeft: "auto" }} pl={24} flexShrink={true} target={target}>{linkText}</LinkWithIcon>
    );
  }
  return null;
});

const NotificationIcon = memo((props: NotificationIconProps) => {
  const { alertType } = props;
  switch (alertType) {
    case "success":
      return <CompletedCheckmarkIcon color={colors.green.dark} mr={8} style={{ flexShrink: 0 }} />
    case "error":
      return <AlertIcon color={colors.errors.dark} mr={8} style={{ flexShrink: 0 }} />
    case "warn":
      return <AlertIcon color={colors.yellow['90']} mr={8} style={{ flexShrink: 0 }} />
    case "loading":
      return <SkubotSpinner size="tiny" skubot={false} style={{ flexShrink: 0, marginRight: 10 }} />
    default:
      return <InfoIcon color={colors.navy.dark} mr={8} style={{ flexShrink: 0 }} />
  }
});

const notificationVariantStyles = (alertType: string): CSSObject => {
  switch (alertType) {
    case "neutral":
    case "loading":
      return {
        backgroundColor: colors.navy.lightest,
        color: colors.navy.dark,
      };
    case "success":
      return {
        backgroundColor: colors.green.lightest,
        color: colors.green.darkest,
      };
    case "warn":
      return {
        backgroundColor: colors.yellow['20'],
        color: colors.yellow['90'],
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

const StyledNotification = styled.div<NotificationIconProps>`
&&& {
  font-size: ${fontStyles.p.medium.fontSize};
  font-family: ${fontStyles.p.medium.fontFamily};
  line-height: ${fontStyles.p.medium.lineHeight};
  width: fit-container;
  border-radius: 5px;
  padding: 24px 16px;
  display:flex;
  flex-direction: row;
  ${props => props.alertType ? notificationVariantStyles(props.alertType) : {}};
  ${SharedStyles}
  ${SizerCss}
}`;

const AlertNotification = ({
  href,
  linkText,
  children,
  alertType = "neutral",
  learnMore = false,
  style = {},
  target = undefined,
  ...props
}: AlertNotificationProps) => (
  <StyledNotification alertType={alertType} style={style} {...props}>
    <NotificationIcon alertType={alertType} />
    {children}
    <NotificationExtraContent href={href} learnMore={learnMore} linkText={linkText} target={target} />
  </StyledNotification>
);

export default AlertNotification;
