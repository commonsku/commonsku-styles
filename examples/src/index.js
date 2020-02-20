import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { 
    Avatar, 
    Box, 
    Button, 
    H2, H5, 
    Label, LabeledInput, 
    Page,
    Toggle, ToggleLink, 
    Select, 
    Typography
} from '../../src';
import { LabeledSelect } from '../../src/Select.js';

const App = () => {
    return (
        <Page>
            <Box padded={true} borderless={true}>
                <H2>Example usage of commonsku components</H2>
                <Box borderless={true}>
                    <Label>Toggle Links: </Label>
                    <Toggle>
                        <ToggleLink selected>Active</ToggleLink>
                        <ToggleLink>Inactive</ToggleLink>
                    </Toggle>
                </Box>
                <Box borderless={true}>
                    <Label>Button: </Label>
                    <Button>Button</Button>
                </Box>
                <Box borderless={true}>
                    <Label>Avatar: </Label>
                    <Avatar pic="https://commonsku.com/img/brand/icon.png" />
                </Box>
                <Box borderless={true}>
                    <Label>Select: </Label>
                    <Select name="events" options={[{value: 'skucon', label: 'Skucon'}, {value: 'skucamp', label: 'Skucamp'}, {value: 'others', label: 'Others'}]}/>
                </Box>
                <Box borderless={true}>
                    <Label>Labelled Select: </Label>
                    <LabeledSelect label="Events" name="events" options={[{value: 'skucon', label: 'Skucon'}, {value: 'skucamp', label: 'Skucamp'}, {value: 'others', label: 'Others'}]}/>
                </Box>
            </Box>
        </Page>
    )
}

render(<App />, document.getElementById("root"));
