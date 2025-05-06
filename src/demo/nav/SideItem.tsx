import React from "react";
import styled from "styled-components";
import { colors, fontStyles} from '../../@commonsku/styles/Theme';



const StyledSideItem = styled.div<{open: boolean}>`
        &&& {
            background-color: ${props => props.open ? colors.teal["main-hover"] : colors.teal.main};
            pointer: cursor;
            &:hover {
                background-color: ${colors.teal["main-hover"]};
                pointer: cursor;
            };
        };

        
    `;
    
    const StyledSideItemAtag = styled.a`
        &&& {
            text-decoration: none;
            &:hover {
                cursor:pointer;
            };
        };
    `;

    const StyledNavItem = styled.p`
        &&& {
            font-family: ${fontStyles.p.medium.fontFamily};
            font-Size: ${fontStyles.p.medium.fontSize};
            line-height: ${fontStyles.p.medium.lineHeight};
            color: ${colors.white};  
            margin: 0;
            padding:16px; 
            text-decoration: none;
            pointer: cursor;
            &:hover {
                color: ${colors.white};
                pointer: cursor;
            };
        };
    `;

    const StyledSubNavItem = styled.p<{active?: boolean}>`
        &&& {
            font-family: ${fontStyles.p.small.fontFamily};
            font-Size: ${fontStyles.p.small.fontSize};
            line-height: ${fontStyles.p.small.lineHeight};
            color: ${colors.white}; 
            margin: 0;
            padding:8px 16px;
            text-decoration: none;
            &:hover {
                background-color: ${colors.teal.dark};
                pointer: cursor;
            };
        };
    `;


const SideItem = ({items}) => {
    const {name, links, open } = items;
    const [isOpen, setOpen] = React.useState(open);

    const openSideNav = () => {
        setOpen(!isOpen);
    };
    

    return (
        <StyledSideItem open={isOpen}>
            <StyledNavItem onClick={() => openSideNav()}>{name}</StyledNavItem>
            {isOpen && 
                links.map((link, index) => {
                const {title, to} = link;
                
                // const active = to === window.location.hash;

                return (
                    <div key={title}>
                        <StyledSideItemAtag href={to}>
                            <StyledSubNavItem id={index} className="subnav-item">{title}</StyledSubNavItem>
                        </StyledSideItemAtag>
                    </div>
                );
            })}
        </StyledSideItem>
    );
};




export default SideItem;