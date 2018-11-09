import _ from 'lodash'
import React from 'react'
import moment from 'moment'
import { DateField, Calendar, } from 'react-date-picker'

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.parsePropsValue(props.value)};

    _.bindAll(this, ['onBlur', 'onChange',]);

    this.debounceOnBlur = _.debounce(this.onBlur, 300);
  }

  componentWillReceiveProps(props) {
    if (this.props.value !== props.value) {
      this.setState({value: this.parsePropsValue(props.value)});
    }
  }

  parsePropsValue(value) {
    const {
      dateFormat,
      inputFormat,
    } = this.props;
    const m = moment(value, inputFormat);

    return m.isValid() ? m.format(dateFormat) : '';
  }

  isValid(value) {
    return moment(value, this.props.dateFormat, true).isValid();
  }

  onBlur() {
    const dateString = this.state.value;
    const {
      dateFormat, outputFormat, onBlur,
    } = this.props;

    if (onBlur, this.isValid(dateString) || dateString === '') {
      onBlur(moment(dateString, dateFormat).format(outputFormat));
    } else {
      this.setState({value: ''});
    }
  }

  onChange(dateString) {
    const {
      dateFormat, outputFormat, onChange,
    } = this.props;

    this.setState({value: dateString});
    if (onChange && this.isValid(dateString) || dateString === '') {
      onChange(moment(dateString, dateFormat).format(outputFormat));
    }
  }

  render() {
    const {
      className = '',
      align,
      onBlur,
      onChange,
      ...props
    } = this.props;

    let {
      value,
    } = this.state;

    return (
      <DateField
        {...props}
        value={value}
        className={'date-input ' + className + (
          align === 'right' ? ' align-right' : '')}
        onBlur={this.debounceOnBlur}
        onTextChange={this.onChange}
        defaultValue={this.props.defaultValue}
      >
        <Calendar
          navigation={true}
          locale="en"
          forceValidDate={false}
          highlightWeekends={true}
          highlightToday={true}
          weekNumbers={false}
          weekStartDay={0}
          clearButton={false}
          okButton={this.props.showOkButton}
          todayButton={this.props.showTodayButton}
          cancelButton={this.props.showCancelButton}
          defaultValue={this.props.defaultValue}
        />
      </DateField>
    )
  }
}

DateInput.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity,
  updateOnDateClick: true,
  collapseOnDateClick: true,
  showClock: false,
  dateFormat: 'YYYY-MM-DD',
  inputFormat: 'YYYY-MM-DD',
  outputFormat: 'YYYY-MM-DD',
  placeholder: 'YYYY-MM-DD', 
  clearIcon: false
};

