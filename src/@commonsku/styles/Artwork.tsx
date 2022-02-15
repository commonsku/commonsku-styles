import React from 'react'
import styled from 'styled-components'
import {Button} from './Button'
import {Img} from './Img'
import {Input, InputProps} from './Input'
import {IconDoc, DownloadIcon} from './icons'
import { getThemeColor, getThemeFontSize } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';


const ArtworkName = styled.div`
  font-size: .9rem;
  font-weight: bold;
`

const UpdateDate = styled.div`
  font-size: ${props => getThemeFontSize(props, 'tiny')};
  color: ${props => getThemeColor(props, 'textbody')};
`

const ArtworkControls = styled.div`
  text-align: right;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  opacity: 0;
  transition: .3s all;
`

const ArtworkInfo = styled.div<{withPicture?:boolean}>`
  padding-left: ${props => props.withPicture ? 0 : "4vw !important"};
  width: 100%;
  position: absolute;
  height: 3rem;
  left: 0;
  ${props=>props.withPicture ? "bottom" : "top"} : 0;
  opacity: 1;
  color: black;
  font-size: 14px;
  box-sizing: border-box;
  word-wrap: break-word;
  -moz-box-sizing: border-box;
  -webkit-transition: height .2s ease;
  -moz-transition: height .2s ease;
  transition: height .2s ease;
  z-index: 1;
`

const ArtworkWrapper = styled.div<{cssHeight:number}&SharedStyleTypes>`
  width: 100%;
  height: ${props => props.cssHeight > 0 ? props.cssHeight + "vw": "auto"};
  min-height: 4rem;
  position: relative;
  line-height: 1.5em;
  cursor: pointer;

  &:hover ${ArtworkControls} {
    opacity: 1;
  }
  ${SharedStyles}
`

const ArtworkPicture = styled.div<{cssHeight:number} >`
  width: 100%;
  height: calc(${props => props.cssHeight}vw - 3.5rem);
  overflow: hidden;
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

function extension(filename:string) {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length);
}

export type ArtworkProps = {
  picture?:string,
  icon?:string,
  name:string,
  cssHeight?:number,
  date?:string,
  edit?:boolean,
  noTruncate?:boolean,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  onEdit?:Function|VoidFunction,
  onDelete?:Function|VoidFunction,
  onSave?:Function|VoidFunction,
  onDownload?:Function|VoidFunction,
  inputProps?:InputProps,
  inputEl?:React.ReactNode,
};

export const Artwork = ({
    inputProps={},
    ...props
  }: ArtworkProps & SharedStyleTypes) => {
  /* TODO: 20 is arbitrary; ideally a component should know its width, and that should be used to compute the max length */
  return <ArtworkWrapper cssHeight={props.cssHeight ? props.cssHeight : props.picture ? 17 : 0} onClick={!props.picture && props.onClick ? props.onClick : undefined}>
    {props.picture?
      <ArtworkPicture onClick={(e) => props.onClick ? props.onClick(e) : null} cssHeight={props.cssHeight ? props.cssHeight : 17}>
        <Img src={props.picture} style={{objectFit:"contain", width:"100%", height: "100%"}}/>
      </ArtworkPicture>
      :
      <IconDoc ext={extension(props.name)} style={{width:"3vw"}} />
    }
    {!props.edit ?
    <ArtworkControls>
      {props.onEdit ? <Button size="small" onClick={() => props.onEdit!()}>Edit</Button> : null}
      {props.onDelete ? <Button size="small" onClick={() => props.onDelete!()} style={{marginLeft: 10}}>Delete</Button> : null}
      {props.onDownload ? <Button size="small" onClick={() => props.onDownload!()} style={{marginLeft: 10, padding: 4}}><DownloadIcon style={{height: "20px"}}/></Button> : null}
    </ArtworkControls>
    : null}
    <ArtworkInfo withPicture={props.picture?true:false} >
      {props.edit && props.onSave ?
        <div style={{display:"flex"}}>
         {props.inputEl || <Input // Custom or default Input Element
              style={{flexGrow:1, marginBottom: 0, fontSize: ".8rem", padding: ".3rem"}}
              value={props.name}
              {...inputProps} // Add onChange/onBlur to update name
            />}
         <Button size="small" style={{height:"100%", marginLeft: 10, paddingRight: 4, paddingLeft: 4}} onClick={() => props.onSave!()}>Save</Button>
       </div> : props.name ?
       <ArtworkName>{props.noTruncate ? props.name : truncate(props.name, 20)}</ArtworkName> : null}
       {!props.edit && props.date ?
       <UpdateDate>Updated {props.date}</UpdateDate> : null}
    </ArtworkInfo>
  </ArtworkWrapper>
}
