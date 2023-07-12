import React from 'react';
import * as ReactIs from "react-is";
import BaseDropzone, {
  useDropzone,
  FileWithPath,
  DropzoneOptions,
  DropzoneInputProps,
  DropzoneState,
  DropzoneRootProps,
  DropzoneRef,
} from 'react-dropzone';

type ChildDropzoneState = Omit<
  DropzoneState,
  'getRootProps' | 'rootRef' | 'getInputProps' | 'inputRef'
>;

type TChild = React.ReactChild | boolean | null | undefined;
type TChildElement = React.ReactElement<Partial<ChildDropzoneState>>
  | React.ReactChild | boolean | null | undefined | TChild[]
  | React.JSXElementConstructor<Partial<ChildDropzoneState>>;

type ChildElementProps = ChildDropzoneState & {
  children?: TChildElement,
};

function getComponentDisplayName(WrappedComponent: TChildElement) {
  // @ts-ignore
  return String(WrappedComponent?.displayName || WrappedComponent?.name || 'Component');
}

/**
 * Dropzone ChildElement
 * if child element displayName === 'DropzoneChildWrapper' then it'll pass dropzone options in props
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

const ChildElement = ({
  children,
  acceptedFiles,
  draggedFiles,
  isDragAccept,
  isDragActive,
  isDragReject,
  isFileDialogActive,
  isFocused,
  open,
  rejectedFiles,
  ...props
}: ChildElementProps) => {
  if (typeof children === 'string'
    || typeof children === 'number'
    || typeof children === 'boolean'
    || typeof children === 'undefined'
    || children === null
  ) {
    return (
      <div>{children}</div>
    );
  }

  const Child = React.Children.only(children);
  if (!Child) {
    return null;
  }
  if (typeof Child === 'string'
    || typeof Child === 'number'
    || typeof Child === 'boolean'
  ) {
    return Child;
  }

  const dropzoneOptions = {
    acceptedFiles,
    draggedFiles,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFileDialogActive,
    isFocused,
    open,
    rejectedFiles,
    children,
  };

  let elementProps: Partial<ChildDropzoneState> = props;
  const elemName = getComponentDisplayName(Child);
  if (elemName === 'DropzoneChildWrapper') {
    elementProps = {
      ...props,
      ...dropzoneOptions,
    };
  }

  if (ReactIs.isElement(Child)) {
    return React.cloneElement(Child, elementProps);
  }

  return (
    <Child {...elementProps} />
  );
};

type DropzoneProps = {
  children: TChildElement;
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
            <ChildElement {...rest}>
              {children}
            </ChildElement>
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
