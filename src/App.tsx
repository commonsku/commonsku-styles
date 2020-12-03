import React, { useState, useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components'

import product_pic1 from './products/1.png';
import product_pic2 from './products/2.png';
import product_pic3 from './products/3.png';
import product_pic4 from './products/4.png';
import product_pic5 from './products/5.png';
import product_wide from './products/wide.png';
import product_narrow from './products/narrow.png';

import user_pic1 from './users/1.jpeg';
import user_pic2 from './users/2.jpeg';
import user_pic3 from './users/3.jpeg';
import user_pic4 from './users/4.jpeg';
import user_pic5 from './users/5.jpeg';

import makeData from './makeData';

import { Loading, LockIcon, InfoIcon, CouponIcon, PanelIcon, NoteIcon, TaskIcon } from './@commonsku/styles/icons';

import { 
    Avatar, 
    Box, 
    Background,
    DropArea, Dropzoned, DropzonedPreviews,
    Button, 
    H1, H2, H5, 
    Label,
    Page,
    Toggle,
    ToggleLink, 
    LabeledInput,
    LabeledTextarea,
    Input,
    Spinner,
    SidePanel,
    Tabs,
    Select,
    LabeledSelect,
    LabeledProgress,
    PanelContact,
    PanelTileContact,
    Product,
    Artwork,
    Row, Col,
    Popup,
    Task,
    Link,
    Number,
    FeedPost, Publisher,
    ButtonsGroup, LabeledRadio, LabeledCheckbox,
    Table, TD, TH, TR, THead, TBody,
    Datepicker,
    ErrorBoundary,
    Theme,
    Dropdown,
    CreatableSelect,
    HeadlessTable,
    StatusDropdown,
    StateDropdown,
    AwaitingProofIcon,
    ProofReceivedIcon,
    PendingApprovalIcon,
    ChangeRequestedIcon,
    ClientApprovedIcon,
    ColumnSelectIcon,
    ProofingCompleteIcon,
    NoMarketingIcon,
    YesMarketingIcon,
    Text,
    Collapsible,
    CollapsiblePanel,
    CollapsiblePanels,
    colors,
} from '@commonsku/styles';
import { useFilters } from 'react-table';

const initialState = {
  date: new Date(),
  startDate: new Date(),
  endDate: null,
  focusedInput: false,
};

const options = [
  { value: 'skucon', label: 'Skucon' },
  { value: 'skucamp', label: 'Skucamp' },
  { value: 'others', label: 'Others' },
  { value: 'others 1', label: 'Others 1' },
  { value: 'others 2', label: 'Others 2' },
  { value: 'others 3', label: 'Others 3' },
  { value: 'others 4', label: 'Others 4' },
  { value: 'others 5', label: 'Others 5' },
]

const statuses = [
  { 
    value: 'OK', 
    content: 'OK', 
    color: "#00D374", 
    onClick: (item, row) => {
      console.log(item, row)
    }
  },
  { 
    value: 'PROBLEM', 
    content: 'Problem', 
    color: "#FF2674", 
    onClick: (item, row) => {
      console.log(item, row)
    }
  },
  { 
    value: 'FOLLOWUP', 
    content: 'Followup', 
    color: "#FFAE00", 
    onClick: (item, row) => {
      console.log(item, row)
    }
  }
]

const states = [
  { 
    value: 'new', 
    content: 'New', 
    order: 1, 
    onClick: (item, row) => {
      console.log(item, row)
    }
  },
  { 
    value: 'submitted', 
    content: 'Submitted', 
    order: 2, 
    oonClick: (item, row) => {
      console.log(item, row)
    } 
  },
  { 
    value: 'reviewed', 
    content: 'Reviewed', 
    order: 3, 
    onClick: (item, row) => {
      console.log(item, row)
    }
  },
  { 
    value: 'attempted', 
    content: 'Attempted', 
    order: 4, 
    oonClick: (item, row) => {
      console.log(item, row)
    } 
  },
  { 
    value: 'abandoned', 
    content: 'Abandoned', 
    order: 5, 
    oonClick: (item, row) => {
      console.log(item, row)
    } 
  },
  { 
    value: 'long', 
    content: 'Super Loooooooooooooooooooooooog Description', 
    order: 6, 
    onClick: (item, row) => {
      console.log(item, row)
    }
  }
]

const tableData = [
  {"rowId":1,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":2,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":3,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":4,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":5,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":6,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":7,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":8,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":9,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":10,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":11,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":12,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":13,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":14,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":15,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":16,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":17,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":18,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":19,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":20,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":21,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":22,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":23,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":24,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":25,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":26,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":27,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":28,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":29,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":30,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":31,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":32,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":33,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":34,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":35,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":36,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":37,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":38,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":39,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":40,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":41,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":42,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":43,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":44,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":45,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":46,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":47,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":48,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":49,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":50,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":51,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":52,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":53,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":54,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":55,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":56,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":57,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":58,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":59,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":60,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":61,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":62,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":63,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":64,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":65,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":66,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":67,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":68,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":69,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":70,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":71,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":72,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":73,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":74,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":75,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":76,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":77,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":78,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":79,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":80,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":81,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value},
  {"rowId":82,"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"progress":24,"status": statuses[0].value},
  {"rowId":83,"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"progress":15,"status": statuses[0].value},
  {"rowId":84,"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"progress":85,"status": statuses[0].value}
] 

function reducer(state: {[key: string]: any} = initialState, action: {type: string, payload: any}) {
  console.log(action);
  switch (action.type) {
    case "focusChange":
      return { ...state, ...action.payload };
    case "dateChange":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeRadio, setRadio] = useState(1);
  const [mustard, toggleMustard] = useState(false);
  const [ketchup, toggleKetchup] = useState(false);
  const [lock, setLock] = useState(false);
  const [colorfulBars, setColorfulBars] = useState(false);
  const [sidePanelRow, setSidePanelRow] = useState(null);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    if(sidePanelRow) {
      setShowPanel(true)
    }else{
      setShowPanel(false)
    }
  }, [sidePanelRow])

  const [state, dispatch] = useReducer(reducer, initialState);

  const tableColumns = [
    {
      Header: () => <div>&nbsp;</div>, 
      accessor: 'rowId', 
      sticky: 'left',
      noDrag: true,
      width: 50,
      isRowId: true
    },
    {
      Header: () => <span style={{ textAlign: "left" }}>First Name</span>,
      accessor: 'firstName',
      sticky: 'left',
      noDrag: true,
      width: 100
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      sticky: 'left',
      noDrag: true,
      hasTooltip: true,
      tooltipContent: (row) => {
        if(row.lastName.length <= 5) {
          return null
        }

        return (
          <span style={{
            width: '120px',
            backgroundColor: 'black',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '6px',
            padding: '5px 0',
            position: 'absolute',
            zIndex: 100
          }}>{row.lastName}</span>
        )
      }
    },
    {
      Header: <span style={{ textAlign: "left" }}>Status</span>,
      accessor: 'status',
      Cell: (row) => {
        const po = row.row.original
        const wrapper = useRef(null)
        const [menuIsOpen, setMenuIsOpen] = useState(false)

        useEffect(() => {
          setZIndex()
        }, [menuIsOpen])

        function setZIndex() {
          if(menuIsOpen) {
            // @ts-ignore
            wrapper.current.parentNode.style.zIndex = 4
          }else{
            // @ts-ignore
            wrapper.current.parentNode.style.zIndex = 3
          }
        }

        return (
          <div ref={wrapper}>
            <StatusDropdown
              items={statuses} 
              value={statuses[0]} 
              row={po}
              setMenuIsOpen={setMenuIsOpen}
            />
          </div>
        )
      }
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: <span style={{ display: 'inline-block', marginLeft: '50px' }}>Visits</span>,
      accessor: 'state',
      Cell: (row) => {
        const po = row.row.original
  
        return (
          <StateDropdown
            items={states} 
            value={states[0]} 
            row={po}
            showCircles={false}
          />
        )
      }
    },
    {
      Header: 'Profile Progress',
      accessor: 'progress',
    },
  ]

  const pageIndexDivRef = useRef(null)
  const sortDirectionDivRef = useRef(null)
  const currentColumnsDivRef = useRef(null)

  function onChangeSelected(id) {
    if(id) {
      setShowPanel(true)
    }else{
      setShowPanel(false)
    }
  }

  function onChangeSortOrColumns(e) {
    console.log(e)
  }

  return <Theme><Page>
    <SidePanel title="Panel Title"
      // fullWidthTitle
      controls={<Button onClick={() => { setShowPanel(false); setSidePanelRow(null) }}>Close Panel</Button>}
      visible={showPanel}
      animationDuration={300}
      from="right"
      height={100}
      //backdrop
      bodyScrollable={false}
    >
      <Tabs padded tabs={[
        { label: "Contacts", content: <Row>
                                         <PanelTileContact key="0" name="Jeff Dienstman" avatar={<Avatar/>} position="Marketing Coordinator" email="jeffdfsdfsdfsdfs.dfsdfsdfs@sdfsdfsdabc.com" phone="843-443-4432" />
                                         <PanelTileContact key="1" name="Caralyn Smith" avatar={<Avatar pic="https://commonsku.com/img/brand/icon.png"/>} position="Marketing Coordinator" email="caralyn@abc.com" phone="843-443-4432" />
                                         <PanelTileContact key="2" name="Jenny Smith" avatar={<Avatar/>} position="Intern" email="jenny@abc.com" phone="843-443-4432" />
                                      </Row>},
        { label: "Addresses", content: <div>This is tab number two</div> },
        { label: "Third Tab", content: <div>This is the last tab</div> },
      ]}
      />
    </SidePanel>
    <Background padded fillWindow>
    <div>
      {showPopup && <Popup
        title={'Hello popup'}
        onClose={() => {
            setShowPopup(false);
        }}
      >
        Hello from Popup
        <br/>
        <Select inPopup options={options} value={options[0]} />
        <CreatableSelect inPopup options={options} value={options[0]}
          onChange={(newValue: any, actionMeta: any) => {
            console.group('Value Changed');
            console.log(newValue);
            console.log(`action: ${actionMeta.action}`);
            console.groupEnd();
          }} />
      </Popup>}
    </div>
      <Box padded borderless controls={<Button secondary>Box Controls</Button>} title="Some Commonsku Components">
        <Row>
          <Col xs>
            <div>
              <Button mr={10} onClick={() => setShowPanel(!showPanel)}>Show Panel</Button>
              <Button mr={10} cta onClick={() => setShowPopup(true)}>Show Popup</Button>
              <Dropdown text="Drop Down" items={
                [
                  {onClick: () => null, content: 'New Contact'},
                  {onClick: () => null, content: 'New Address'},
                ]
               }/>
              <Dropdown text="Dropdown Panel" icon={<NoteIcon width="40" />}>
                <Row>
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: Event) => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: Event) => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: Event) => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: Event) => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: Event) => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: Event) => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: Event) => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: Event) => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: Event) => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: Event) => toggleKetchup(!ketchup)} />
                </Row>
              </Dropdown>
              <Link block mt={20}>Link</Link>
            </div>

            <H5>Bars Loading</H5>
            <div style={{maxWidth: 150}}>
              <Toggle stretch mb={10} onClick={() => setColorfulBars(!colorfulBars)}>
                <ToggleLink selected={!colorfulBars} stretch pr pl>Regular</ToggleLink>
                <ToggleLink selected={colorfulBars} stretch>Colorful</ToggleLink>
              </Toggle>
            </div>
            <div style={{maxWidth: 90}}>
              <Loading mb={10} colorful={colorfulBars} />
            </div>

            <ProofingCompleteIcon width={"1.5rem"}/>
            <ClientApprovedIcon width={"1.5rem"}/>
            <ColumnSelectIcon width={"1.5rem"}/>
            <AwaitingProofIcon width={"1.5rem"}/>
            <ProofReceivedIcon width={"1.5rem"}/>
            <PendingApprovalIcon width={"1.5rem"}/>
            <ChangeRequestedIcon width={"1.5rem"}/>
            <PanelIcon color={"#00d374"} width={"1.5rem"}/>
            <TaskIcon color={"black"} width={"1.5rem"}/>
            <NoteIcon color={"black"} width={"1.5rem"}/>
            <NoMarketingIcon width={"1.5rem"}/>
            <YesMarketingIcon width={"1.5rem"}/>

            <Link><CouponIcon color={"red"} width={"1.5rem"} mr={5}/>Link</Link>
            <InfoIcon ml={5}/> 




            <Link onClick={() => setLock(!lock)}>
              <LockIcon color={"#00d374"} ml={10} width={".9rem"} locked={lock}/>
            </Link>




            <H5>Number formatting</H5>
            <Number commas decimalPoints={4} num={334353434.44334}/>
            <br/>
            <Number commas decimalPoints={0} num={334353434.44334}/>
            <br/>
            <Number commas num={334353434.44334}/>

            <Row>
              <Col xs={3}>
                <H5>Single Datepicker</H5>
                <Datepicker
                  value={state.date}
                  onChange={(data: any) => dispatch({type: "dateChange", payload: data })}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={3}>
            <LabeledRadio label="Active" checked={activeRadio === 1} onChange={(e) => setRadio(1)} />
            </Col>
            </Row>

            <H5>Radio</H5>
            <ButtonsGroup>
              <LabeledRadio label="Active" checked={activeRadio === 1} onChange={(e) => setRadio(1)} />
              <LabeledRadio label="Inctive" checked={activeRadio === 0} onChange={(e) => setRadio(0)} />
              <LabeledRadio label="All" checked={activeRadio === -1} onChange={(e) => setRadio(-1)} />
            </ButtonsGroup>

            <H5>Collapsible</H5>
            <div style={{border: `1px solid ${colors.primary}`, padding: 10, cursor: 'pointer'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: '1.3rem', marginBottom: 5}}
                onClick={e => setCollapse(!collapse)}
              >Click Me</Text>
              <Collapsible isOpen={collapse} style={{background: colors.primary}}>
               <Row>
                 <Col xs padded>
                  <Text style={{color: '#fff'}}>Collapsible body</Text>
                 </Col>
               </Row>
              </Collapsible>
            </div>
            <CollapsiblePanel title="Collapsible Panel Title" components={{
              Title: ({onClick}) => <Button onClick={onClick}>Click Me</Button>
            }}>
              <Row>
                <Col xs padded>
                  Testttttt
                </Col>
                <Col xs padded>
                  Testttttt
                </Col>
                <Col xs padded>
                  Testttttt
                </Col>
                <Col xs padded>
                  Testttttt
                </Col>
                <Col xs padded>
                  Testttttt
                </Col>
              </Row>
            </CollapsiblePanel>
            <CollapsiblePanel title="Collapsible Panel Title 2">
              <Row>
                <Col xs padded>
                  Testttttt
                </Col>
              </Row>
            </CollapsiblePanel>
            <CollapsiblePanel title="Collapsible Panel Title 3">
              Testttttt
            </CollapsiblePanel>

            <H5>Collapsible Panels</H5>
            <CollapsiblePanels spaceBetween onClickPanel={i => {console.log(i, 'Clicked')}} panels={[
              {title: "Collapsible Panel Title 11", children: <p style={{padding: 20}}>HELLOOO 11</p>},
              {title: "Collapsible Panel Title 12", children: <p style={{padding: 20}}>HELLOOO 12</p>},
            ]} />

            <H5>Checkbox</H5>
            <ButtonsGroup>
              <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: Event) => toggleMustard(!mustard)} />
              <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: Event) => toggleKetchup(!ketchup)} />
            </ButtonsGroup>

            <H5>Avatar</H5>
            <Avatar pic="https://commonsku.com/img/brand/icon.png" />
            <Avatar />

            <H5>Select</H5>
            <LabeledSelect label="Labeled Select" name="events" noMargin options={[{ value: 'skucon', label: 'Skucon' }, { value: 'skucamp', label: 'Skucamp' }, { value: 'others', label: 'Others' }]} />

            <H5>Input</H5>
            <LabeledInput label="Labeled Input" placeholder="Input" isPercent />

            <H5>Text Area</H5>
            <LabeledTextarea label="Labeled Textarea" placeholder="Input" />

            <H5>Progress</H5>
            <LabeledProgress max={4389.99} value={8434.44}/>

            <H5>Drop Area</H5>
            <DropArea placeholder="Drop Here"></DropArea>

            <H5>Dropzoned</H5>
            <Dropzoned showDroppedFiles />

            <H5>DropZoned Preview</H5>
            <DropzonedPreviews accept="image/*" multiple onDrop={(acceptedFiles, rejectedFiles, event) => {
              console.log(acceptedFiles);
            }} />

            <H5>Product</H5>
       	    <Row>
              <Col padded xs={4}>
                <Product name="Gratuiously Lengthy But Highly Descriptive Product Name" supplier="Extremely Long And Tedious Supplier Name" sku="#6410" rating={1} price={16.3} currency="USD" picture={product_pic1}/>
              </Col>
              <Col padded xs={4}>
                <Product name="Sueded Crew" supplier="Next Level Apparel" sku="#6410" rating={5} price={16.3} currency="USD" picture={product_pic2}/>
              </Col>
              <Col padded xs={4}>
                <Product name="Sueded Crew" supplier="Next Level Apparel" sku="#6410" rating={5} price={16.3} currency="USD" picture={product_pic2}/>
              </Col>
            </Row>

            <H5>Artwork &amp; Files</H5>
       	    <Row>
              <Col padded xs={3}>
                <Artwork date="Jan 3 2020" name="long_name_of_artwork_should_be_truncated.svg" picture={product_pic1} edit onEdit={() => alert("hi")} onDelete={() => alert("deleting")} onSave={() => alert("saving")}/>
              </Col>
              <Col padded xs={3}>
            <LabeledSelect label="Labeled Select" name="events" noMargin options={[{ value: 'skucon', label: 'Skucon' }, { value: 'skucamp', label: 'Skucamp' }, { value: 'others', label: 'Others' }]} />
                <Artwork name="squirrel.png" picture={product_pic2} onEdit={() => alert("hi")} onDelete={() => alert("deleting")} onClick={() => alert("clicked")} onDownload={() => alert("downloading")}/>
              </Col>
              <Col padded xs={3}>
                <Artwork date="Jan 3 2020" name="squirrel.png" picture={product_wide} onEdit={() => alert("hi")} onDelete={() => alert("deleting")}/>
              </Col>
              <Col padded xs={3}>
                <Artwork date="Jan 3 2020" name="squirrel.png" picture={product_narrow} onEdit={() => alert("hi")} onDelete={() => alert("deleting")}/>
              </Col>
            </Row>
       	    <Row>
              <Col padded xs={3}>
                <Artwork edit date="Jan 3 2020" name="long_name_of_artwork_should_be_truncated.doc" onEdit={() => alert("hi")} onDelete={() => alert("deleting")} onSave={() => alert("saving")}/>
              </Col>
              <Col padded xs={3}>
                <Artwork date="Jan 3 2020" name="long_name_of_artwork_should_be_truncated.csv" onEdit={() => alert("hi")} onDelete={() => alert("deleting")} onSave={() => alert("saving")}/>
              </Col>
              <Col padded xs={3}>
                <Artwork date="Jan 3 2020" name="long_name_of_artwork_should_be_truncated.xls" onEdit={() => alert("hi")} onDelete={() => alert("deleting")} onSave={() => alert("saving")}/>
              </Col>
              <Col padded xs={3}>
                <Artwork date="Jan 3 2020" name="long_name_of_artwork_should_be_truncated.ppt" onEdit={() => alert("hi")} onDelete={() => alert("deleting")} onSave={() => alert("saving")}/>
              </Col>
            </Row>

            <H5>Task</H5>
            <Task date="2019-11-06" taskName="Check Status" taskBody="Call the client and check if they are ready to order"/>
            <Task date="2019-11-06" taskName="Verify Client" taskBody="Verify this client's status"/>
            <Task date="2019-11-06" taskName="Research" taskBody="Do some more research"/>
            <Task date="2019-11-06" taskName="Find Products" taskBody="Find relevant products and put together a presentation"/>
            
            <H5>Feed</H5>
            <Publisher/>
            <FeedPost author={{name:"Samantha Kates", avatar: user_pic2}}
                      subject="SO#1233"
                      date="Feb 20"
                      body={<div>Samantha Kates added a note to <a href="#">John Doe's</a><br/>PO#15310 flagged as Confirmed. </div>}
                      comments={[ <FeedPost author={{name:"Bob Peterson", avatar: user_pic1}} date="Feb 20" body={<div>Finally!</div>}/>]} />
            <FeedPost author={{name:"Samantha Kates", avatar: user_pic2}}
                      subject="SO#1233"
                      date="Feb 20"
                      body={<div>Joe Jemple added a note to <a href="#">John Doe's</a><br/>PO#15310 flagged as Shipped. </div>}
                      comments={[]} />
            <FeedPost author={{name:"Samantha Kates", avatar: user_pic2}}
                      subject="SO#1233"
                      date="Feb 20"
                      body={<div>Subject: SALES ORDER #1233 <br/> This is an email about a portal</div>}
                      comments={[]} />

            <H5>Toggle</H5>
            <Toggle stretch mb={10}>
              <ToggleLink selected stretch pr pl>Active</ToggleLink>
              <ToggleLink stretch>Inactive</ToggleLink>
            </Toggle>
            <br/><br/>
            <Toggle ml={10}>
              <ToggleLink selected stretch pr={20} pl={20}>Active</ToggleLink>
              <ToggleLink stretch pr={20} pl={20}>Inactive</ToggleLink>
            </Toggle>
            <H5>Tabs</H5>
            <Tabs tabs={[
              { label: "First Tab", content: <div>This is the first tab</div> },
	            { label: "Second Tab", content: <div>This is tab number two</div> },
              { label: "Third Tab", content: <div>This is the last tab</div> },
            ]}
            />

            <H5>Table</H5>
            <Table>
              <THead>
                  <TR>
                      <TH>Header 0</TH>
                      <TH clickable>Header 1</TH>
                      <TH>Header 2</TH>
                      <TH>Header 3</TH>
                      <TH>Header 4</TH>
                  </TR>
              </THead>
              <TBody>
                  <TR>
                      <TD clickable>Body 0</TD>
                      <TD>Body 1</TD>
                      <TD>Body 2</TD>
                      <TD>Body 3</TD>
                      <TD>Body 4</TD>
                  </TR>
              </TBody>
            </Table>
          </Col>
          <Col xs />
        </Row>
        <ErrorBoundary>this is an error boundary</ErrorBoundary>
        <br />
        <Button onClick={() => { 
          // @ts-ignore
          console.log(sortDirectionDivRef.current.innerText)
          // @ts-ignore
          console.log(currentColumnsDivRef.current.innerText)
        }}>Get Table Info</Button>
        <br/><br/>
        <HeadlessTable 
          columns={tableColumns} 
          data={tableData} 
          rowIdField="rowId"
          defaultSort={{ id: 'firstName', desc: true }}
          onChangeSelected={onChangeSelected}
          onChangeSortOrColumns={onChangeSortOrColumns}
          pageIndexDivRef={pageIndexDivRef}
          sortDirectionDivRef={sortDirectionDivRef}
          currentColumnsDivRef={currentColumnsDivRef}
          minHeight={400}
        />
      </Box>
    </Background>
  </Page></Theme>
}

export default App;
