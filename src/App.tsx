import React, { useState } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { 
    Avatar, 
    Box, 
    Button, 
    H1, H2, H5, 
    Label,
    Page,
    Toggle,
    ToggleLink, 
    LabeledInput,
    Input,
    SidePanel,
    Tabs,
    LabeledSelect,
    LabeledProgress
} from '@commonsku/styles';

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  return <Page>
    <SidePanel visible={showPanel}>
      <H2>Hello World!</H2>
      <Button onClick={() => setShowPanel(false)}>Close Panel</Button>
    </SidePanel>
    <Box padded={true} borderless={true}>
      <Row>
        <Col xs>
          <H1>Some commonsku components</H1>
          <Button onClick={() => setShowPanel(true)}>Button</Button>

          <H5>Avatar</H5>
          <Avatar pic="https://commonsku.com/img/brand/icon.png" />
          <Avatar />

          <H5>Select</H5>
          <LabeledSelect label="Labeled Select" name="events" noMargin options={[{ value: 'skucon', label: 'Skucon' }, { value: 'skucamp', label: 'Skucamp' }, { value: 'others', label: 'Others' }]} />

          <H5>Input</H5>
          <LabeledInput label="Labeled Input" placeholder="Input" />

          <H5>Progress</H5>
          <LabeledProgress max={100} value={65} />

          <H5>Toggle</H5>
          <Toggle>
            <ToggleLink selected>Active</ToggleLink>
            <ToggleLink>Inactive</ToggleLink>
          </Toggle>
          <H5>Tabs</H5>
          <Tabs tabs={[
            { label: "First Tab", content: <div>Hello World! This is the content of the very first tab.</div> },
            { label: "Second Tab", content: <div>This is tab number two</div> },
            { label: "Third Tab", content: <div>This is the last tab</div> },
          ]}
          />
        </Col>
        <Col xs />
      </Row>
    </Box>
  </Page>
}

export default App;
