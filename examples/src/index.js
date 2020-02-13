import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { Component } from '../../src';
import StyledComponent from '../../src/StyledComponent';
import '../../scss/main.scss';

const App = () => {
    return (
        <Fragment>
            <StyledComponent />
            <Component fade={true} margin={2} foo={true}>Hello World!</Component>
        </Fragment>
    )
}

render(<App />, document.getElementById("root"));