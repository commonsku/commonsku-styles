import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import {Button} from './Button'
import {Input, InputProps} from './Input'

const ArtworkName = styled.div`
  font-size: .9rem;
  font-weight: bold;
`

const UpdateDate = styled.div`
  font-size: .75rem;
  color: #9BAEB9;
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
  position: absolute;
  height: 3rem;
  left: 0;
  bottom: 0;
  opacity: 1;
  color: black;
  font-size: 14px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-transition: height .2s ease;
  -moz-transition: height .2s ease;
  transition: height .2s ease;
  z-index: 1;
`

const ArtworkWrapper = styled.div<{height:number}>`
  width: 100%;
  height: ${props => props.height}vw;
  position: relative;
  line-height: 1.5em;
  cursor: pointer;

  &:hover ${ArtworkControls} {
    opacity: 1;
  }
`

const ArtworkPicture = styled.div<{picture:string, height:number} >`
  width: 100%;
  height: calc(${props => props.height}vw - 3.5rem);
  overflow: hidden;
  background-image: url("${props => props.picture}");
  background-repeat: no-repeat;
  background-position: center ;
  background-size: contain;
  position: relative;
  line-height: 1.5em;
  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);

  &:hover ${ArtworkControls} {
    opacity: 1;
  }
`
function truncate(filename:string, max:number) {
  var extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
  var base_name = filename.replace('.' + extension, '');
  return base_name.substr(0, max) + (filename.length > max ? '..' : '') + '.' + extension;
}

export const Artwork = ({
  height=17,
  edit=false,
  date='',
  inputProps={},
  name='',
  ...props
}: {
  picture:string,
  name:string,
  height?:number,
  date?:string,
  edit?:boolean,
  onEdit?:Function|VoidFunction|undefined,
  onDelete?:Function|VoidFunction|undefined,
  onSave?:Function|VoidFunction|undefined,
  inputProps?:InputProps,
  inputEl?:React.ReactNode,
}) => {

  /* TODO: 20 is arbitrary; ideally a component should know its width, and that should be used to compute the max length */
  return <ArtworkWrapper height={height}>
    <ArtworkPicture height={height} picture={props.picture}/>
    {!edit ?
      <ArtworkControls>
        {props.onEdit ? <Button size="small" onClick={() => props.onEdit!()}>Edit</Button> : null}
        {props.onDelete ? <Button size="small" onClick={() => props.onDelete!()} style={{marginLeft: 10}}>Delete</Button> : null}
      </ArtworkControls> : null}

    <ArtworkInfo>
      {edit && props.onSave 
        ? <div style={{display:"flex"}}>
            {props.inputEl || <Input
              style={{flexGrow:1, marginBottom: 0}}
              value={name}
              {...inputProps} // Add onChange/onBlur to update name
            />}
            <Button size="small" style={{height:"100%", marginLeft: 10}} onClick={(e) => props.onSave!()}>Save</Button>
          </div>
        : <ArtworkName>{truncate(name, 20)}</ArtworkName>}

       {!edit && date ? <UpdateDate>Updated {date}</UpdateDate> : null}
    </ArtworkInfo>
  </ArtworkWrapper>
}
