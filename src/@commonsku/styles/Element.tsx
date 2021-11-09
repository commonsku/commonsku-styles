import styled from 'styled-components';
import { ElementProps, parseProps } from './element/index';

const Element = styled.div.attrs<ElementProps>({})<ElementProps>(
    (props: ElementProps) => parseProps(props),
);

export default Element;
