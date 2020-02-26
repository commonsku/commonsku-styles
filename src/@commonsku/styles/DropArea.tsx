import styled from 'styled-components'
import React from 'react'

const StyledDropArea = styled.div`
  padding: 20px;
  border: 2px dashed #02c0da; 
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ECF4F7;
  }
`;

const PlaceHolder = styled.label`
  color: #02c0da;
  text-align: center;
  width: 100%;
  display: block;
`

const DropArea = (props: React.PropsWithChildren<{ placeholder?:string|React.ReactNode}>) => {
  return <StyledDropArea>
           {props.children ? props.children : <PlaceHolder>{props.placeholder}</PlaceHolder>}
         </StyledDropArea>
}

export {DropArea};
