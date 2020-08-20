import React from 'react'
import styled from 'styled-components';
import { Row, Col } from './FlexboxGrid';
import { H2 } from './Headings'
import { valIsValid } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { SizerTypes, SizerCss } from './Sizer'


type SidePanelType = {
  animationDuration?: number;
  visible?: boolean;
  from?: "left" | "right" | "bottom" | "top";
  height?: number;
  width?: number;
};

function getSlideStyles(from:"left"|"right"|"bottom"|"top"="right", visible:boolean=false, height:number=50) {
  if (from === "right") {
    return `left: auto; right: 0; top: 0; bottom: 0; transform: translateX(${visible ? '0%' : '100%'});`;
  } else if (from === "left") {
    return `right: auto; left: 0; top: 0; bottom: 0; transform: translateX(${visible ? '0%' : '-100%'});`;
  } else if (from === "bottom") {
    return `height: ${height}vh; right: 0; left: 0; top: ${100 - height}vh; bottom: 0; transform: translateY(${visible ? '0%' : '100%'});`;
  } else if (from === "top") {
    return `height: ${height}vh; right: 0; left: 0; bottom: ${100 - height}vh; top: 0; transform: translateY(${visible ? '0%' : '-100%'});`;
  }
  return '';
}

export const StyledPanel = styled.div<SidePanelType>`
  height: ${p => valIsValid(p.height) ? p.height : p.from === "bottom" || p.from === "top" ? 50 : 100}vh;
  background: white;
  position: fixed;
  width: ${p => valIsValid(p.width) ? p.width : p.from === "bottom" || p.from === "top" ? '100%' : '560px'};
  z-index: 300;
  box-shadow: 0 0 10px rgba(61, 79, 90, 0.27);
  padding: 1em;
  overflow: scroll;
  @media only screen and (max-width: 640px) {
    width: 100% !important;
  }
  ${p => getSlideStyles(p.from, p.visible, p.height)}
  transition: transform ${p => (
    //@ts-ignore
    (valIsValid(p.animationDuration) ? p.animationDuration : 300) / 1000
  )}s ease-out;
  ${SharedStyles}
  ${SizerCss}
`;
StyledPanel.defaultProps = {
  animationDuration: 300,
  visible: false,
  from: "right",
};

const Backdrop = styled.div<SidePanelType>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(67, 83, 91, .3);
  z-index: 100;
  ${p => getSlideStyles(p.from, p.visible, p.height)}
`;
Backdrop.defaultProps = {
  visible: false,
  from: "right",
};

const SidePanel = ({
  from = "right", visible = false, animationDuration = 300, fullWidthTitle = false,
  backdrop=false, controls, header, title,
  children,
  ...props }: React.PropsWithChildren<{
    header?: React.ReactNode,
    title: string,
    controls: React.ReactNode,
    fullWidthTitle?: boolean,
    backdrop?: boolean,
  } & SidePanelType & SharedStyleTypes & SizerTypes>) => {
  return <>
    <StyledPanel animationDuration={animationDuration} visible={visible} from={from} {...props}>
      {header || <div>
        {!fullWidthTitle
          ? <Row>
            <Col><H2>{title}</H2></Col>
            <Col style={{ textAlign: "right" }}>{controls}</Col>
          </Row>
          : <div>
            <Row><Col style={{ textAlign: "right" }}>{controls}</Col></Row>
            <Row><Col><H2>{title}</H2></Col></Row>
          </div>}
      </div>}
      {children}
    </StyledPanel>
    {backdrop ? <Backdrop visible={visible} from={from} height={props.height} /> : null}
  </>
}


const NameAndPosition = styled.div`
  display: inline-block;
  width: 90%;
`

const Name = styled.div`
  font-weight: bold;
`

const Position = styled.div`
  font-size: .8em;
`
const Email = styled.a`
  font-size: .8em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
`

const Contact = styled.div<SizerTypes>`
 &&& {
    display: flex;
    flex-basis: 50%;
    margin-bottom: 15px;
    ${SizerCss}
  }
`

const PanelContact = ({avatar, name, position, email, ...props}: { name:string, position?:string, email?:string, phone?:string, avatar?:React.ReactNode } & SizerTypes) => {
  return (
    <Contact {...props}>
      <Col xs>
        { avatar ? avatar : null }
        <NameAndPosition style={{ width: avatar ? '77%' : '95%' }}>
          <Name>{name}</Name>
          { position ? <Position>{position}</Position> : null }
        </NameAndPosition>
      </Col>
      { email ? <Col xs>
        <Email href={"mailto:" + email}>{email}</Email>
      </Col> : null }
    </Contact>
  )
}

const PHONE_TYPES: {[key: string]: string} = {
  'WORK': 'W',
  'HOME': 'H',
  'CELL': 'C',
  'FAX': 'F',
};

type PhoneType = {
  phone_number?: string,
  phone_type?: string,
  phone_extension?: string,
}

const PanelTileContact = ({avatar, name, position, email, phones, ...props}: { name:string, position?:string, email?:string, phones?:Array<PhoneType>, avatar?:React.ReactNode } & SizerTypes) => {
  return (
    <Contact {...props}>
        { avatar ? avatar : null }
        <NameAndPosition style={ avatar ? { width: '74%', marginLeft: '3%' } : {width: '95%'}}>
          <Name>{name}</Name>
          { position ? <Position>{position}</Position> : null }
          { email ? <Email href={"mailto:" + email}>{email}</Email> : null }
          { phones && phones.length>0 ? phones.map((p, i) =>
            p.phone_number ? <div key={'PHONE-' + p.phone_type + i}>
              {p.phone_type ? (PHONE_TYPES[p.phone_type] || p.phone_type) : 'Ph'} {p.phone_number} {p.phone_extension && 'x'+p.phone_extension}
            </div> : ''
          ) : null }
        </NameAndPosition>
    </Contact>
  )
}

export { SidePanel, PanelContact, PanelTileContact };

