import React from "react";
import styled from "styled-components";
import { colors, fontStyles} from '../../@commonsku/styles/Theme';

const SideItem = ({items}) => {
    const {name, links, open } = items;
    const [isOpen, setOpen] = React.useState(open);

    const openSideNav = () => {
        setOpen(!isOpen);
    };

    const StyledSideItem = styled.div`
        &&& {
            background-color: ${isOpen ? colors.teal["main-hover"] : colors.teal.main};
            &:hover {
                background-color: ${colors.teal["main-hover"]}
            };
        };

        
    `;
    
    const StyledSideItemAtag = styled.a`
        &&& {
            text-decoration: none;
            &:hover {
                
            };
        };
    `;

    const StyledSideItemP = styled.p`
        &&& {
            font-family: ${fontStyles.p.medium.fontFamily};
            font-Size: ${fontStyles.p.medium.fontSize};
            line-height: ${fontStyles.p.medium.lineHeight};
            color: ${isOpen ? colors.white : colors.white};  
            margin: 0;
            padding:16px; 
            text-decoration: none;
            &:hover {
                color: ${colors.white};
            };
        };
    `;

    const StyledSideItemSubP = styled.p`
        &&& {
            font-family: ${fontStyles.p.small.fontFamily};
            font-Size: ${fontStyles.p.small.fontSize};
            line-height: ${fontStyles.p.small.lineHeight};
            color: ${isOpen ? colors.white : colors.white}; 
            margin: 0;
            padding:8px 16px;
            text-decoration: none;
            &:hover {
                background-color: ${colors.teal.dark}
            };
        };
    `;

    return (
        <StyledSideItem onClick={() => openSideNav()}>
            <StyledSideItemP>{name}</StyledSideItemP>
            {isOpen && 
                links.map((link, index) => {
                const {title, to} = link;
                return (
                    <div>
                        <StyledSideItemAtag href={to} >
                            <StyledSideItemSubP >{title}</StyledSideItemSubP>
                        </StyledSideItemAtag>
                    </div>
                );
            })}
        </StyledSideItem>
    );
};




export default SideItem;