import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { Button, Toggle, ToggleLink } from '../../src';

const App = () => {
    return (
        <div>
        <Button>Test</Button>
        <Toggle>
            <ToggleLink selected>Test</ToggleLink>
            <ToggleLink>Test</ToggleLink>
        </Toggle>
        </div>
    )
}

render(<App />, document.getElementById("root"));