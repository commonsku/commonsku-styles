var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
//import { DateField, Calendar, } from 'react-date-picker'
import DatePicker from 'react-datepicker';

import ErrorBoundary from './ErrorBoundary';

var CustomInput = function (_Component) {
  _inherits(CustomInput, _Component);

  function CustomInput() {
    _classCallCheck(this, CustomInput);

    return _possibleConstructorReturn(this, (CustomInput.__proto__ || Object.getPrototypeOf(CustomInput)).apply(this, arguments));
  }

  _createClass(CustomInput, [{
    key: 'focus',
    value: function focus() {
      if (this._input) {
        this._input.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return [React.createElement('input', _extends({}, this.props, { key: 'input',
        ref: function ref(input) {
          _this2._input = input;
        },
        style: { marginRight: '-2rem', display: 'inline-block' },
        className: 'react-datepicker-ignore-onclickoutside',
        type: 'text', autoComplete: 'off'
      })), React.createElement('i', { className: 'fa fa-calendar', key: 'icon',
        style: { fontStyle: 'normal', cursor: 'pointer' },
        onClick: this.props.onClick
      })];
    }
  }]);

  return CustomInput;
}(Component);

var DateInput = function (_Component2) {
  _inherits(DateInput, _Component2);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this3 = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    _this3.state = { value: props.value !== "" ? _this3.parsePropsValue(props.value) : null };

    _.bindAll(_this3, ['onBlur', 'onChange']);

    _this3.debounceOnBlur = _.debounce(_this3.onBlur, 300);
    return _this3;
  }

  _createClass(DateInput, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(props) {
      if (this.props.value !== props.value) {
        this.setState({ value: this.parsePropsValue(props.value) });
      }
    }
  }, {
    key: 'parsePropsValue',
    value: function parsePropsValue(value) {
      var _props = this.props,
          inputFormat = _props.inputFormat,
          outputFormat = _props.outputFormat;


      if (value === '0000-00-00 00:00:00' || value === '0000-00-00' || !value) {
        return null;
      }

      var m = moment(value, inputFormat);

      if (m.format(outputFormat) === value) {
        return m;
      } else {
        return moment(moment(value, 'YYYY-MM-DD HH:mm:ss').format(outputFormat), inputFormat);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var value = this.state.value;
      var _props2 = this.props,
          outputFormat = _props2.outputFormat,
          onBlur = _props2.onBlur;


      if (onBlur) {
        if (!value) {
          onBlur('');
        } else if (value.isValid()) {
          onBlur(value.format(outputFormat));
        }
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      var _props3 = this.props,
          outputFormat = _props3.outputFormat,
          onChange = _props3.onChange,
          onBlur = _props3.onBlur;


      this.setState({ value: value }, function () {
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
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          _props4$className = _props4.className,
          className = _props4$className === undefined ? '' : _props4$className,
          dateFormat = _props4.dateFormat,
          placeholder = _props4.placeholder,
          onBlur = _props4.onBlur,
          onChange = _props4.onChange,
          props = _objectWithoutProperties(_props4, ['className', 'dateFormat', 'placeholder', 'onBlur', 'onChange']);

      var value = this.state.value;


      return React.createElement(
        ErrorBoundary,
        null,
        React.createElement(DatePicker, {
          locale: 'en',
          selected: value,
          todayButton: 'today',
          onChange: this.onChange,
          onBlur: this.onBlur,
          dateFormatCalendar: dateFormat,
          dateFormat: dateFormat,
          customInput: React.createElement(CustomInput, null),
          placeholderText: placeholder
        })
      );
    }
  }]);

  return DateInput;
}(Component);

export default DateInput;


DateInput.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity,
  dateFormat: 'YYYY-MM-DD',
  inputFormat: 'YYYY-MM-DD',
  outputFormat: 'YYYY-MM-DD',
  placeholder: 'YYYY-MM-DD'
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