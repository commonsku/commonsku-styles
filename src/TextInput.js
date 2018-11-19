import _ from 'lodash'
import React, { Component } from 'react'

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    _.bindAll(this, ['handleFocus']);
  }

  handleFocus(e) {
    if (this.props.selectOnFocus) {
      e.target.select();
    }
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  render() {
    const {
      selectOnFocus,
      ...props,
    } = this.props;

    return (
      <input {...props} type="text" onFocus={this.handleFocus} />
    );
  }
}

TextInput.defaultProps = {
  selectOnFocus: false,
};
