import React, { useState } from 'react';

import product_pic1 from './products/1.png';
import product_pic2 from './products/2.png';
import product_pic3 from './products/3.png';
import product_pic4 from './products/4.png';
import product_pic5 from './products/5.png';

import { 
    Avatar, 
    Box, 
    Background,
    DropArea,
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
<<<<<<< HEAD
    Product
=======
    Row, Col,
    Popup,
>>>>>>> e956cfe83bbeb82bff86d6ae4c6835f94545f661
} from '@commonsku/styles';

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
            <LabeledProgress max={100} value={65} />

            <H5>Drop Area</H5>
            <DropArea placeholder="Drop Here"></DropArea>

            <H5>Product</H5>
	    <Row>
              <Col xs>
                <Product name="Gratuiously Lengthy But Highly Descriptive Product Name" supplier="Extremely Long And Tedious Supplier Name" sku="#6410" rating={1} price={16.3} currency="USD" picture={product_pic1}/>
              </Col>
              <Col xs>
                <Product name="Sueded Crew" supplier="Next Level Apparel" sku="#6410" rating={5} price={16.3} currency="USD" picture={product_pic2}/>
              </Col>
            </Row>


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
          </Col>
          <Col xs />
        </Row>
      </Box>
    </Background>
  </Page>
}

export default App;
