import styled, { css } from 'styled-components'
import React from 'react'
import placeholder from './img/avatar-placeholder.png'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const avatarSizes = {
  small: css`
    width: 32px;
    height: 32px;
  `,
  medium: css`
    width: 42px;
    height: 42px;
  `,
};

type _AvatarProps = {size?: keyof typeof avatarSizes} & React.HTMLAttributes<HTMLDivElement> & SharedStyleTypes;
const AvatarWrapper = styled.div<_AvatarProps>`
  &&& {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin: 0;
    ${SharedStyles}

    ${props => avatarSizes[props.size || 'medium']}
  }
`

const AvatarPic = styled.img<_AvatarProps>`
  &&& {
    ${props => avatarSizes[props.size || 'medium']}
  }
`

const Avatar: React.FC<{pic?: string} & _AvatarProps> = ({ pic, size, ...props }) => {
  return <AvatarWrapper size={size} {...props}>
    <AvatarPic src={pic ?? placeholder } size={size}/>
  </AvatarWrapper>
}

export { Avatar }
