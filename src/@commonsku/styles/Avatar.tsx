import styled from 'styled-components'
import React from 'react'
import placeholder from './img/avatar-placeholder.png'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const AvatarWrapper = styled.div<SharedStyleTypes>`
  width: 42px;
  height: 42px;
  margin-right: 15px;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  ${SharedStyles}
`

const AvatarPic = styled.img`
  width: 42px;
`

const Avatar = (props: React.PropsWithChildren<{pic?: string}> & SharedStyleTypes) => {
  return <AvatarWrapper {...props}>
    <AvatarPic src={props.pic ?? placeholder }/>
  </AvatarWrapper>
}

export { Avatar }
