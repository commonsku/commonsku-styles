import React from "react";
import * as ReactIs from "react-is";

type TChildElement = React.ReactElement<{ [key: string]: any }>
  | string | number | boolean | null | undefined
  | React.JSXElementConstructor<{ [key: string]: any }>;
type ChildProps = { children?: TChildElement };
const RenderChild = ({ children, ...props }: ChildProps) => {
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

  const ChildE = React.Children.only(children);
  if (!ChildE) {
    return null;
  }
  if (typeof ChildE === 'string'
    || typeof ChildE === 'number'
    || typeof ChildE === 'boolean'
  ) {
    return ChildE;
  }

  if (ReactIs.isElement(ChildE)) {
    return React.cloneElement(ChildE, props);
  }

  return (
    <ChildE {...props} />
  );
};

export default RenderChild;
