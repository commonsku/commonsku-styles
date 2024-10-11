import React, { useState } from 'react'
import styled from 'styled-components'
import { SharedStyleTypes } from './SharedStyles'
import { AddIcon, CheckmarkIcon, SkubotSpinner } from './icons'
import colors from './colors'
import { ButtonVariant, IconButton, TButtonIcon } from './Button'
import { Img } from './Img'
import { SizerTypes } from './Sizer'

const ProductCardWrapper = styled.div`
  &&& {
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
      box-shadow: 0px 4px 18.5px 0px rgba(207, 226, 229, 1);
    }
    &.loading {
      background: ${colors.primary1['20']};
    }
    &.selected {
      background: ${colors.primary1['60']};
      box-shadow: none;
    }
}`;

const ProductImg = styled(Img)`
  &&& {
    height: 208px;
    width: 208px;
    object-fit: cover;
    border-radius: 5px;
}`;

const ProductContent = styled.div`
  &&& {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    align-items: flex-start;
    flex-direction: column;
    flex-grow: 1;
}`;

const ProductTitle = styled.div`
  &&& {
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

    ${ProductCardWrapper}.loading & {
      color: ${colors.primary1['65']};
    }

    ${ProductCardWrapper}.selected & {
      color: ${colors.primary1['10']};
    }
}`;

const ProductSubTitle = styled.div<{ isClickable?: boolean }>`
  &&& {
    width: 134px;
    height: 24px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    
    color: ${props => props.isClickable ? colors.primary1['65'] : colors.neutrals['90']};

    flex: none;
    flex-grow: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${ProductCardWrapper}:hover & {
      color: ${colors.primary1['65']};
      ${props => props.isClickable && 'text-decoration: underline;'}
    }

    ${ProductCardWrapper}.loading & {
      color: ${colors.primary1['65']};
    }

    ${ProductCardWrapper}.selected & {
      color: ${colors.primary1['10']};
    }
}`;

const ProductImageOverlay = styled.div`
  position: absolute;
  top: 0;
  border-radius: 5px;
  width: 208px;
  height: 208px;
  border: 0px solid #000;
  transition: .5s ease;
  background: ${colors.teal['60']}99;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  loading?: boolean;
  imgUrl: string;
  title: string;
  sku?: string;
  subTitle: string;
  handleSubTitleClick?: () => void;
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
    } else if (props.loading) {
      return { icon: undefined, variant: 'primary', name: 'Adding' };
    }
    return { icon: AddIcon, variant: 'primary', name: 'Add' };
  };

  const button = buttonState();
  const backgroundClass = () => {
    if (props.selected) {
      return 'selected';
    }
    if (props.loading) {
      return 'loading';
    }
  };

  const handleSubTitleClick = (e) => {
    e.stopPropagation();
    if (props.handleSubTitleClick) {
      props.handleSubTitleClick();
    }
  };
  return (
    <ProductCardWrapper onClick={props.handleClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={backgroundClass()} >
      <div style={{ position: 'relative' }}>
        <ProductImg src={props.imgUrl}></ProductImg>
        {props.loading &&
          <ProductImageOverlay>
            <SkubotSpinner size="small" skubot={false} color={colors.white} />
          </ProductImageOverlay>
        }

      </div>
      <ProductContent>
        <ProductTitle>{props.title}</ProductTitle>
        {props.sku && <ProductSubTitle>{props.sku}</ProductSubTitle>}
        <div style={{ display: 'flex', alignItems: 'center', height: 32, marginTop: '-4px' }}>
          <ProductSubTitle isClickable={props.handleClick ? true : false} onClick={handleSubTitleClick}>{props.subTitle}</ProductSubTitle>
          {props.showButton && (hover || props.selected || props.loading) && <ProductButton variant={button.variant} Icon={button.icon} iconPosition='left' style={{ padding: 8 }} onClick={handleClickProductEvent}  >{button.name}</ProductButton>}
        </div>
      </ProductContent>
    </ProductCardWrapper>
  );
};