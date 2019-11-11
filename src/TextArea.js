import _ from 'lodash'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import AutosizeTextArea from 'react-autosize-textarea'

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTextareaDOMNode() {
    return this.textarea ? findDOMNode(this.textarea) : null;
  }

  render() {
    const {
      children,
      onChange = _.identity,
      onFieldChange = _.identity,
      ...props
    } = this.props;
    
    return <AutosizeTextArea {...props} 
      ref={(textarea) => {this.textarea = textarea;}}
      onChange={(...args) => {
        onFieldChange(args[0].target.value);
        return onChange(...args);
      }}
    >
      {children}
    </AutosizeTextArea>;
  }
}
