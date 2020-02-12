import React from 'react';
import { render} from 'react-dom';
import { Component } from '../../src';
import '../../scss/main.scss';

const App = () => {
    return (
        <Component fade={true} margin={2} foo={true}>Hello World!</Component>
    )
}

render(<App />, document.getElementById("root"));