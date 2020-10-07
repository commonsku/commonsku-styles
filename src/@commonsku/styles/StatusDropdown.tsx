import React, { ReactNode, useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import { getColor } from './Theme';
import { Button } from './Button';
import { document } from '../utils';

const StyledDropdown = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

type DropdownContentProps = {
    text?: string,
    color?: string,
    active?: boolean,
    rounded?: boolean,
}

const DropdownItem = styled.div<DropdownContentProps>`
    color: white;
    padding: 8px 8px;
    text-decoration: none;
    display: block;
    text-align: center;
    background-color: ${p => p.color ? p.color : "#F4F7FF"};

    border-radius: ${p => p.rounded ? "100px" : 0};
    
    opacity: ${p => p.active ? 0.85 : 1};

    &:hover {
        opacity: .85;
        cursor: pointer;
    }
`;

const DropDownContent = styled.div<DropdownContentProps>`
    display: block;
    position: absolute;
    background-color: ${p => getColor('white')};
    width: 100%;
    box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.5);
    z-index: 1;
    border-radius: 10px;
    text-align: left;
    overflow: hidden;
`;

export const StatusDropdown = ({ items, text, value, row, ...props }: {
    items: Array<{onClick?: any, props?:{[key: string]: any}, content: ReactNode|string|any, value: string, color: string}>,
    value: {onClick?: (e: Event) => void, props?:{[key: string]: any}, content: ReactNode|string|any, value: string, color: string},
    row: any
} & DropdownContentProps) => {

    const node = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const [value2, setValue] = useState(value);

    const handleClick = (e: Event) => {
        // @ts-ignore
        if (node.current?.contains(e.target)) {
          return;
        }
        setShowMenu(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        // @ts-ignore
        <StyledDropdown ref={node} {...props}>
            <DropdownItem rounded color={value2.color} active={showMenu} onClick={() => setShowMenu(!showMenu)}>{value2.content}</DropdownItem>
            {showMenu && <DropDownContent>
                {items.map((item, i) => {
                    return item && <DropdownItem key={'dropdown-item-'+i} color={item.color}
                        {...item.props}
                        onClick={e => {
                            e.stopPropagation()
                            setShowMenu(false);
                            setValue(item)
                            item.onClick && item.onClick(item, row)
                        }}
                    >{item.content}</DropdownItem>
                })}
            </DropDownContent>}
        </StyledDropdown>
    );
}
