import React from 'react';
import { SharedStyleTypes } from './SharedStyles';
import { SizerTypes } from './Sizer';
import { Button, TSize, ButtonVariant } from './Button';


export type CancelButtonProps = {
    size?: TSize;
    style?: React.CSSProperties;
    variant?: ButtonVariant;
} & SharedStyleTypes & SizerTypes;

const CancelButton = React.forwardRef<HTMLButtonElement, CancelButtonProps>(({
    size="medium",
    variant="error",
    style={},
    ...Props
}: CancelButtonProps, ref) => {
    return (
      <Button ref ={ref} variant={variant} size={size} {...Props} >Cancel</Button>
    )
});

export default CancelButton