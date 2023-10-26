import React, { useState } from 'react'
import styled from 'styled-components'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { AddIcon, CheckmarkIcon } from './icons'
import colors from './colors'
import { ButtonVariant, IconButton, TButtonIcon } from './Button'
import { Img } from './Img'
import { SizerTypes } from './Sizer'

const ProductCardWrapper = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    gap: 8px;
    
    background: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: ${colors.primary1['20']};
    }
    &.selected {
      background: ${colors.primary1['60']};
    }
}`;

const ProductImg = styled(Img)`
  && {
    height: 208px;
    width: 208px;
    object-fit: cover;
    border-radius: 5px;
}`;

const ProductContent = styled.div`
  && {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    align-items: flex-start;
    flex-direction: column;
}`;

const ProductTitle = styled.div`
  && {
    width: 208px;
    max-height: 53px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;

    display: flex;
    align-items: center;

    color: ${colors.neutrals['100']};

    flex: none;
    order: 0;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    ${ProductCardWrapper}:hover & {
      color: ${colors.primary1['65']};
    }

    ${ProductCardWrapper}.selected & {
      color: ${colors.primary1['10']};
    }
}`;

const ProductSubTitle = styled.div`
  && {
    width: 135px;
    height: 24px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    
    color: ${colors.neutrals['90']};

    flex: none;
    flex-grow: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${ProductCardWrapper}:hover & {
      color: ${colors.primary1['65']};
    }

    ${ProductCardWrapper}.selected & {
      color: ${colors.primary1['10']};
    }
}`;

const ProductButton = styled(IconButton)`
  &&& {
    width: 74px;
    height: 32px;

    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */

    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    /* Primary 2 / White */

  }
`;

// can import from Button
type IconFuncProps = { color: string;[key: string]: any };

type ButtonState = {
  icon?: TButtonIcon | React.ReactElement<IconFuncProps>;
  variant: ButtonVariant;
  name: string;
} & SharedStyleTypes & SizerTypes;

type ProductCardProps = React.PropsWithChildren<{
  handleClick?: () => void;
  selected: boolean;
  imgUrl: string;
  title: string;
  sku?: string;
  subTitle: string;
  showButton: boolean;
  handleClickProductEvent?: () => void;
} & SharedStyleTypes & SizerTypes>;


export const ProductCard = (props: ProductCardProps) => {
  const [hover, setHover] = useState(false);

  const buttonState = (): ButtonState => {
    if (hover && props.selected) {
      return { icon: undefined, variant: 'error', name: 'Remove' };
    } else if (props.selected) {
      return { icon: CheckmarkIcon, variant: 'primary', name: 'Added' };
    }
    return { icon: AddIcon, variant: 'primary', name: 'Add' };
  };

  const button = buttonState();
  return (
    <ProductCardWrapper onClick={props.handleClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={props.selected ? 'selected' : ''} >
      <ProductImg src={props.imgUrl}></ProductImg>
      <ProductContent>
        <ProductTitle>{props.title}</ProductTitle>
        {props.sku && <ProductSubTitle>{props.sku}</ProductSubTitle>}
        <div style={{ display: 'flex', alignItems: 'center', height: 32, marginTop: '-4px' }}>
          <ProductSubTitle >{props.subTitle}</ProductSubTitle>
          {props.showButton && (hover || props.selected) && <ProductButton variant={button.variant} Icon={button.icon} iconPosition='left' style={{ padding: 8 }} onClick={props.handleClickProductEvent}  >{button.name}</ProductButton>}
        </div>
      </ProductContent>
    </ProductCardWrapper>
  );
};