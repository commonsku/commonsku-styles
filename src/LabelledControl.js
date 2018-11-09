import React, { Component } from 'react';

let unique_id = 0;
const ID_PREFIX = 'LabelledControl';

class LabelledControl extends Component {

  constructor(props) {
    super(props);
    this.labelId = `${ID_PREFIX}${++unique_id}`;
  }

  render() {
    const {
      className,
      label,
      children,
      ...props
    } = this.props;

    const childrenWithId = React.Children.map(
      children,
      child => React.cloneElement(child, { id: this.labelId })
    );
    return (
      <div className={className}>
        <label htmlFor={this.labelId}>
          {label}
        </label>
        {childrenWithId}
      </div>
    );
  }
}

export default LabelledControl;
