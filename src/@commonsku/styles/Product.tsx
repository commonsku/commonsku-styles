import React from 'react'
import styled from 'styled-components'
import {StarRating} from './StarRating'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'


const ProductInfo = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.55) !important;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 1;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  height: 110px;
  -webkit-transition: height .2s ease;
  -moz-transition: height .2s ease;
  transition: height .2s ease;
  z-index: 1;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  -moz-text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%);
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#b0000000',GradientType=0 );
`

const ProductName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: none;
`

const SupplierName = styled.div`
  font-size: .9rem;
  font-weight: bold;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProductWrapper = styled.div<{picture:string} & SharedStyleTypes >`
  width: 100%;
  height: 17rem;
  overflow: hidden;
  background-image: url("${props => props.picture}");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  position: relative;
  line-height: 1.5em;
  cursor: pointer;
  &:hover ${ProductInfo} {
    height: 100%;
  }
  &:hover ${ProductName} {
    display: block;
  }
  &:hover ${SupplierName} {
    overflow: visible;
    white-space: normal;
  }
  ${SharedStyles}
`

export const Product = (props: {sku:string, picture:string, supplier:string, name:string, price?:number, currency?:string, rating?:number} & SharedStyleTypes) => {
  return <ProductWrapper picture={props.picture} {...props}>
    <ProductInfo>
      <SupplierName>{props.supplier}</SupplierName>
      <ProductName>{props.name}</ProductName>
      {props.sku}<br/>
      {props.price && props.currency ? props.currency + "$" + props.price : null}
      {props.rating ? <StarRating rating={props.rating}/> : null}
    </ProductInfo>
  </ProductWrapper>
}
