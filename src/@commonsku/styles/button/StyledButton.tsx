import React, { forwardRef } from 'react';
import { ButtonProps } from './types';
import { getBaseButtonStyles } from './styles';
import Csku from '../Csku';

const StyledButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return (
        <Csku
            as='button'
            ref={ref}
            style={getBaseButtonStyles(props)}
        />
    );
});

export default StyledButton;
