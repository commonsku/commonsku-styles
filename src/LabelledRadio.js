import React from 'react'

import Select from './Select'

let unique_id = 0;
const id_prefix = 'LabelledRadio';

export default class LabelledRadio extends React.Component {
  UNSAFE_componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor={this.state.label_id}>
          {this.props.label}
        </label>
        {this.props.options.map(o =>
          <label key={o.key} htmlFor={this.state.label_id + o.key} style={{display: this.props.blockStyle ? this.props.blockStyle : 'inline-block', marginRight: '10px', marginBottom: '10px'}}>
            <input id={this.state.label_id + o.key} type="radio" style={{ marginBottom: 0 }} checked={this.props.value === o.key} onClick={e => this.props.onChange(o.key)} onChange={e => {}} disabled={this.props.disabled} />
            {o.value}
          </label>
        )}
      </div>
    )
  }
}
