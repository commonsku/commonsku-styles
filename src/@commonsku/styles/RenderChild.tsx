import React from "react";
import * as ReactIs from "react-is";

type GenericObj = { [key: string]: any };

export type TConcreteChildElement<P = GenericObj> = React.ReactElement<P>
  | React.JSXElementConstructor<P>;
export type TChildElement<P = GenericObj> = TConcreteChildElement<P>
  | string | number | boolean | null | undefined;
type ChildProps<P = GenericObj> = {
  children?: TChildElement<P>;
  parseProps?: (props: P, elem: TConcreteChildElement<P>) => Partial<P>;
};

export function getComponentDisplayName(WrappedComponent: TConcreteChildElement) {
  // @ts-ignore
  return String(WrappedComponent?.displayName || WrappedComponent?.name || 'Component');
}

const RenderChild = ({ children, parseProps, ...props }: ChildProps) => {
    if (typeof children === 'string'
    || typeof children === 'number'
    || typeof children === 'boolean'
    || typeof children === 'undefined'
    || children === null
  ) {
    return (
      <>{children}</>
    );
  }

  const ChildElement = React.Children.only(children);
  if (!ChildElement) {
    return null;
  }
  if (typeof ChildElement === 'string'
    || typeof ChildElement === 'number'
    || typeof ChildElement === 'boolean'
  ) {
    return ChildElement;
  }

  const elementProps = parseProps ? parseProps(props, ChildElement) : props;
  if (ReactIs.isElement(ChildElement)) {
    return React.cloneElement(ChildElement, elementProps);
  }

  return (
    <ChildElement {...elementProps} />
  );
};

export default RenderChild;
