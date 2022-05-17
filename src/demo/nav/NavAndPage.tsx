import React, { useState } from "react";
import styled from "styled-components";
import { colors } from '../../@commonsku/styles/Theme';
import { SharedStyles, SharedStyleTypes, IconButton, ArrowIcon, MenuIcon } from '@commonsku/styles';
import { SideItem, NavItems, H2 } from "demo";

const StylesPageContainer = styled.div`
    position: relative;
`;

const StyledSideNav = styled.div<{ openNav: boolean }>`
    // background-color: ${colors.neutrals[40]};
    background-color: ${colors.teal.main};
    color: white;
    position:fixed;
    width: ${props => props.openNav ? "184px" : "56px"};
    height: 100vh;
    overflow: scroll;
`;

const Background = styled.div<{padded?: boolean, fillWindow?:boolean, openNav:boolean }&SharedStyleTypes>`
    &&& {
        background: ${colors.neutrals.bg1};
        padding: 24px ${props => props.padded ? 24 : 0}px;
        min-height: ${props => props.fillWindow ? "100vh" : 0};
        position: absolute;
        width: ${props => props.openNav ? "calc(100% - 184px)" : "calc(100% - 56px)"};
        left: ${props => props.openNav ? "184px" : "56px"};;
        ${SharedStyles}
    }
`;

const IconButtonContainer = styled.div<{ openNav:boolean }>`
    padding: ${props => props.openNav ? "16px" : "16px 8px"};
    text-align: ${props => props.openNav ? "right" : "center"};
`;

type RandomProps = {
    test?: boolean;
}
type StylesPageProps = React.PropsWithChildren<RandomProps> & {
    children?: React.ReactNode;
    initiallyOpened?: boolean;
};

export default function NavAndPage({
    initiallyOpened=false,
    children,
}:StylesPageProps ){


    const [isOpen, setOpen] = useState(initiallyOpened);

    return(
        <StylesPageContainer>
            <StyledSideNav openNav={isOpen}>
                <IconButtonContainer openNav={isOpen}>
                    <IconButton Icon={isOpen ? ArrowIcon : MenuIcon} variant="primary" iconProps={{direction: "left"}} onClick={() => setOpen(!isOpen)} />
                </IconButtonContainer>
                { isOpen ? <H2 style={{paddingLeft: "16px", color: "white"}}>Work in Progress</H2> : null }
                    
                    { isOpen ? NavItems.map((navItem, index) => {
                        return <SideItem key={index} items={navItem}/>
                    }) : null } 
                
                
            </StyledSideNav>
            <Background padded fillWindow openNav={isOpen}>
                {children}
            </Background>
        </StylesPageContainer>

    );
};

