import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { Component, StyledComponent } from '../../src';
import '../../scss/main.scss';

const App = () => {
    return (
        <Fragment>
            <StyledComponent />
            <Component fade={true} margin={2} foo={true}>Hello World!</Component> {/* foo is not accepted in compoent so nothing happens */}
        </Fragment>
    )
}

render(<App />, document.getElementById("root"));