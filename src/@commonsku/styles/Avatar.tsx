import { get } from 'lodash';
import styled from 'styled-components'
import React from 'react'
import placeholder from './img/avatar-placeholder.png'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const avatarSizes = {
  small: '32px',
  medium: '42px',
};

type _AvatarProps = {size: string} & React.HTMLAttributes<HTMLDivElement> & SharedStyleTypes;
const AvatarWrapper = styled.div<_AvatarProps>`
  &&& {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin: 0;
    ${SharedStyles}

    width: ${props => props.size};
    height: ${props => props.size};
  }
`

const AvatarPic = styled.img<_AvatarProps>`
  &&& {
    width: 100%;
    height: 100%;
  }
`

const Avatar: React.FC<
  Omit<_AvatarProps, 'size'> & {pic?: string, size?: string}
> = ({ pic, size='medium', ...props }) => {
  return <AvatarWrapper size={get(avatarSizes, size ?? 'medium', size)} {...props}>
    <AvatarPic src={pic ?? placeholder } size={size}/>
  </AvatarWrapper>
}

export { Avatar }
