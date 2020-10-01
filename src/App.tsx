import React, { useState, useReducer, useEffect } from 'react';
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

import { Loading, LockIcon, InfoIcon, CouponIcon } from './@commonsku/styles/icons';

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
} from '@commonsku/styles';

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
  { value: 'ok', content: 'OK', color: "#00D374" },
  { value: 'problem', content: 'Problem', color: "#FF2674" },
  { value: 'followup', content: 'Followup', color: "#FFAE00"},
]

const clickFunc = (item) => {
  console.log(item)
}

const states = [
  { value: 'new', content: 'New', order: 1, onClick: clickFunc },
  { value: 'submitted', content: 'Submitted', order: 2, onClick: clickFunc },
  { value: 'reviewed', content: 'Reviewed', order: 3, onClick: clickFunc },
  { value: 'attempted', content: 'Attempted', order: 4, onClick: clickFunc },
  { value: 'abandoned', content: 'Abandoned', order: 5, onClick: clickFunc },
]

const Styles = styled.div`
  padding: 1rem;
  overflow-x: scroll;

  .react-table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }
    }

    &.react-table-sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }

  .react-table-pagination {
    padding: 0.5rem;
  }
`
const tableData = [
  {"firstName":"profit","lastName":"doctor","age":24,"state":states[2].content,"tableState":states[2],"tableStates":states,"progress":24,"status":<StatusDropdown items={statuses} value={statuses[2]}/>},
  {"firstName":"hall","lastName":"shake","age":3,"state":states[3].content,"tableState":states[3],"tableStates":states,"progress":15,"status":<StatusDropdown items={statuses} value={statuses[2]}/>},
  {"firstName":"flesh","lastName":"bag","age":2,"state":states[1].content,"tableState":states[1],"tableStates":states,"progress":85,"status":<StatusDropdown items={statuses} value={statuses[1]}/>}
] 
const tableColumns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    sticky: 'left'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Visits',
    accessor: 'state',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
  },
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

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if(sidePanelRow) {
      setShowPanel(true)
    }else{
      setShowPanel(false)
    }
  }, [sidePanelRow])

  return <Theme><Page>
    <SidePanel title="Panel Title"
      // fullWidthTitle
      controls={<Button onClick={() => { setShowPanel(false); setSidePanelRow(null) }}>Close Panel</Button>}
      visible={showPanel}
      animationDuration={300}
      from="right"
      height={100}
      backdrop
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
              <Link block mt={20}>Link</Link>
            </div>

            <StatusDropdown items={statuses} value={statuses[0]}/>

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

        <Styles>
          <HeadlessTable columns={tableColumns} data={tableData} setSidePanelRow={setSidePanelRow} />
        </Styles>


      </Box>
    </Background>
  </Page></Theme>
}

export default App;
