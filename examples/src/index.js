import React, { Fragment } from 'react';
import { render} from 'react-dom';

import { ClassComponent, StyledComponent } from '../../src';

const App = () => {
    return (
        <Fragment>
            <StyledComponent />
            <ClassComponent fade={true} margin={2} foo={true}>Hello World!</Component> {/* foo is not accepted in compoent so nothing happens */}
        </Fragment>
    )
}

render(<App />, document.getElementById("root"));