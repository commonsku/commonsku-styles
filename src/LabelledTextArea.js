import _ from 'lodash'
import React from 'react'
import TextArea from 'react-autosize-textarea'

let unique_id = 0;
const id_prefix = 'LabelledTextArea';

export default class LabelledTextArea extends React.Component {
  UNSAFE_componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  render() {
    const {
      onChange = _.identity,
      onBlur = _.identity,
      value,
      ...props
    } = this.props;

    return (
      <div className={this.props.className}>
        <label htmlFor={this.state.label_id}>
          {this.props.label}
        </label>
        <TextArea id={this.state.label_id} 
          {...props}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)} 
          onBlur={(e) => onBlur(e.target.value)}></TextArea>
      </div>
    )
  }
}
