import React from 'react';
import { SharedStyleTypes } from './SharedStyles';
import { SizerTypes } from './Sizer';
import { Button, IconButton, TSize, ButtonVariant } from './Button';


export type CancelButtonProps = {
    size?: TSize;
    style?: React.CSSProperties;
    variant?: ButtonVariant;
} & SharedStyleTypes & SizerTypes;

export default function CancelButton({
    size="medium",
    variant="error",
    style={},
    ...Props
}: CancelButtonProps){
    return (
        <Button variant={variant} size={size} >Cancel</Button>
    )
};