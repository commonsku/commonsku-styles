import React from 'react';
import { render} from 'react-dom';
import { DateInput, TextArea, TextInput, Select } from '../../src';

const App = () => {
    return (
        <div>
            <div>DateInput: <DateInput /></div>
            <div>TextArea: <TextArea /></div>
            <div>TextInput: <TextInput /></div>
            <div>Select: <Select options={[{ key: '', value: '' }]} /></div>
        </div>
    )
}

render(<App />, document.getElementById("root"));