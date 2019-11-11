import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

let uniqueId = 0;
const ID_PREFIX = 'LabelledColorPicker';

const DEFAULT_COLOR = '#5ca3b6';

class LabelledColorPicker extends Component {

  constructor(props) {
    super(props);

    ++uniqueId;
    this.state = {
      labelId: `${ID_PREFIX}${uniqueId}`,
      pickerOpen: false,
      backgroundColor: props.value || DEFAULT_COLOR
    };

    this.handleClickElsewhere = this.handleClickElsewhere.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChangeComplete = this.onChangeComplete.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickElsewhere, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ backgroundColor: nextProps.value || DEFAULT_COLOR });
  }

  handleClickElsewhere(e) {
    if (this.colorpicker) {
      if (e.target !== this.colorpicker && !this.colorpicker.contains(e.target)) {
        this.setState({ pickerOpen: false }, () => window.removeEventListener('click', this.handleClickElsewhere, false));
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const pickerOpen = this.state.pickerOpen;
    this.setState(prevState => ({ pickerOpen: !prevState.pickerOpen }), () => {
      window.removeEventListener('click', this.handleClickElsewhere, false);
      if (!pickerOpen) {
        window.addEventListener('click', this.handleClickElsewhere, false);
      }
    });
  }

  onChangeComplete(color) {
    this.props.onChange(color.hex);
  }

  render() {
    const { className, label, value } = this.props;
    const { backgroundColor, labelId, pickerOpen } = this.state;

    return (
      <div className={className}>
        <label htmlFor={labelId}>
          {label}
        </label>
        <div id={labelId} className="Select Select--single" style={{ margin: `0 0 ${pickerOpen ? '0.25' : '1'}rem` }}>
          <div className="Select-control" style={{ width: '2rem', backgroundColor }} onClick={this.handleClick}>
            <span className="Select-arrow-zone" style={{ padding: '5px' }}>
              <span className="Select-arrow"></span> 
            </span>
          </div>
        </div>
        {pickerOpen &&
          <div ref={ref => this.colorpicker = ref} style={{ position: 'absolute', zIndex: 1000, background: 'white' }}>
            <ChromePicker color={backgroundColor} onChangeComplete={this.onChangeComplete} />
          </div>
        }
      </div>
    );
  }
}

export default LabelledColorPicker;
