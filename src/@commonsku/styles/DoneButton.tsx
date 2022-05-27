import React from 'react';
import { SharedStyleTypes } from './SharedStyles';
import { SizerTypes } from './Sizer';
import { Button, TSize, ButtonVariant } from './Button';


export type DoneButtonProps = {
    size?: TSize;
    style?: React.CSSProperties;
    variant?: ButtonVariant;
} & SharedStyleTypes & SizerTypes;

export default function DoneButton({
    size="medium",
    variant="primary",
    style={},
    ...Props
}: DoneButtonProps){
    return (
        <Button variant={variant} size={size} {...Props}>Done</Button>
    )
};