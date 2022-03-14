import { get } from 'lodash';
import styled from 'styled-components'
import React from 'react'
import placeholder from './img/avatar-placeholder.png'
import { SharedStyles, SharedStyleTypes } from './SharedStyles';
import colors, { neutrals, primary1, secondary1, secondary2, secondary3, secondary4 } from './colors';
import { UserIcon } from './icons';


const avatarSizes = {
  tiny: {
    size: '24px',
    fontSize: '10px'
  },
  small: {
    size: '32px',
    fontSize: '12px'
  },
  medium: {
    size: '40px',
    fontSize: '16px'
  },
  large: {
    size: '48px',
    fontSize: '16px'
  },
  huge: {
    size: '56px',
    fontSize: '20px'
  }
};

export type AvatarSize = keyof typeof avatarSizes;

const avatarShapes = {
  square: '5px',
  circle: '50%'
}

export type AvatarShape = keyof typeof avatarShapes;

const avatarColors = {
  teal: {
    backgroundColor: primary1['30'],
    textColor: primary1['60']
  },
  green: {
    backgroundColor: secondary3['30'],
    textColor: secondary3['60']
  },
  yellow: {
    backgroundColor: secondary2['30'],
    textColor: secondary2['60']
  },
  navy: {
    backgroundColor: secondary4['30'],
    textColor: secondary4['50']
  },
  pink: {
    backgroundColor: secondary1['20'],
    textColor: secondary1['40']
  }
}

export type AvatarColor = keyof typeof avatarColors;


// const avatarColorKeys = Object.keys(avatarColors);

// const randomAvatarColor = avatarColorKeys[Math.floor(Math.random() * avatarColorKeys.length)];

type _AvatarProps = {size: AvatarSize, shape?: AvatarShape,  color?: AvatarColor, hasPic?: boolean, initials?: string, icon?: boolean} & React.HTMLAttributes<HTMLDivElement> & SharedStyleTypes;
const AvatarWrapper = styled.div<_AvatarProps>`
  &&& {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin: 0;
    ${SharedStyles}

    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: ${props => props.shape};
    text-align: center;
    ${props => props.hasPic ? '' : `background: ${get(avatarColors, [props.color ?? 'teal', 'backgroundColor'], props.color)};`}
    ${props => props.hasPic ? '' : `color: ${get(avatarColors, [props.color ?? 'teal', 'textColor'], props.color)};`}
  }
`

const AvatarPic = styled.img<_AvatarProps>`
  &&& {
    width: 100%;
    height: 100%;
  }
`
const AvatarInitials = styled.p<_AvatarProps>`
  &&& {
    margin: 0;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    font-family: 'skufont-bold', sans-serif;
    font-size: ${props => get(avatarSizes, [props.size ?? 'small', 'fontSize'], props.size)}
`

const Avatar: React.FC<
  Omit<_AvatarProps, 'size'> & {pic?: string, size?: AvatarSize, shape?: AvatarShape, color?: AvatarColor, initials?: string, icon?: boolean}
> = ({ pic, size='small', shape='square', color, initials, icon, children, ...props }) => {
  if(pic) {
    return <AvatarWrapper hasPic={true} size={get(avatarSizes, [size ?? 'small', 'size'], size) as AvatarSize} shape={get(avatarShapes, shape ?? 'square', shape) as AvatarShape} {...props}>
    <AvatarPic src={pic ?? placeholder } size={size}/>
  </AvatarWrapper>
  } else if (!pic && icon){
    return <AvatarWrapper size={get(avatarSizes, [size ?? 'small', 'size'], size) as AvatarSize} shape={get(avatarShapes, shape ?? 'square', shape) as AvatarShape} style={{backgroundColor: neutrals['50']}} {...props}><UserIcon fill={neutrals[70]} size={size} style={{position:'relative', top: '50%', transform: 'translate(0, -50%)'}}/>
  </AvatarWrapper>
  } else {
    return <AvatarWrapper size={get(avatarSizes, [size ?? 'small', 'size'], size) as AvatarSize} shape={get(avatarShapes, shape ?? 'square', shape) as AvatarShape} color={color} initials={initials} {...props}>
      <AvatarInitials size={size}>{initials ?? children}</AvatarInitials>
  </AvatarWrapper>
  }
  
}

export { Avatar }
