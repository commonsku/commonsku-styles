import React, { useMemo } from "react";
import * as ReactIs from "react-is";

type GenericObj = { [key: string]: any };

export type TConcreteChildElement<P = GenericObj> = React.ReactElement<P>
  | React.JSXElementConstructor<P>;
export type TChildElement<P = GenericObj> = TConcreteChildElement<P>
  | string | number | boolean | null | undefined;
type ChildProps<P = GenericObj> = {
  children: TChildElement<P>;
  parseProps?: (props: P, elem: TConcreteChildElement<P>) => Partial<P>;
};

export function getComponentDisplayName(WrappedComponent: TConcreteChildElement) {
  // @ts-ignore
  return String(WrappedComponent?.displayName || WrappedComponent?.name || 'Component');
}

const RenderChild = React.forwardRef<HTMLElement, ChildProps>(({ children, parseProps, ...props }, ref) => {
  const ChildElement = React.Children.only(children);
  const elementProps = useMemo(
    () => {
      if (typeof ChildElement === 'string'
        || typeof ChildElement === 'number'
        || typeof ChildElement === 'boolean'
        || typeof ChildElement === 'undefined'
        || ChildElement === null
      ) {
        return props;
      }

      return {
        ...(parseProps ? parseProps(props, ChildElement) : props),
        ref,
      };
    },
    [parseProps, props, ChildElement, ref]
  );

  if (typeof ChildElement === 'string'
    || typeof ChildElement === 'number'
    || typeof ChildElement === 'boolean'
    || typeof ChildElement === 'undefined'
    || ChildElement === null
  ) {
    return (
      <>{ChildElement}</>
    );
  }

  if (ReactIs.isElement(ChildElement)) {
    return React.cloneElement(ChildElement, elementProps);
  }

  return (
    <ChildElement {...elementProps} ref={ref} />
  );
});

export default RenderChild;
