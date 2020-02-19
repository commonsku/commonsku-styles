import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { Button, Toggle, ToggleLink, Select, LabeledInput, Avatar, Typography} from '../../src';
import { LabeledSelect } from '../../src/Select.js';

const App = () => {
    return (
        <Fragment>
	    <Typography/>
            <Button>Test</Button>
            <Toggle>
                <ToggleLink selected>Test</ToggleLink>
                <ToggleLink>Test</ToggleLink>
            </Toggle>
	    <LabeledSelect label="Test" name="abc" />
	    <Avatar/>
        </Fragment>
    )
}

render(<App />, document.getElementById("root"));
