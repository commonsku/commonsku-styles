import React, { ReactNode, useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import { getColor } from './Theme';
import { Button } from './Button';
import { document } from '../utils';

const StyledCircles = styled.div`
  line-height: 0;
  margin-bottom: 9px;
`;

const Circle = styled.div<{disabled?:boolean}>`
  background: #005B8C;
  opacity: ${p => p.disabled ? 0.1 : 1};
  width: 5px;
  height: 5px;
  border-radius: 10px;
  margin-right: 2px;
  display: inline-block;
`;

const StyledDropdown = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

type DropdownContentProps = {
    text?: string,
    active?: boolean,
    rounded?: boolean,
}

const DropdownItem = styled.div<DropdownContentProps>`
    color: black;
    padding: 8px 8px;
    text-decoration: none;
    display: block;
    text-align: center;
    background-color: #F4F7FF;
    line-height: 1em;

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
    z-index: 10;
    border-radius: 10px;
    text-align: left;
    overflow: hidden;
`;

const Circles = ({val, max}:{val: number, max: number}) => {
    return <StyledCircles>
      {[...Array(val)].map((item, i) => {
        return <Circle key={i}/>
      })}
      {[...Array(max - val)].map((item, i) => {
        return <Circle key={i} disabled/>
      })}
    </StyledCircles>
}

export const StateDropdown = ({ items, text, value, row, showCircles=true, ...props }: {
    items: Array<{onClick?: any, props?:{[key: string]: any}, content: ReactNode|string|any, value: string, order: number}>,
    value: {onClick?: any, props?:{[key: string]: any}, content: ReactNode|string|any, value: string, order: number},
    row: any,
    showCircles?: boolean
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

    useEffect(() => {
        setValue(value)
    }, [value])

    return (
        // @ts-ignore
        <StyledDropdown ref={node} {...props}>
            <DropdownItem rounded active={showMenu} onClick={e => { e.stopPropagation(); setShowMenu(!showMenu) }}>
              {showCircles && <Circles max={items.length} val={value2.order}/>}
              {value2.content}
            </DropdownItem>
            {showMenu && <DropDownContent>
                {items.map((item, i) => {
                    return item && <DropdownItem key={'dropdown-item-'+i} 
                        {...item.props}
                        onClick={e => {
                            e.stopPropagation()
                            setShowMenu(false)
                            setValue(item)
                            item.onClick && item.onClick(item, row)
                        }}
                    >{showCircles && <Circles max={items.length} val={item.order}/>} {item.content} </DropdownItem> 
                })}
            </DropDownContent>}
        </StyledDropdown>
    );
}
