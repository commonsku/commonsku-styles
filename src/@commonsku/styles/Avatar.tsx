import { get } from 'lodash';
import styled from 'styled-components'
import React from 'react'
import placeholder from './img/avatar-placeholder.png'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import { TSize } from './Button';

const avatarSizes = {
  small: '32px',
  medium: '42px',
};

type AvatarWrapperProps = {size: TSize} & React.HTMLAttributes<HTMLDivElement> & SharedStyleTypes;
const AvatarWrapper = styled.div<AvatarWrapperProps>`
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

type AvatarPicProps = { size?: TSize } & React.HTMLAttributes<HTMLDivElement> & SharedStyleTypes;
const AvatarPic = styled.img<AvatarPicProps>`
  &&& {
    width: 100%;
    height: 100%;
  }
`

type AvatarProps = {pic?: string, size?: TSize} & React.HTMLAttributes<HTMLDivElement> & SharedStyleTypes;
const Avatar: React.FC<AvatarProps> = ({ pic, size, ...props }) => {
  return <AvatarWrapper size={get(avatarSizes, size ?? 'medium', size)} {...props}>
    <AvatarPic src={pic ?? placeholder } size={size} />
  </AvatarWrapper>
}

export { Avatar }
