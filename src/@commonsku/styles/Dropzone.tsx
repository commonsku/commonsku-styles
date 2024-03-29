import React, { useCallback, useImperativeHandle } from 'react';
import {
  useDropzone,
  DropzoneOptions,
  DropzoneInputProps,
  DropzoneState,
  DropzoneRootProps,
  DropzoneRef,
} from 'react-dropzone';
import RenderChild, { TChildElement, TConcreteChildElement } from './RenderChild';

type ChildDropzoneState = Omit<
  DropzoneState,
  'getRootProps' | 'rootRef' | 'getInputProps' | 'inputRef'
>;

export type DropzoneProps = DropzoneOptions & {
  children: TChildElement<Partial<ChildDropzoneState>>;
  className?: string;
  style?: React.CSSProperties,
  rootProps?: DropzoneRootProps,
  inputProps?: DropzoneInputProps,
  useDropzoneProps?: boolean;
};

/**
 * Dropzone
 *
 * if `useDropzoneProps={true}` is passed then dropzone options props will passed to child element
 *
 * Example with `useDropzoneProps={true}` (dropzone props will be passed in children):
 * ```
 * const DropzoneChild = ({ open, ...dropzoneOptions }) => {
 *   // do something with dropzoneOptions...
 *   return (
 *     <>
 *       <button onClick={open}>Upload</button>
 *       <div>{draggedFiles.map(f => <div>{f.name (f.type)}</div>)}</div>
 *     </>
 *   );
 * };
 *
 * <Dropzone useDropzoneProps={true} noClick={true} onDrop={...}>
 *   <DropzoneChild />
 * </Dropzone>
 * ```
 *
 * ---------------------------------------------------------
 *
 * Example without `useDropzoneProps` (dropzone props will NOT be passed in children):
 * ```
 * <Dropzone onDrop={...}>
 *   <button onClick={() => {}}>Upload</button>
 * </Dropzone>
 * ```
 *
 */
export const Dropzone = React.forwardRef<DropzoneRef, DropzoneProps>((
  { children, className, rootProps, inputProps, style={}, useDropzoneProps = false, ...props },
  ref
) => {
  const { getRootProps, rootRef, getInputProps, inputRef, ...rest } = useDropzone(props);

  useImperativeHandle(ref, () => ({ open: rest.open }), [rest.open]);

  const allRootProps = getRootProps(rootProps);
  const parseChildProps = useCallback(
    (p: object, Child: TConcreteChildElement<Partial<ChildDropzoneState>>) => (
      useDropzoneProps ? rest : {}
    ),
    [rest, useDropzoneProps]
  );

  return (
    <React.Fragment>
      <div {...allRootProps}
        ref={rootRef as React.RefObject<HTMLDivElement>}
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
    </React.Fragment>
  );
});
