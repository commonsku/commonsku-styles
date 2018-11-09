import React from 'react'

let unique_id = 0;
const id_prefix = 'LabelledCheckbox';

export default class LabelledCheckbox extends React.Component {
  componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  render() {
    const checked = !!parseInt(this.props.value, 10);
    const onChange = this.props.onChange ? this.props.onChange : f => f;
    return (
      <div className={this.props.className} style={this.props.style}>
        <input id={this.state.label_id} type='checkbox' disabled={this.props.disabled} checked={checked} onChange={(e) => onChange(e.target.checked ? 1 : 0)} />
        <label htmlFor={this.state.label_id}>
          {this.props.label}
        </label>
      </div>
    )
  }
}
