import React, { useState } from 'react';
import { colors, fontFamilies } from './Theme';
import { Col, Row } from './FlexboxGrid';
import { ChevronIcon } from './icons';
import { useRef } from 'react';
import { useEffect } from 'react';

type TReactNode = React.ReactChild | React.ReactPortal | null | undefined;
type BaseCollapsibleProps = React.PropsWithChildren<{
  style?: React.CSSProperties;
  label: TReactNode;
  controls?: TReactNode;
  isOpen?: boolean;
  handleToggle?: React.MouseEventHandler<HTMLDivElement>;
}>;
export const BaseCollapsible = (props: BaseCollapsibleProps) => {
  const {
    children,
    style,
    label,
    controls,
    isOpen=false,
    handleToggle,
  } = props;

  const [height, setHeight] = useState<number | undefined>(
    isOpen ? undefined : 0
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <div style={style}>
      <Row style={{
        alignItems: 'center',
        padding: 10,
        paddingTop: 12,
        paddingBottom: 8,
        background: isOpen ? colors.white : colors.teal[20],
        borderRadius: isOpen ? 25 : 2000,
        flex: 'none',
        order: 1,
        flexGrow: 0,
        ...(isOpen
          ? { border: `3px solid ${colors.teal.main}` }
          : {}),
      }}>
        <Col xs
          sm={5.9}
          style={{ cursor: 'pointer', }}
          onClick={handleToggle}
        >
          <CollapsibleLabel isOpen={isOpen}>{label}</CollapsibleLabel>
        </Col>
        <Col xs
          sm={5.9}
          style={{ cursor: 'pointer', }}
          smStyle={`text-align: right;`}
          xsStyle={`text-align: center;`}
          onClick={handleToggle}
        >
          <CollapsibleControls isOpen={isOpen}>{controls}</CollapsibleControls>
        </Col>
        <Col xs
          style={{
            overflow: 'hidden',
            transition: 'height 0.2s ease-in-out',
            height: height,
          }}
        >
          <div ref={ref}>{children}</div>
        </Col>
      </Row>
    </div>
  );
};

type CollapsibleProps = React.PropsWithChildren<{
  style?: React.CSSProperties;
  label: TReactNode;
  controls?: TReactNode;
  open?: boolean;
  onToggleOpen?: (v: boolean) => void;
}>;

const Collapsible = (props: CollapsibleProps) => {
  const {
    children,
    open,
    onToggleOpen,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(open);
  const handleToggle = () => {
    setIsOpen(prev => {
      const val = !prev;
      onToggleOpen && onToggleOpen(val);
      return val;
    });
  };

  return (
    <BaseCollapsible isOpen={isOpen} handleToggle={handleToggle} {...rest}>
      {children}
    </BaseCollapsible>
  );
};

type CollapsibleLabelProps = {
  children?: TReactNode;
  isOpen?: boolean;
};
export const CollapsibleLabel = (props: CollapsibleLabelProps) => {
  const { children, isOpen } = props;

  if (children === undefined || children === null) {
    return null;
  }
  if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    return <span
      style={{
        color: colors.teal.main,
        fontFamily: fontFamilies.bold,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
      }}>{children}</span>;
  }
  return React.cloneElement(children, { isOpen });
};

type CollapsibleArrowIconProps = {
  isOpen?: boolean;
};
export const CollapsibleArrowIcon = (props: CollapsibleArrowIconProps) => {
  const { isOpen } = props;

  return <ChevronIcon
    size='medium'
    direction={'down'}
    altText={isOpen ? 'Close' : 'Open'}
    style={{
      transition: 'all 0.2s linear',
      MozTransition: 'all 0.2s linear',
      WebkitTransition: 'all 0.2s linear',
      ...(isOpen ? {
        transform: 'rotate(180deg)',
        MozTransform: 'rotate(180deg)',
        WebkitTransform: 'rotate(180deg)',
      } : {
        transform: 'rotate(360deg)',
        MozTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)',
      }),
    }}
  />;
};

type CollapsibleControlsProps = {
  children?: TReactNode;
  isOpen?: boolean;
};
const CollapsibleControls = (props: CollapsibleControlsProps) => {
  const { children, isOpen=false, } = props;
  if (children === undefined || children === null) {
    return <CollapsibleArrowIcon isOpen={isOpen} />;
  }

  if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    return <span
      style={{
        color: colors.teal.main,
        fontFamily: fontFamilies.bold,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
      }}>{children}</span>;
  }
  return React.cloneElement(children, { isOpen });
};

type CollapsiblesProps = {
  list: CollapsibleProps[];
  controls?: TReactNode;
};
export function Collapsibles(props: CollapsiblesProps) {
  const { list, controls } = props;
  const [open, setOpen] = useState(-1);
  const handleOpen = (i: number) => setOpen(s => s === i ? -1 : i);

  return (
    <div>{
      list.map((v, i) => (
        <BaseCollapsible
          key={`Collapsible-key-${i}`}
          label={v.label}
          style={{ paddingBottom: 10, ...v.style }}
          controls={controls || v.controls}
          isOpen={open === i}
          handleToggle={() => {
            handleOpen(i);
          }}
        >{v.children}</BaseCollapsible>
      ))
    }</div>
  );
}

export default Collapsible;
