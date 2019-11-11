import _ from 'lodash'
import React, { Component } from 'react'
import moment from 'moment'
//import { DateField, Calendar, } from 'react-date-picker'
import DatePicker from 'react-datepicker'

import ErrorBoundary from './ErrorBoundary'

class CustomInput extends Component {
  focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  render() {
    return [
      <input {...this.props} key="input"
        ref={(input) => {this._input = input}}
        style={{ marginRight: '-2rem', display: 'inline-block' }}
        className="react-datepicker-ignore-onclickoutside" 
        type="text" autoComplete="off" 
      />,
      <i className="fa fa-calendar" key="icon"
        style={{ fontStyle: 'normal', cursor: 'pointer' }}
        onClick={this.props.onClick}
      />,
    ];
  }
}

export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value !== "" ? this.parsePropsValue(props.value) : null};

    _.bindAll(this, ['onBlur', 'onChange',]);

    this.debounceOnBlur = _.debounce(this.onBlur, 300);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.props.value !== props.value) {
      this.setState({value: this.parsePropsValue(props.value)});
    }
  }

  parsePropsValue(value) {
    const { inputFormat, outputFormat } = this.props;

    if(value === '0000-00-00 00:00:00' || value === '0000-00-00' || !value) {
      return null;
    }

    let m = moment(value, inputFormat);

    if(m.format(outputFormat) === value) {
      return m;
    }else{
      return moment(moment(value, 'YYYY-MM-DD HH:mm:ss').format(outputFormat), inputFormat);
    }
  }

  onBlur() {
    const { value } = this.state;
    const { outputFormat, onBlur } = this.props;

    if (onBlur) {
      if (!value) {
        onBlur('');
      } else if(value.isValid()) {
        onBlur(value.format(outputFormat));
      }
    }
  }

  onChange(value) {
    const {
      outputFormat, onChange, onBlur
    } = this.props;

    this.setState({ value }, () => {
      if (onChange) {
        if (!value) {
          onChange('');
        } else if (value.isValid()) {
          onBlur(value.format(outputFormat));
          onChange(value.format(outputFormat));
        }
      }
    });
  }

  render() {
    const {
      className = '',
      dateFormat,
      placeholder,
      onBlur, onChange,
      ...props
    } = this.props;

    const { value } = this.state;

    return <ErrorBoundary>
      <DatePicker 
        locale="en"
        selected={value} 
        todayButton={'today'}
        onChange={this.onChange}
        onBlur={this.onBlur}
        dateFormatCalendar={dateFormat}
        dateFormat={dateFormat}
        customInput={<CustomInput/>}
        placeholderText={placeholder}
      />
    </ErrorBoundary>
  }
}

DateInput.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity,
  dateFormat: 'YYYY-MM-DD',
  inputFormat: 'YYYY-MM-DD',
  outputFormat: 'YYYY-MM-DD',
  placeholder: 'YYYY-MM-DD', 
};


/*

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DatePicker from 'material-ui/DatePicker'
      <MuiThemeProvider>
        <DatePicker container="inline" mode="landscape"
          hideCalendarDate={false} 
          disableYearSelection={false}
          firstDayOfWeek={0}
          autoOk={true} 
          underlineStyle={{ display: 'none' }}
          inputStyle={{
            padding: null,
            border: null,
            height: null,
          }}
        />
      </MuiThemeProvider>

*/
