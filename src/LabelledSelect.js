import React from 'react'

import Select from './Select'

let unique_id = 0;
const id_prefix = 'LabelledSelect';

export default class LabelledSelect extends React.Component {
  componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  render() {
    const {
      className,
      label,
      ...props
    } = this.props;
    return (
      <div className={className}>
        <label htmlFor={this.state.label_id}>
          {label}
        </label>
        <Select id={this.state.label_id} value={this.props.value} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} options={this.props.options} change={this.props.onChange} disabled={this.props.disabled} gallery={this.props.gallery} />
      </div>
    )
  }
}
