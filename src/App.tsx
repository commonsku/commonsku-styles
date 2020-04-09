import React, { useState, useReducer } from 'react';

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
    LabeledSelect,
    LabeledProgress,
    PanelContact,
    Product,
    Artwork,
    Row, Col,
    Popup,
    Task,
    FeedPost, Publisher,
    ButtonsGroup, LabeledRadio, LabeledCheckbox,
    Table, TD, TH, TR, THead, TBody,
    DateSingleInput,
    Datepicker,
    DateRangeInput,
} from '@commonsku/styles';

const initialState = {
  date: new Date(),
  startDate: new Date(),
  endDate: null,
  focusedInput: false,
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

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeRadio, setRadio] = useState(1);
  const [mustard, toggleMustard] = useState(false);
  const [ketchup, toggleKetchup] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Page>
    <SidePanel title="Stuff" controls={<Button onClick={() => setShowPanel(false)}>Close Panel</Button>} visible={showPanel}>
      <Tabs padded tabs={[
        { label: "Contacts", content: <div>
                                         <PanelContact key="0" name="Jeff Dienstman" avatar={<Avatar/>} position="Marketing Coordinator" email="jeff@abc.com" phone="843-443-4432" />
                                         <PanelContact key="1" name="Caralyn Smith" avatar={<Avatar pic="https://commonsku.com/img/brand/icon.png"/>} position="Marketing Coordinator" email="caralyn@abc.com" phone="843-443-4432" />
                                         <PanelContact key="2" name="Jenny Smith" avatar={<Avatar/>} position="Intern" email="jenny@abc.com" phone="843-443-4432" />
                                       </div> },
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
      >Hello from Popup</Popup>}
    </div>
      <Box padded borderless controls={<Button secondary>Box Controls</Button>} title="Some Commonsku Components">
        <Row>
          <Col xs>
            <div>
              <Button style={{ marginRight: '1rem', }} onClick={() => setShowPanel(true)}>Show Panel</Button>
              <Button onClick={() => setShowPopup(true)}>Show Popup</Button>
            </div>

            <Row>
              <Col xs={3}>
                <H5>Single Datepicker</H5>
                <DateSingleInput
                  date={state.date}
                  showDatepicker={state.showDatepicker}
                  onDateChange={(data) => dispatch({type: "dateChange", payload: data })}
                  onFocusChange={focusedInput => dispatch({type: "focusChange", payload: {showDatepicker: focusedInput}})}
                  onClose={() => dispatch({type: "focusChange", payload: {showDatepicker: false}})}
                />
              </Col>
            </Row>

            <H5>Radio</H5>
            <ButtonsGroup>
              <LabeledRadio label="Active" checked={activeRadio === 1} onChange={(e: Event) => setRadio(1)} />
              <LabeledRadio label="Inctive" checked={activeRadio === 0} onChange={(e: Event) => setRadio(0)} />
              <LabeledRadio label="All" checked={activeRadio === -1} onChange={(e: Event) => setRadio(-1)} />
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
            <LabeledInput label="Labeled Input" placeholder="Input" />

            <H5>Text Area</H5>
            <LabeledTextarea label="Labeled Textarea" placeholder="Input" />

            <H5>Progress</H5>
            <LabeledProgress max={100} value={150} />

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
            <Toggle stretch>
              <ToggleLink selected stretch>Active</ToggleLink>
              <ToggleLink stretch>Inactive</ToggleLink>
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
      </Box>
    </Background>
  </Page>
}

export default App;
