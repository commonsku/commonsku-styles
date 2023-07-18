import React, { useCallback, useImperativeHandle } from 'react';
import {
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

export type DropZoneProps = DropzoneOptions & {
  children: TChildElement<Partial<ChildDropzoneState>>;
  className?: string;
  style?: React.CSSProperties,
  rootProps?: DropzoneRootProps,
  inputProps?: DropzoneInputProps,
};

/**
 * DropZone
 *
 * if child element's displayName === 'DropzoneChildWrapper' then it'll pass dropzone options in props
 *
 * Example with dropzone wrapper (dropzone props will be passed in children):
 * ```
 * const DropzoneChildWrapper = ({ open, ...dropzoneOptions }) => {
 *   // do something with dropzoneOptions...
 *   return (
 *     <>
 *       <button onClick={open}>Upload</button>
 *       <div>{draggedFiles.map(f => <div>{f.name (f.type)}</div>)}</div>
 *     </>
 *   );
 * };
 * DropzoneChildWrapper.displayName = 'DropzoneChildWrapper';
 *
 * <DropZone noClick={true} onDrop={...}>
 *   <DropzoneChildWrapper />
 * </DropZone>
 * ```
 *
 * ---------------------------------------------------------
 *
 * Example without dropzone wrapper (dropzone props will NOT be passed in children):
 * ```
 * <DropZone onDrop={...}>
 *   <button onClick={() => {}}>Upload</button>
 * </DropZone>
 * ```
 *
 */
export const DropZone = React.forwardRef<DropzoneRef, DropZoneProps>(({ children, className, rootProps, inputProps, style={}, ...props }, ref) => {
  const { open, getRootProps, rootRef, getInputProps, inputRef, ...rest } = useDropzone(props);

  useImperativeHandle(ref, () => ({ open }), [open]);

  const allRootProps = getRootProps(rootProps);
  const parseChildProps = useCallback(
    (
      p: object,
      Child: TConcreteChildElement<Partial<ChildDropzoneState>>
    ) => {
      const elemName = getComponentDisplayName(Child);
      if (elemName === 'DropzoneChildWrapper') {
        return rest;
      }
      return {};
    },
    [rest]
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
