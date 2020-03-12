import React from 'react'
import styled from 'styled-components'
import {Button} from './Button'
import {Input} from './Input'

const ArtworkName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`

const ArtworkControls = styled.div`
  text-align: right;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  opacity: 0;
  transition: .3s all;
`

const ArtworkInfo = styled.div`
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

const ArtworkWrapper = styled.div<{picture:string} >`
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

  &:hover ${ArtworkControls} {
    opacity: 1;
  }
`

function truncate(filename:string, max:number) {
  var extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
  var base_name = filename.replace('.' + extension, '');
  return base_name.substr(0, max) + (filename.length > max ? '..' : '') + '.' + extension;
}

export const Artwork = (props: {picture:string, name:string, edit?:boolean, onEdit?:Function|VoidFunction, onDelete?:Function|VoidFunction, onSave?:Function|VoidFunction }) => {
  /* TODO: 20 is arbitrary; ideally a component should know its width, and that should be used to compute the max length */
  return <ArtworkWrapper picture={props.picture}>
    {!props.edit ?
    <ArtworkControls>
      {props.onEdit ? <Button size="small" onClick={() => props.onEdit!()}>Edit</Button> : null}
      {props.onDelete ? <Button size="small" onClick={() => props.onDelete!()} style={{marginLeft: 10}}>Delete</Button> : null}
    </ArtworkControls>
    : null}
    <ArtworkInfo>
      {props.edit && props.onSave ?
        <div style={{display:"flex"}}>
         <Input style={{flexGrow:1, marginBottom: 0}} value={props.name}/>
         <Button size="small" style={{height:"100%", marginLeft: 10}} onClick={() => props.onSave!()}>Save</Button>
       </div> :
       <ArtworkName>{truncate(props.name, 20)}</ArtworkName>}
    </ArtworkInfo>
  </ArtworkWrapper>
}
