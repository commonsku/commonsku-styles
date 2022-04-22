import React, { useState, useReducer, useEffect, useRef } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import product_pic1 from './products/1.png';
import product_pic2 from './products/2.png';
import product_wide from './products/wide.png';
import product_narrow from './products/narrow.png';

import user_pic1 from './users/1.jpeg';
import user_pic2 from './users/2.jpeg';

import * as icons from './@commonsku/styles/icons';



import { 
    Avatar, 
    Box, 
    Background,
    DropArea, Dropzoned, DropzonedPreviews,
    Button, 
    H5, 
    Page,
    Toggle,
    ToggleLink, 
    LabeledInput,
    LabeledTextarea,
    SidePanel,
    Tabs,
    Select,
    components as selectComponents,
    LabeledSelect,
    LabeledProgress,
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
    Text,
    Collapsible,
    CollapsiblePanel,
    CollapsiblePanels,
    colors,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Calendar,
    DraggableTasksCalendar,
    LabeledMultiProgress,
    IconButton,
    Input,
    LabeledIconInput,
    // SVG,
    Textarea,
    Thermometer,
    THSorted,
} from '@commonsku/styles';
import { uniqueId } from 'lodash';
import { MenuListComponentProps } from 'react-select';
import { neutrals, primary1, teal } from '@commonsku/styles/colors';
import { IconContainer, IconsShowcase } from '@commonsku/styles/IconShowcase';

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

const SelectMenuList = (
  props: MenuListComponentProps<{label: string, value: string}>
) => {
  return (
    <selectComponents.MenuList {...props}>
      {props.children}
      <div
        onClick={() => { console.log('New client') }}
        style={{
          cursor: 'pointer',
          paddingTop: '8px',
          paddingBottom: '8px',
          background: '#E1F7FA',
          color: '#00A0B6',
          bottom: 0,
          position: 'sticky',
          textAlign: 'center',
          marginBottom: 0,
        }}
      >+ New Client</div>
    </selectComponents.MenuList>
  );
};

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

const today = new Date(2022, 3, 17);
const yesterday = new Date(2022, 2, 16);
const tomorrow = new Date(2022, 4, 18);

const calTasks = Object.freeze({
  client: [
    {id: uniqueId('day-101-'+yesterday), date: yesterday, title: 'Megacorm 101', description: 'Reach out to Jake Client 1', colorType: 'light-green', onClickCheckbox: (checked) => { console.log('checked', checked) }},
    {id: uniqueId('day-102-'+yesterday), date: yesterday, title: 'ABS Client 102', description: 'Put together a presentation for this client Client 2', colorType: 'light-red'},
    {id: uniqueId('day-103-'+today), date: today, title: 'ABS Client 103', description: 'Put together a presentation for this client Client 3', colorType: 'light-red'},
    {id: uniqueId('day-104-'+today), date: today, title: 'Vandelay 104', description: 'Reach out to Jake Client 4', colorType: 'light-green', completed: true,},
    {id: uniqueId('day-105-'+tomorrow), date: tomorrow, title: 'Vandelay 105', description: 'Reach out to Jake Client 5', colorType: 'light-green'},
  ],
  project: [
    {id: uniqueId('day-106-'+yesterday), date: yesterday, title: 'ABS Client 106', description: 'Reach out to Jake Project 6', colorType: 'light-green', completed: true,},
    {id: uniqueId('day-107-'+yesterday), date: yesterday, title: 'Megacorm 107', description: 'Put together a presentation for this client Project 7', colorType: 'light-red'},
    {id: uniqueId('day-108-'+today), date: today, title: 'Vandelay 108', description: 'Put together a presentation for this client Project 8', colorType: 'light-red'},
    {id: uniqueId('day-109-'+today), date: today, title: 'Vandelay 109', description: 'Reach out to Jake Project 9', colorType: 'light-green'},
    {id: uniqueId('day-110-'+tomorrow), date: tomorrow, title: 'Megacorm 110', description: 'Reach out to Jake Project 10', colorType: 'light-green'},
  ],
  other: [
    {id: uniqueId('day-111-'+yesterday), date: yesterday, title: 'ABS Client Other 111', description: 'Reach out to Jake Other 11', colorType: 'light-green'},
    {id: uniqueId('day-112-'+yesterday), date: yesterday, title: 'Megacorm Other 112', description: 'Put together a presentation for this client Other 12', colorType: 'light-red', completed: true,},
    {id: uniqueId('day-113-'+today), date: today, title: 'Vandelay Other 113', description: 'Put together a presentation for this client Other 13', colorType: 'light-red'},
    {id: uniqueId('day-114-'+today), date: today, title: 'Vandelay Other 114', description: 'Reach out to Jake Other 14', colorType: 'light-green'},
    {id: uniqueId('day-115-'+tomorrow), date: tomorrow, title: 'Megacorm Other 115', description: 'Reach out to Jake Other 15', colorType: 'light-green'},
  ],
});

const allCalTasks = Object.values(calTasks).reduce((acc, v) => ([ ...acc, ...v ]), []);

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showNewProjectPopup, setShowNewProjectPopup] = useState(false);
  const [activeRadio, setRadio] = useState(1);
  const [mustard, toggleMustard] = useState(false);
  const [ketchup, toggleKetchup] = useState(false);
  const [lock, setLock] = useState(false);
  const [colorfulBars, setColorfulBars] = useState(false);
  const [sidePanelRow, setSidePanelRow] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [defaultScrollOffset, setDefaultScrollOffset] = useState(0);
  const [calendarTab, setCalendarTab] = useState('all');
  const [tasks, setTasks] = useState({
    all: allCalTasks,
    ...calTasks,
  });
  const [footerTasks, setFooterTasks] = useState([
    {id: uniqueId('footer-day-'), completed: false, date: yesterday, title: 'ABS Client Other', description: 'Reach out to Jake Other', colorType: 'light-green'},
    {id: uniqueId('footer-day-'), completed: false, date: yesterday, title: 'Megacorm Other', description: 'Put together a presentation for this client Other', colorType: 'light-red'},
    {id: uniqueId('footer-day-'), completed: false, date: today, title: 'Vandelay Other 1', description: 'Put together a presentation for this client Other', colorType: 'light-red'},
    {id: uniqueId('footer-day-'), completed: false, date: today, title: 'Vandelay Other 2', description: 'Reach out to Jake Other', colorType: 'light-green'},
    {id: uniqueId('footer-day-'), completed: false, date: tomorrow, title: 'Megacorm Other', description: 'Reach out to Jake Other', colorType: 'light-green'},
  ]);

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
          if(menuIsOpen) {
            // @ts-ignore
            wrapper.current.parentNode.style.zIndex = 4
          }else{
            // @ts-ignore
            wrapper.current.parentNode.style.zIndex = 3
          }
        }, [menuIsOpen])

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
            scrollContentHeight="200px"
          />
        )
      }
    },
    {
      Header: 'Profile Progress',
      accessor: 'progress',
    },
  ]

  const scrollOffsetDivRef = useRef(null)
  const pageIndexDivRef = useRef(null)
  const sortDirectionDivRef = useRef(null)
  const currentColumnsDivRef = useRef(null)
  const horizontalOffsetDivRef = useRef(null)

  function onChangeSelected(id) {
    //@ts-ignore
    setDefaultScrollOffset(parseInt(scrollOffsetDivRef.current.innerText) || 0)
    if(id) {
      setShowPanel(true)
    }else{
      setShowPanel(false)
    }
  }

  function onChangeSortOrColumns(e) {
    console.log(e)
  }

  return <Theme globalStyles><Page>
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
                                         <PanelTileContact key="0" name="Jeff Dienstman" avatar={<Avatar/>} position="Marketing Coordinator" email="jeffdfsdfsdfsdfs.dfsdfsdfs@sdfsdfsdabc.com" phones={[{phone_number: "843-443-4432"}]} />
                                         <PanelTileContact key="1" name="Caralyn Smith" avatar={<Avatar pic="https://commonsku.com/img/brand/icon.png"/>} position="Marketing Coordinator" email="caralyn@abc.com" phones={[{phone_number: "843-443-4432"}]} />
                                         <PanelTileContact key="2" name="Jenny Smith" avatar={<Avatar/>} position="Intern" email="jenny@abc.com" phones={[{phone_number: "843-443-4432"}]} />
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

      {showNewProjectPopup && <Popup
        title={'New Project'}
        onClose={() => {
            setShowNewProjectPopup(false);
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
              <Button variant="primary" mr={10} cta onClick={() => setShowNewProjectPopup(true)}>Show New Project Popup</Button>
              <Dropdown text="Drop Down" items={
                [
                  {onClick: () => null, content: 'New Contact'},
                  {onClick: () => null, content: 'New Address'},
                ]
               }/>
              <Dropdown text="Dropdown Panel" icon={<icons.NoteIcon size="huge"/>}>
                <Row>
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={() => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={() => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={() => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={() => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={() => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={() => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={() => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={() => toggleKetchup(!ketchup)} />
                  <LabeledCheckbox label="Mustard" checked={mustard} onChange={() => toggleMustard(!mustard)} />
                  <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={() => toggleKetchup(!ketchup)} />
                </Row>
              </Dropdown>
              <Link block mt={20}>Link</Link>
            </div>

            <H5>Button Variants</H5>
            
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <ButtonsGroup mb={30}>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"top"} mr={10} mt={10} variant="primary" size="huge">Primary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="primary" size="large">Primary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="primary" size="medium">Primary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="primary" size="small">Primary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="primary" size="tiny">Primary</IconButton>
                <IconButton Icon={icons.ArrowIcon} mr={10} mt={10} variant="primary" size="tiny"></IconButton>
              </ButtonsGroup>
              <ButtonsGroup mb={30}>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="secondary" size="huge">Secondary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="secondary" size="large">Secondary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="secondary" size="medium">Secondary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="secondary" size="small">Secondary</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="secondary" size="tiny">Secondary</IconButton>
                <IconButton Icon={icons.ArrowIcon} mr={10} mt={10} variant="secondary" size="tiny"></IconButton>
              </ButtonsGroup>
              <ButtonsGroup mb={30}>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="cta" size="huge">CTA</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="cta" size="large">CTA</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="cta" size="medium">CTA</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="cta" size="small">CTA</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="cta" size="tiny">CTA</IconButton>
                <IconButton Icon={icons.ArrowIcon} mr={10} mt={10} variant="cta" size="tiny"></IconButton>
              </ButtonsGroup>
              <ButtonsGroup mb={30}>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="error" size="huge">Error</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="error" size="large">Error</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="error" size="medium">Error</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="error" size="small">Error</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="error" size="tiny">Error</IconButton>
                <IconButton Icon={icons.ArrowIcon} mr={10} mt={10} variant="error" size="tiny"></IconButton>
              </ButtonsGroup>
              <ButtonsGroup mb={30}>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="disabled" size="huge">Disabled</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="disabled" size="large">Disabled</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="disabled" size="medium">Disabled</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="disabled" size="small">Disabled</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="disabled" size="tiny">Disabled</IconButton>
                <IconButton Icon={icons.ArrowIcon} mr={10} mt={10} variant="disabled" size="tiny"></IconButton>
              </ButtonsGroup>
              <ButtonsGroup mb={30}>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="text" size="huge">Borderless</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="text" size="large">Borderless</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="text" size="medium">Borderless</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="text" size="small">Borderless</IconButton>
                <IconButton Icon={icons.ArrowIcon} iconPosition={"right"} mr={10} mt={10} variant="text" size="tiny">Borderless</IconButton>
                <IconButton Icon={icons.ArrowIcon} mr={10} mt={10} variant="text" size="tiny"></IconButton>
              </ButtonsGroup>
            </div>

            <H5>Input Fields</H5>
            <Input name="basic-input" style={{ width: 200 }} placeholder="enter something" />
            <Input name="basic-input" value="input value" style={{ marginLeft: 10, width: 200 }} placeholder="enter something" />
            <Input error name="basic-input" style={{ marginLeft: 10, width: 200 }} placeholder="enter something" />
            <Input error name="basic-input" value="error value" style={{ marginLeft: 10, width: 200 }} placeholder="enter something" />
            <Input disabled name="basic-input" style={{ marginLeft: 10, width: 200 }} placeholder="enter something" />
            <Input disabled name="basic-input" value="disabled value" style={{ marginLeft: 10, width: 200 }} placeholder="enter something" />

            <br />
            <LabeledInput labelOnTop label='Labeled input' name="basic-input" value="input value" style={{ width: 200 }} placeholder="enter something" />
            <LabeledInput labelOnTop disabled label='Labeled disabled' name="disabled-input" value="disabled value" style={{ width: 200 }} placeholder="enter something" />
            <LabeledInput labelOnTop error label='Labeled error' name="error-input" value="error value" style={{ width: 200 }} placeholder="enter something" />

            <br />
            <LabeledIconInput
              labelOnTop
              label='Labeled input'
              name="basic-input"
              value="input value"
              placeholder="enter something"
              Icon={<icons.DollarIcon style={{ paddingLeft: 10, paddingRight: 0, }} />}
              style={{ width: 200 }}
            />

            <LabeledIconInput
              labelOnTop
              disabled
              label='Labeled disabled'
              name="basic-disabled"
              value="disabled value"
              placeholder="enter something"
              Icon={<icons.TrashIcon color={"#fff"} width={"1.5rem"} />}
              style={{ width: 200 }}
            />

            <LabeledIconInput
              labelOnTop
              error
              label='Labeled error'
              name="basic-error"
              value="error value"
              placeholder="enter something"
              Icon={<icons.UserIcon fill={"#fff"} width={"1.5rem"} />}
              style={{ width: 200 }}
            />
            <br />

            <br />
            <LabeledIconInput
              labelOnTop
              iconPosition='right'
              label='Labeled input'
              name="basic-input"
              defaultValue="input value"
              placeholder="enter something"
              Icon={<icons.TrashIcon color={"#fff"} width={"1.5rem"} />}
              style={{ width: 200 }}
            />

            <LabeledIconInput
              labelOnTop
              iconPosition='right'
              disabled
              label='Labeled disabled'
              name="basic-disabled"
              defaultValue="disabled value"
              placeholder="enter something"
              Icon={<icons.TrashIcon color={"#fff"} width={"1.5rem"} />}
              style={{ width: 200 }}
            />

            <LabeledIconInput
              labelOnTop
              iconPosition='right'
              error
              label='Labeled error'
              name="basic-error"
              defaultValue="error value"
              placeholder="enter something"
              Icon={<icons.UserIcon fill={"#fff"} width={"1.5rem"} />}
              style={{ width: 200 }}
            />
            <br />

            <H5>Textarea</H5>
            <Textarea placeholder="Textarea" defaultValue="basic textarea" />
            <Textarea disabled defaultValue="diabled textarea" />
            <Textarea error placeholder="Textarea" defaultValue="error textarea" />

            <br />

            <H5>Select</H5>
            <Select
              value={{ value: 'value1', label: 'value1', }}
              options={[
                ...(Array(100).fill(1).map((v, i) => (
                  {value: 'value'+i, label: 'value'+i}
                ))),
              ]}
              components={{ MenuList: SelectMenuList }}
              isClearable
              inPopup
            />

            <Select
              value={{ value: 'value2', label: 'value2', }}
              options={[
                ...(Array(100).fill(1).map((v, i) => (
                  {value: 'value'+i, label: 'value'+i}
                ))),
              ]}
              components={{ MenuList: SelectMenuList }}
              isClearable
            />

            <Select
              value={{ value: 'value3', label: 'value3', }}
              options={[
                ...(Array(100).fill(1).map((v, i) => (
                  {value: 'value'+i, label: 'value'+i}
                ))),
              ]}
              components={{ MenuList: SelectMenuList }}
              error
              isClearable
            />

            <Select
              value={{ value: 'value4', label: 'value4', }}
              options={[
                ...(Array(100).fill(1).map((v, i) => (
                  {value: 'value'+i, label: 'value'+i}
                ))),
              ]}
              components={{ MenuList: SelectMenuList }}
              isDisabled
            />

            <br />

            <H5>Calendar Tasks</H5>
            <DraggableTasksCalendar
              tasks={tasks[calendarTab]}
              onClickTask={(task) => {
                setShowPanel(!showPanel);
                console.log('clicked', task);
              }}
              onUpdateTask={(task, { oldTask, action, sourceType }) => {
                if (action === 'TOGGLE_CHECKBOX') {
                  const foundFooterIdx = footerTasks.findIndex(v => v.date === oldTask.date && v.title === oldTask.title && oldTask.id === v.id);
                  if (foundFooterIdx === -1) { return; }
                  setFooterTasks(s => ([
                    ...s.slice(0, foundFooterIdx),
                    ...s.slice(foundFooterIdx+1),
                  ]));
                  return;
                }
                if (action === 'DROP' && sourceType === 'FOOTER') {
                  const foundFooterIdx = footerTasks.findIndex(v => v.date === oldTask.date && v.title === oldTask.title && oldTask.id === v.id);
                  if (foundFooterIdx === -1) { return; }
                  setFooterTasks(s => ([
                    ...s.slice(0, foundFooterIdx),
                    ...s.slice(foundFooterIdx+1),
                  ]));
                }

                const foundIdx = tasks[calendarTab].findIndex(v => v.date === oldTask.date && v.title === oldTask.title && oldTask.id === v.id);
                if (foundIdx === -1) {
                  setTasks(s => ({...s, [calendarTab]: [ ...s[calendarTab],  task, ], }));
                  return;
                }

                setTasks(s => ({
                  ...s,
                    [calendarTab]: [
                      ...s[calendarTab].slice(0, foundIdx),
                      task,
                      ...s[calendarTab].slice(foundIdx+1),
                    ],
                  }
                ));
              }}
              footerTasks={footerTasks.filter(v => !v.completed)}
              headerTabs={[
                {content: '', label: 'All Tasks',
                  onClick: () => { setCalendarTab('all'); console.log('all tasks'); }
                },
                {content: '', label: 'Client Tasks',
                  onClick: () => { setCalendarTab('client'); console.log('client tasks'); }
                },
                {content: '', label: 'Project Tasks',
                  onClick: () => { setCalendarTab('project'); console.log('project tasks'); }
                },
                {content: '', label: 'Other Tasks',
                  onClick: () => { setCalendarTab('other'); console.log('other tasks'); }
                },
              ]}
              views={[
                { type: 'TASK', title: 'Tasks', selected: true, Icon: icons.UsersIcon },
                { type: 'PROJECT', title: 'Projects', selected: false },
                { type: 'PO', title: 'Pos', selected: false },
              ]}
              onClickView={() => {}}
            />

            <H5>Bars Loading</H5>
            <div style={{maxWidth: 150}}>
              <Toggle stretch mb={10} onClick={() => setColorfulBars(!colorfulBars)}>
                <ToggleLink selected={!colorfulBars} stretch pr pl>Regular</ToggleLink>
                <ToggleLink selected={colorfulBars} stretch>Colorful</ToggleLink>
              </Toggle>
            </div>
            <div style={{maxWidth: 90}}>
              <icons.Loading mb={10} colorful={colorfulBars} />
            </div>

            <icons.ProofingCompleteIcon width={"1.5rem"}/>
            <icons.ClientApprovedIcon width={"1.5rem"}/>
            <icons.ColumnSelectIcon width={"1.5rem"}/>
            <icons.AwaitingProofIcon width={"1.5rem"}/>
            <icons.ProofReceivedIcon width={"1.5rem"}/>
            <icons.PendingApprovalIcon width={"1.5rem"}/>
            <icons.ChangeRequestedIcon width={"1.5rem"}/>
            <icons.TaskIcon color={"black"} width={"1.5rem"}/>
            <icons.NoteIcon color={"black"} width={"1.5rem"}/>
            <icons.ChatIcon color={"#00d374"} width={"1.5rem"} notifs={15}/>
            <icons.PinIcon color={"#00d374"} width={"1.5rem"} pinned/>
            <icons.TrashIcon color={"#00d374"} width={"1.5rem"} pinned/>
            <Link><icons.CouponIcon color={"red"} width={"1.5rem"} mr={5}/>Link</Link>
            <icons.InfoIcon ml={5}/> 
            <Link onClick={() => setLock(!lock)}>
              <icons.LockIcon color={"#00d374"} ml={10} width={".9rem"} locked={lock}/>
            </Link>
            <icons.GearIcon color={"#00d374"} width={"1.5rem"}/>

            <br/>
            <h2>Nav Icons</h2>
            <icons.NavConnectIcon color={"#00d374"} width={"3rem"}/>
            <icons.NavSalesIcon color={"#00d374"} width={"3rem"}/>
            <icons.NavProdIcon color={"#00d374"} width={"3rem"}/>
            <icons.NavFinanceIcon color={"#00d374"} width={"3rem"}/>
            <icons.NavManagementIcon color={"#00d374"} width={"3rem"}/>
            <icons.NavResourcesIcon color={"#00d374"} width={"3rem"}/>

            <br/>
            <h2>Order Stage Icons</h2>
            <Row>
              <Col xs sm={4} md={2} lg={1}>
                <icons.OpportunityCircleIcon variant='primary' />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.PresentationCircleIcon variant='primary' />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.EstimateCircleIcon variant='cta' />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.SalesOrderCircleIcon variant='cta' />
              </Col>
            </Row>
            <h2>Selected Order Stage Icons</h2>
            <Row>
              <Col xs sm={4} md={2} lg={1}>
                <icons.OpportunityCircleIcon variant='cta' selected />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.PresentationCircleIcon variant='cta' selected />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.EstimateCircleIcon variant='primary' selected />
                <icons.EstimateCircleIcon variant='cta' />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.EstimateCircleIcon variant='primary' selected />
              </Col>
              <Col xs sm={4} md={2} lg={1}>
                <icons.SalesOrderCircleIcon variant='primary' selected />
              </Col>
            </Row>


            <H5>Number formatting</H5>
            <Number commas decimalPoints={4} num={334353434.44334}/>
            <br/>
            <Number commas decimalPoints={0} num={334353434.44334}/>
            <br/>
            <Number commas num={334353434.44334}/>

            <Row>
              <Col xs={3} padded>
                <H5>Datepicker</H5>
                <Datepicker
                  value={state.date}
                  onChange={(date: any) => dispatch({type: "dateChange", payload: {date} })}
                />
              </Col>
              <Col xs={3} padded>
                <H5>Datepicker disabled</H5>
                <Datepicker
                  value={state.date}
                  onChange={(date: any) => dispatch({type: "dateChange", payload: {date} })}
                  disabled
                />
              </Col>
            </Row>

            <Row pt={20}>
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
              <LabeledCheckbox label="Mustard" checked={mustard} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleMustard(!mustard); }} />
              <LabeledCheckbox label="Ketchup" checked={ketchup} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleKetchup(!ketchup); }} />
            </ButtonsGroup>

            <H5>Avatar</H5>
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', marginRight: '30px'}}>
                <Avatar shape="circle" size="tiny" color="navy" mr={10} mb={10}>MS</Avatar>
                <Avatar shape="circle" size="small" color="teal" initials="MG" mr={10} mb={10}/>
                <Avatar shape="circle" size="medium" color="yellow" initials="IY" mr={10} mb={10}/>
                <Avatar shape="circle" size="large" color="green" initials="MA" mr={10} mb={10}/>
                <Avatar shape="circle" size="huge" color="pink" mr={10} mb={10}>CG</Avatar>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px'}}>
                <Avatar shape="square" size="tiny" color="navy" mr={10} mb={10}>MS</ Avatar>
                <Avatar shape="square" size="small" color="teal" initials="MG" mr={10} mb={10}/>
                <Avatar shape="square" size="medium" color="yellow" initials="IY" mr={10} mb={10}/>
                <Avatar shape="square" size="large" color="green" initials="MA" mr={10} mb={10}/>
                <Avatar shape="square" size="huge" color="pink" mr={10} mb={10}>CG</Avatar>
              </div>
            </div>

            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', marginRight: '30px'}}>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="circle" size="tiny" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="circle" size="small" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="circle" size="medium" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="circle" size="large" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="circle" size="huge" mr={10} mb={10}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="square" size="tiny" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="square" size="small" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="square" size="medium" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="square" size="large" mr={10} mb={10}/>
                <Avatar pic="https://commonsku.com/img/brand/avatar-teal.png" shape="square" size="huge" mr={10} mb={10}/>
              </div>
            </div>
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', marginRight: '30px'}}>
                <Avatar icon shape="circle" size="tiny" mr={10} mb={10}></Avatar>
                <Avatar icon shape="circle" size="small" mr={10} mb={10}></Avatar>
                <Avatar icon shape="circle" size="medium" mr={10} mb={10}></Avatar>
                <Avatar icon shape="circle" size="large" mr={10} mb={10}></Avatar>
                <Avatar icon shape="circle" size="huge" mr={10} mb={10}></Avatar>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px'}}>
                <Avatar icon shape="square" size="tiny" mr={10} mb={10}></Avatar>
                <Avatar icon shape="square" size="small" mr={10} mb={10}></Avatar>
                <Avatar icon shape="square" size="medium" mr={10} mb={10}></Avatar>
                <Avatar icon shape="square" size="large" mr={10} mb={10}></Avatar>
                <Avatar icon shape="square" size="huge" mr={10} mb={10}></Avatar>
              </div>
            </div>

            <H5>Select</H5>
            <LabeledSelect label="Labeled Select" name="events" noMargin options={[{ value: 'skucon', label: 'Skucon' }, { value: 'skucamp', label: 'Skucamp' }, { value: 'others', label: 'Others' }]} />

            <H5>Input</H5>
            <LabeledInput label="Labeled Input" placeholder="Input" />

            <H5>Text Area</H5>
            <LabeledTextarea label="Labeled Textarea" placeholder="Input" />

            <H5>Progress</H5>
            <LabeledProgress max={4389.99} value={8434.44}/>

            <H5>Multi Progress</H5>
            <LabeledMultiProgress title="Invoices this month" values={[
              {value: 94.44, text: v => 'Projection: $' + v},
              // {value: 2.44, text: v => '$' + v},
            ]} max={100} />

            <H5>Thermometer</H5>
            <Thermometer
              title='Invoices this month'
              target={10}
              value1={10}
              value1Label={v => `$ ${v}`}
            />

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
                <Artwork noTruncate date="Jan 3 2020" name="long name very long name really e very long name really e such a very very long namelong name such a very very long name squirrel.png" picture={product_narrow} onEdit={() => alert("hi")} onDelete={() => alert("deleting")}/>
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
            <FeedPost key="FeedPost1" author={{name:"Samantha Kates", avatar: user_pic2}}
                      subject="SO#1233"
                      date="Feb 20"
                      body={<div>Samantha Kates added a note to <a href=".">John Doe's</a><br/>PO#15310 flagged as Confirmed. </div>}
                      comments={[ <FeedPost key="FeedPost1.1" author={{name:"Bob Peterson", avatar: user_pic1}} date="Feb 20" body={<div>Finally!</div>}/>]} />
            <FeedPost key="FeedPost2" author={{name:"Samantha Kates", avatar: user_pic2}}
                      subject="SO#1233"
                      date="Feb 20"
                      body={<div>Joe Jemple added a note to <a href=".">John Doe's</a><br/>PO#15310 flagged as Shipped. </div>}
                      comments={[]} />
            <FeedPost key="FeedPost3" author={{name:"Samantha Kates", avatar: user_pic2}}
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
          defaultScrollOffset={defaultScrollOffset}
          defaultHorizontalOffset={0}
          onChangeSelected={onChangeSelected}
          onChangeSortOrColumns={onChangeSortOrColumns}
          pageIndexDivRef={pageIndexDivRef}
          sortDirectionDivRef={sortDirectionDivRef}
          currentColumnsDivRef={currentColumnsDivRef}
          minHeight={400}
          pagination={false}
          scrollOffsetDivRef={scrollOffsetDivRef}
          horizontalOffsetDivRef={horizontalOffsetDivRef}
        />

        <H5>All Icons</H5>

        <IconContainer>
          
          {/* <IconShowcase Icons={[<icons.UserIcon size="medium" fill={primary1.main}/>]} name="UserIcon" /> */}
          
          <IconsShowcase Icons={[
            <icons.ArrowIcon direction="right" />, 
            <icons.ArrowIcon direction="down" />, 
            <icons.ArrowIcon direction="left" />, 
            <icons.ArrowIcon direction="up" />
          ]} name="ArrowIcon" />

          <IconsShowcase Icons={[
            <icons.ChevronIcon direction="right" />, 
            <icons.ChevronIcon direction="down" />, 
            <icons.ChevronIcon direction="left" />, 
            <icons.ChevronIcon direction="up" />,
            <icons.ChevronIcon direction="updown" />,
            <icons.ChevronIcon direction="leftright" />
          ]} name="ChevronIcon" />

          <IconsShowcase Icons={[
            <icons.FilledChevronIcon direction="right" />, 
            <icons.FilledChevronIcon direction="down" />, 
            <icons.FilledChevronIcon direction="left" />, 
            <icons.FilledChevronIcon direction="up" />,
            <icons.FilledChevronIcon direction="updown" />,
            <icons.FilledChevronIcon direction="leftright" />
          ]} name="FilledChevronIcon" />

          <IconsShowcase Icons={[<icons.CheckmarkIcon />]} name="CheckmarkIcon" />
          <IconsShowcase Icons={[<icons.AddIcon />]} name="AddIcon" />
          <IconsShowcase Icons={[<icons.SubtractIcon />]} name="SubtractIcon" />
          <IconsShowcase Icons={[<icons.SearchIcon />]} name="SearchIcon" />
          <IconsShowcase Icons={[<icons.ClockIcon />]} name="ClockIcon" />
          <IconsShowcase Icons={[<icons.ClipboardIcon />]} name="ClipboardIcon" />
          <IconsShowcase Icons={[
          <icons.RadioIcon />,
          <icons.RadioIcon selected />
          ]} name="RadioIcon" />

          <IconsShowcase Icons={[<icons.AwaitingProofIcon width="24"/>]} name="AwaitingProofIcon"/>
          <IconsShowcase Icons={[<icons.BotIcon />]} name="BotIcon"/>
          <IconsShowcase Icons={[<icons.BulletIcon />]} name="BulletIcon"/>
          <IconsShowcase Icons={[<icons.Calendar2Icon />]} name="Calendar2Icon"/>
          <IconsShowcase Icons={[<icons.ChangeRequestedIcon width="24"/>]} name="ChangeRequestedIcon"/>
          <IconsShowcase Icons={[<icons.ChatIcon width="24" />]} name="ChatIcon"/>
          <IconsShowcase Icons={[<icons.CheckboxIcon />]} name="CheckboxIcon"/>
          <IconsShowcase Icons={[<icons.CompletedCheckmarkIcon />]} name="CompletedCheckmarkIcon"/>
          <IconsShowcase Icons={[<icons.CircleProgressIcon />]} name="CircleProgressIcon"/>
          <IconsShowcase Icons={[<icons.ClientApprovedIcon width="24" />]} name="ClientApprovedIcon"/>
          <IconsShowcase Icons={[<icons.ColumnSelectIcon width="24" />]} name="ColumnSelectIcon"/>
          <IconsShowcase Icons={[<icons.CouponIcon width="24"/>]} name="CouponIcon"/>
          <IconsShowcase Icons={[<icons.XIcon />]} name="XIcon"/>
          <IconsShowcase Icons={[<icons.DollarIcon fill={primary1.main}/>]} name="DollarIcon"/>
          <IconsShowcase Icons={[<icons.DownloadIcon  width="24" fill={neutrals.darkest}/>]} name="DownloadIcon" />
          <IconsShowcase Icons={[
            <icons.AlertIcon />,
            <icons.AlertIcon filled/>
          ]} name="AlertIcon" />
          <IconsShowcase Icons={[<icons.IconDoc width="24" />]} name="IconDoc" /> {/* FileIcon.tsx */}
          <IconsShowcase Icons={[<icons.FolderIcon />]} name="FolderIcon" />
          <IconsShowcase Icons={[<icons.GalleryIcon />]} name="GalleryIcon" />
          <IconsShowcase Icons={[<icons.GearIcon width="24"/>]} name="GearIcon" />
          <IconsShowcase Icons={[
            <icons.InfoIcon />,
            <icons.InfoIcon filled />
          ]} name="InfoIcon" />
          <IconsShowcase Icons={[<icons.ListIcon />]} name="ListIcon" />
          <IconsShowcase Icons={[<icons.Loading width={24}/>]} name="Loading" />
          <IconsShowcase Icons={[
            <icons.LockIcon />,
            <icons.LockIcon locked />,
          ]} name="LockIcon" />

          <IconsShowcase Icons={[
            <icons.NavConnectIcon color={teal.main}/>,
            <icons.NavConnectIcon color={teal.main} filled />
          ]} name="NavConnectIcon" />

          <IconsShowcase Icons={[
            <icons.NavFinanceIcon color={teal.main}/>,
            <icons.NavFinanceIcon color={teal.main} filled/>
          ]} name="NavFinanceIcon" />

          <IconsShowcase Icons={[
            <icons.NavManagementIcon color={teal.main}/>,
            <icons.NavManagementIcon color={teal.main} filled/>
          ]}  name="NavManagementIcon" />

          <IconsShowcase Icons={[
            <icons.NavProdIcon color={teal.main}/>,
            <icons.NavProdIcon color={teal.main} filled/>
          ]} name="NavProdIcon" />

          <IconsShowcase Icons={[
            <icons.NavResourcesIcon color={teal.main} />,
            <icons.NavResourcesIcon color={teal.main} filled />
          ]} name="NavResourcesIcon" />
          
          <IconsShowcase Icons={[
            <icons.NavSalesIcon color={teal.main} />,
            <icons.NavSalesIcon color={teal.main} filled />
          ]} name="NavSalesIcon"/>

          <IconsShowcase Icons={[<icons.NoMarketingIcon color={primary1.main} width="24"/>]} name="NoMarketingIcon" />
          <IconsShowcase Icons={[<icons.PendingApprovalIcon width="24"/>]} name="PendingApprovalIcon" />

          <IconsShowcase Icons={[
            <icons.PinIcon />, 
            <icons.PinIcon filled/>,
            <icons.PinIcon unpin />, 
            <icons.PinIcon unpin filled/>
          ]} name="PinIcon" />

          <IconsShowcase Icons={[<icons.PromostandardsIcon />]} name="PromostandardsIcon" />
          <IconsShowcase Icons={[<icons.ProofingCompleteIcon width="24"/>]} name="ProofingCompleteIcon" />
          <IconsShowcase Icons={[<icons.ProofReceivedIcon width="24"/>]} name="ProofReceivedIcon" />
          <IconsShowcase Icons={[<icons.ReceiptLongIcon />]} name="ReceiptLongIcon" />
          <IconsShowcase Icons={[
            <icons.SalesArrowIcon />,
            <icons.SalesArrowIcon direction="down" />,
          ]} name="SalesArrowIcon" />
          <IconsShowcase Icons={[<icons.SvgIcon />]} name="SvgIcon" />
          <IconsShowcase Icons={[<icons.TableIcon width="24"/>]} name="TableIcon" />
          <IconsShowcase Icons={[<icons.TaskIcon />]} name="TaskIcon" />
          <IconsShowcase Icons={[<icons.AddTaskIcon />]} name="AddTaskIcon" />
          <IconsShowcase Icons={[<icons.NoteIcon />]} name="NoteIcon" />
          <IconsShowcase Icons={[<icons.AddNoteIcon />]} name="AddNoteIcon" />
          <IconsShowcase Icons={[<icons.TilesIcon />]} name="TilesIcon" />
          <IconsShowcase Icons={[
            <icons.TrashIcon />,
            <icons.TrashIcon filled />,
          ]} name="TrashIcon" />
          <IconsShowcase Icons={[<icons.UserIcon fill={primary1.main} width="24"/>]} name="UserIcon" />
          <IconsShowcase Icons={[<icons.UsersIcon fill={primary1.main} width="24"/>]} name="UsersIcon" />
          <IconsShowcase Icons={[
            <icons.MarketingStatusIcon />, 
            <icons.MarketingStatusIcon approved/>, 
          ]} name="MarketingStatusIcon" />
          <IconsShowcase Icons={[
            <icons.OpportunityCircleIcon variant="primary" pointer/>,
            <icons.OpportunityCircleIcon variant="primary" selected pointer/>,
            <icons.OpportunityCircleIcon variant="cta" pointer/>,
            <icons.OpportunityCircleIcon variant="cta" selected pointer/>
          ]} name="OpportunityCircleIcon" />
          <IconsShowcase Icons={[
            <icons.PresentationCircleIcon variant="primary" pointer/>,
            <icons.PresentationCircleIcon variant="primary" selected />,
            <icons.PresentationCircleIcon variant="cta" style={{cursor: 'zoom-in'}}/>,
            <icons.PresentationCircleIcon variant="cta" selected pointer/>, 
            ]} name="PresentationCircleIcon" />
          <IconsShowcase Icons={[
            <icons.EstimateCircleIcon variant="primary" pointer/>,
            <icons.EstimateCircleIcon variant="primary" selected pointer/>,
            <icons.EstimateCircleIcon variant="cta" pointer/>,
            <icons.EstimateCircleIcon variant="cta" selected pointer/>
            ]} name="EstimateCircleIcon" />
          <IconsShowcase Icons={[
            <icons.SalesOrderCircleIcon variant="primary" pointer/>,
            <icons.SalesOrderCircleIcon variant="primary" selected pointer/>,
            <icons.SalesOrderCircleIcon variant="cta" pointer/>,
            <icons.SalesOrderCircleIcon variant="cta" selected pointer/>
          ]} name="SalesOrderCircleIcon" />          


        </IconContainer>
        

      </Box>
    </Background>
  </Page></Theme>
}

export default App;
