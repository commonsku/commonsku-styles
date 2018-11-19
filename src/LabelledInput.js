import _ from 'lodash'
import React from 'react'
//import DateInput from './DateInput'

let unique_id = 0;
const id_prefix = 'LabelledInput';

export default class LabelledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    _.each(['onChange', 'onBlur', 'onFocus'], (method) => {
      this[method] = this[method].bind(this);
    });
  }
  componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  onBlur(e) {
    this.props.onBlur(e.target.value);
  }

  onFocus(e) {
    e.target.select();
  }

  render() {
    const {
      className,
      label,
      type = 'text',
      onChange,
      onBlur,
      labelOrientation = 'top',
      ...props
    } = this.props;

    const {
      label_id,
    } = this.state;

    let input = labelOrientation == 'side' ? 
      <input id={label_id} 
        {...props}
        type={type}
        onChange={this.onChange} 
        onBlur={this.onBlur} 
        onFocus={this.onFocus}
        className="input-group-field custom-input-group-field"
      />
    : 
      <input id={label_id} 
        {...props}
        type={type}
        onChange={this.onChange} 
        onBlur={this.onBlur} 
      />

    /* if (type === 'date') {
      input = <DateInput {...props} onChange={onChange} onBlur={onBlur}/>;
    } */

    const input_group_class = `input-group side-input ${className}`;

    return labelOrientation === 'side' ? (
      <div className={input_group_class}>
        <span className="input-group-label" htmlFor={label_id} style={{padding: '0 0.5rem', minWidth: '40px', 'backgroundColor': '#2d424c', color: '#FFF'}}>{label}</span>
        {input}
      </div>
    ) : (
      <div className={className}>
        <label htmlFor={label_id}>{label}</label>
        {input}
      </div>
    );
  }
}

LabelledInput.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity,
};
