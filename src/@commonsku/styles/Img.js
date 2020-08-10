import React, { Component } from 'react';
const LOADING_IMG_SRC = '/images/gears.gif';
const NOT_FOUND_IMG_SRC = '/images/404.png';
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_ATTEMPT_INTERVAL = 10000;
class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src,
      attempts: 0
    };
    this.onError = this.onError.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        src: nextProps.src,
        attempts: 0
      });
    }
  }
  componentWillUnmount() {
    if (this.retryId) {
      clearTimeout(this.retryId);
    }
  }
  onError() {
    if (NOT_FOUND_IMG_SRC === this.state.src) {
      return;
    }
    const max_attempts = this.props.max_attempts || DEFAULT_MAX_ATTEMPTS;
    const attempt_interval = this.props.attempt_interval || DEFAULT_ATTEMPT_INTERVAL;
    if (this.state.attempts >= max_attempts) {
      this.setState({
        src: NOT_FOUND_IMG_SRC
      });
      return;
    }
    this.setState({
      src: LOADING_IMG_SRC,
      attempts: this.state.attempts + 1
    });
    this.retryId = setTimeout(() => {
      this.setState({
        src: this.props.src
      });
    }, attempt_interval * (this.state.attempts + 1) * (this.state.attempts + 1));
  }
  render() { const props = {
      ...this.props,
      src: this.state.src,
      onError: this.onError
    };
    return (
      <img {...props} />
    );
  }
}
export {Img};