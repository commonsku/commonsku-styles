import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { Button, Toggle, ToggleLink, Select } from '../../src';

const App = () => {
    return (
        <Fragment>
            <Button>Test</Button>
            <Toggle>
                <ToggleLink selected>Test</ToggleLink>
                <ToggleLink>Test</ToggleLink>
            </Toggle>
	    <Select></Select>
        </Fragment>
    )
}

render(<App />, document.getElementById("root"));
