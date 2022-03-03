import React, { useState, useEffect, Fragment } from 'react';
import { useDropzone, DropzoneOptions, DropEvent } from 'react-dropzone';
import styled from 'styled-components';
import { getThemeColor, colors } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

export const StyledDropArea = styled.div<{isDragAccept?: boolean, isDragReject?: boolean, isDragActive?: boolean}&SharedStyleTypes>`
  &&& {
    padding: 20px;
    border: 2px dashed ${props => getThemeColor(props, 'primary', colors.primary)}; 
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: ${props => getThemeColor(props, 'bgblue', colors.bgblue)};
    }
    border-color: ${props => getColor(props)};
    outline: none;
    transition: border .24s ease-in-out;
    width: 100%;
    ${SharedStyles}
  }
`;

const PlaceHolder = styled.label`
  &&& {
    color: ${props => getThemeColor(props, 'primary', colors.primary)};
    text-align: center;
    width: 100%;
    display: block;
  }
`
const ThumbsContainer = styled.aside`
  &&& {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
  }
`;

const Thumb = styled.div`
  &&& {
    display: inline-flex;
    border-radius: 2px;
    border: 1px solid #eaeaea ${props => getThemeColor(props, 'bggray', colors.bggray)};
    margin-bottom: 8px;
    margin-right: 8px;
    width: 100px;
    height: 100px;
    padding: 4px;
    box-sizing: border-box;
  }
`;

const ThumbInner = styled.div`
  &&& {
    display: flex;
    min-width: 0px;
    overflow: hidden;
  }
`;

const ImgPreview = styled.img`
  &&& {
    display: block;
    width: auto;
    height: 100%;
  }
`;

export type DropAreaProps = React.PropsWithChildren<{
  placeholder?: string | React.ReactNode;
} & SharedStyleTypes>
export const DropArea = ({
  children,
  placeholder,
  ...props
}: DropAreaProps) => {
  return <StyledDropArea {...props}>
           {children ? children : <PlaceHolder>{placeholder}</PlaceHolder>}
         </StyledDropArea>
}


const getColor = (props: {isDragAccept?: boolean, isDragReject?: boolean, isDragActive?: boolean}) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#02c0da';
}

export type DropzoneTypes = { 
  placeholder ?: string|React.ReactNode,
  showDroppedFiles ?: boolean,
} & DropzoneOptions

export function Dropzoned({
  placeholder="Drop Here",
  accept,
  showDroppedFiles=false,
  ...props
}: DropzoneTypes) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({accept, ...props});

  const files = showDroppedFiles && acceptedFiles.map((file: File&{path?: string}) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Fragment>
      <StyledDropArea {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <PlaceHolder>{placeholder}</PlaceHolder>
      </StyledDropArea>
      {showDroppedFiles && <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>}
    </Fragment>
  )
}

export function DropzonedPreviews({
  placeholder="Drop Here",
  accept,
  onDrop,
  ...props
}: DropzoneTypes) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    onDrop: (acceptedFiles: File[], rejectedFiles: File[], event: DropEvent) => {
      onDrop && onDrop(acceptedFiles, rejectedFiles, event);
      // @ts-ignore
      setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    ...props
  });

  const thumbs = files.map((file: {preview: string}&File) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ImgPreview alt={'Preview Img'} src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: {preview: string}&File) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="dropzoned-container">
      <StyledDropArea {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        {thumbs.length 
          ? <ThumbsContainer>{thumbs}</ThumbsContainer>
          : <PlaceHolder>{placeholder}</PlaceHolder>}
      </StyledDropArea>
      {/* <ThumbsContainer>{thumbs}</ThumbsContainer> */}
    </section>
  );
}

