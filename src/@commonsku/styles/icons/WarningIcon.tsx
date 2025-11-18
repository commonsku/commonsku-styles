import SVG, { SVGIconProps } from './SvgIcon';
import { yellow } from '../colors';

type WarningIconProps = SVGIconProps & { filled?: boolean; };
export default function WarningIcon({
    color = yellow.dark,
    size = "medium",
    filled = false,
    altText = "Warning",
    ...props
}: WarningIconProps) {
    const renderPath = filled ? "M4.47012 20.5036H19.5301C21.0701 20.5036 22.0301 18.8336 21.2601 17.5036L13.7301 4.49359C12.9601 3.16359 11.0401 3.16359 10.2701 4.49359L2.74012 17.5036C1.97012 18.8336 2.93012 20.5036 4.47012 20.5036ZM12.0001 13.5036C11.4501 13.5036 11.0001 13.0536 11.0001 12.5036V10.5036C11.0001 9.95359 11.4501 9.50359 12.0001 9.50359C12.5501 9.50359 13.0001 9.95359 13.0001 10.5036V12.5036C13.0001 13.0536 12.5501 13.5036 12.0001 13.5036ZM13.0001 17.5036H11.0001V15.5036H13.0001V17.5036Z"
        :
        "M12 5.49375L19.53 18.5037H4.47L12 5.49375ZM2.74 17.5037C1.97 18.8337 2.93 20.5037 4.47 20.5037H19.53C21.07 20.5037 22.03 18.8337 21.26 17.5037L13.73 4.49375C12.96 3.16375 11.04 3.16375 10.27 4.49375L2.74 17.5037ZM11 10.5037V12.5037C11 13.0537 11.45 13.5037 12 13.5037C12.55 13.5037 13 13.0537 13 12.5037V10.5037C13 9.95375 12.55 9.50375 12 9.50375C11.45 9.50375 11 9.95375 11 10.5037ZM11 15.5037H13V17.5037H11V15.5037Z";

    return <SVG size={size} aria-labelledby="WarningIcon" {...props}>
        <title id="WarningIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

