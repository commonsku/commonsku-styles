import React, { ReactNode, useState } from 'react';
import styled from 'styled-components'
import { getColor } from './Theme';
import { Button } from './Button';
import { DownArrowIcon, UpArrowIcon } from './icons';


export const StyledDropdown = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropDownContent = styled.div<{primary?: boolean}>`
    display: block;
    position: absolute;
    background-color: ${p => getColor(p.primary ? 'white' : 'white')};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 8px 8px;
    z-index: 1;
    border-radius: 5px;

    a {
        color: ${p => getColor(p.primary ? 'primary' : 'cta')};
        padding: 8px 8px;
        text-decoration: none;
        display: block;
        border-bottom: 1px solid ${p => getColor(p.primary ? 'primary' : 'white')};
        font-weight: bold;
        :last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: ${p => getColor(p.primary ? 'primary0' : 'cta')};
            color: ${p => getColor(p.primary ? 'texttitle' : 'white')};
            border-radius: 5px;
            cursor: pointer;
        }
    }
`;

export const Dropdown = ({ items, primary, ...props }: { items: Array<ReactNode>, primary?: boolean }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <StyledDropdown {...props}>
            <Button cta={Boolean(!primary)} onClick={() => setShowMenu(!showMenu)}>
                Actions {showMenu ? <UpArrowIcon width="10%" style={{ verticalAlign: 'middle' }} /> : <DownArrowIcon width="10%" style={{ verticalAlign: 'middle' }} />}
            </Button>
            {showMenu && <DropDownContent primary={primary}>{items}</DropDownContent>}
        </StyledDropdown>
    );
}
