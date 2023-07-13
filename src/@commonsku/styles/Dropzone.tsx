import React from 'react';
import BaseDropzone, {
  useDropzone,
  DropzoneOptions,
  DropzoneInputProps,
  DropzoneState,
  DropzoneRootProps,
  DropzoneRef,
} from 'react-dropzone';
import RenderChild, { getComponentDisplayName, TChildElement, TConcreteChildElement } from './RenderChild';

type ChildDropzoneState = Omit<
  DropzoneState,
  'getRootProps' | 'rootRef' | 'getInputProps' | 'inputRef'
>;

/**
 * Dropzone ChildElement
 * if child element's displayName === 'DropzoneChildWrapper' then it'll pass dropzone options in props
 *
 * Example with dropzone wrapper:
 * ```
 * const SomeComponent = ({ open, ...dropzoneOptions }) => {
 *   // do something with dropzoneOptions...
 *   return (
 *     <>
 *       <button onClick={open}>Upload</button>
 *       <div>{draggedFiles.map(f => <div>{f.name (f.type)}</div>)}</div>
 *     </>
 *   );
 * };
 * SomeComponent.displayName = 'DropzoneChildWrapper';
 *
 * <Dropzone noClick={true} onDrop={...}>
 *   <DropzoneChildWrapper />
 * </Dropzone>
 * ```
 *
 * ---------------------------------------------------------
 *
 * Example without dropzone wrapper:
 * ```
 * <Dropzone onDrop={...}>
 *   <button onClick={() => {}}>Upload</button>
 * </Dropzone>
 * ```
 *
 */

type DropzoneProps = {
  children: TChildElement<Partial<ChildDropzoneState>>;
  className?: string;
  style?: React.CSSProperties,
  rootProps?: DropzoneRootProps,
  inputProps?: DropzoneInputProps,
} & Omit<DropzoneOptions, 'children' | 'ref'>;

const Dropzone = React.forwardRef<DropzoneRef, DropzoneProps>(({ children, className, rootProps, inputProps, style={}, ...props }, ref) => {
  return (
    <BaseDropzone ref={ref} {...props}>
      {({ getRootProps, rootRef, getInputProps, inputRef, ...rest }) => {
        const allRootProps = getRootProps(rootProps);
        const parseChildProps = (
          p: object,
          Child: TConcreteChildElement<Partial<ChildDropzoneState>>
        ) => {
          const elemName = getComponentDisplayName(Child);
          if (elemName === 'DropzoneChildWrapper') {
            return rest;
          }
          return {};
        };

        return (
          <div {...allRootProps}
            ref={rootRef as React.LegacyRef<HTMLDivElement>}
            className={className}
            style={{
              ...allRootProps.style,
              ...style,
            }}
          >
            <input {...getInputProps(inputProps)} ref={inputRef} />
            <RenderChild parseProps={parseChildProps}>
              {children}
            </RenderChild>
          </div>
        );
      }}
    </BaseDropzone>
  );
});


type DropzoneSimpleProps = {
  children: React.ReactElement;
} & DropzoneOptions;

function DropzonedSimple({
  accept,
  children,
  ...props
}: DropzoneSimpleProps) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept, ...props });
  const Child = React.Children.only(children);
  if (!Child) {
    return null;
  }
  const ChildElem = React.cloneElement(Child, {
    acceptedFiles: acceptedFiles,
    inputProps: getInputProps(),
    rootProps: getRootProps({ isDragActive, isDragAccept, isDragReject }),
  });
  return ChildElem
}

export type {
  DropzoneProps,
  DropzoneSimpleProps,
}

export {
  useDropzone,
  Dropzone,
  DropzonedSimple,
};
