import React from 'react';
import { SharedStyleTypes } from './SharedStyles';
import { SizerTypes } from './Sizer';
import { Button, TSize, ButtonVariant } from './Button';


export type DoneButtonProps = {
    size?: TSize;
    style?: React.CSSProperties;
    variant?: ButtonVariant;
} & SharedStyleTypes & SizerTypes;

const DoneButton = React.forwardRef<HTMLButtonElement, DoneButtonProps>(({
    size="medium",
    variant="primary",
    style={},
    ...Props
}: DoneButtonProps, ref) => {
    return (
        <Button ref ={ref} variant={variant} size={size} {...Props}>Done</Button>
    )
});

export default DoneButton