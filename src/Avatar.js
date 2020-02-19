import styled from 'styled-components'
import React from 'react'
import placeholder from './avatar-placeholder.png'

const AvatarWrapper = styled.div`
  width: 42px;
  height: 42px;
  margin-right: 15px;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
`

const AvatarPic = styled.img`
  width: 42px;
`

const Avatar = (props) => {
  return <AvatarWrapper>
           <AvatarPic src={props.pic ? props.pic : placeholder }/>
         </AvatarWrapper>
}

export {Avatar}
