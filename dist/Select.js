var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';
import BaseSelect, { Creatable, Async } from 'react-select';

var LARGE_DROPDOWN_CUTOFF = 0;

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      value: _this.props.value,
      error: _this.props.error
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value, error: nextProps.error });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.refs.select.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          style = _props.style,
          value = _props.value,
          defaultValue = _props.defaultValue,
          options = _props.options,
          disabled = _props.disabled,
          error = _props.error,
          gallery = _props.gallery,
          className = _props.className,
          _props$multi = _props.multi,
          multi = _props$multi === undefined ? false : _props$multi,
          _props$change = _props.change,
          change = _props$change === undefined ? _.identity : _props$change,
          _props$onChange = _props.onChange,
          _onChange = _props$onChange === undefined ? _.identity : _props$onChange,
          _props$clearable = _props.clearable,
          clearable = _props$clearable === undefined ? clearable ? clearable : false : _props$clearable,
          _props$searchable = _props.searchable,
          searchable = _props$searchable === undefined ? this.props.options ? this.props.options.length > LARGE_DROPDOWN_CUTOFF : true : _props$searchable,
          placeholder = _props.placeholder,
          _props$creatable = _props.creatable,
          creatable = _props$creatable === undefined ? false : _props$creatable,
          _props$async = _props.async,
          async = _props$async === undefined ? false : _props$async;

      var width = Math.max.apply(null, (options || []).map(function (o) {
        return (o.value || []).length;
      })) || 0;
      var isLong = options ? options.length > LARGE_DROPDOWN_CUTOFF : true;

      var menuStyle = Object.assign(isLong ? { maxHeight: '300px' } : {}, this.props.menuStyle);
      var menuContainerStyle = Object.assign(isLong ? { maxHeight: '302px' } : {}, { minWidth: Math.min(500, width * 12) + 'px', zIndex: 2 }, this.props.menuContainerStyle);

      var errorStyle = {
        border: 'solid red'
      };

      var galleryStyle = {
        background: '#81828c',
        color: '#FFF',
        height: '50px'
      };

      var select_attributes = {
        id: id, wrapperStyle: style, clearable: clearable, searchable: searchable, className: className,
        menuStyle: menuStyle, menuContainerStyle: menuContainerStyle, placeholder: placeholder, multi: multi
      };
      if (this.state.value) {
        select_attributes.value = this.state.value;
      }
      if (defaultValue) {
        select_attributes.defaultValue = defaultValue;
      }
      if (disabled) {
        select_attributes.disabled = true;
      }
      if (this.state.error) {
        select_attributes.style = _.merge(style || {}, errorStyle);
      }
      if (gallery) {
        select_attributes.style = _.merge(style || {}, galleryStyle);
      }
      var stand_in = {
        label: placeholder,
        value: ''
      };

      if (creatable) {
        var _props2 = this.props,
            isOptionUnique = _props2.isOptionUnique,
            isValidNewOption = _props2.isValidNewOption,
            newOptionCreator = _props2.newOptionCreator,
            onNewOptionClick = _props2.onNewOptionClick,
            shouldKeyDownEventCreateNewOption = _props2.shouldKeyDownEventCreateNewOption,
            promptTextCreator = _props2.promptTextCreator;

        return React.createElement(Creatable, _extends({
          ref: 'select'
        }, select_attributes, {
          options: options.map(function (o) {
            return { value: o.key, label: o.value };
          }),
          onChange: function onChange(e) {
            _onChange(e ? e : stand_in);
            if (multi) {
              return change(e ? e.map(function (v) {
                return v.value;
              }) : [stand_in.value]);
            } else {
              return change(e ? e.value : stand_in.value);
            }
          },
          isOptionUnique: isOptionUnique,
          isValidNewOption: isValidNewOption,
          newOptionCreator: newOptionCreator,
          onNewOptionClick: onNewOptionClick,
          shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption,
          promptTextCreator: promptTextCreator
        }));
      } else if (async) {
        var _props3 = this.props,
            loadOptions = _props3.loadOptions,
            filterOptions = _props3.filterOptions;

        return React.createElement(Async, _extends({
          ref: 'select'
        }, select_attributes, {
          loadOptions: loadOptions,
          filterOptions: filterOptions,
          onChange: function onChange(e) {
            _onChange(e ? e : stand_in);
            if (multi) {
              return change(e ? e.map(function (v) {
                return v.value;
              }) : [stand_in.value]);
            } else {
              return change(e ? e.value : stand_in.value);
            }
          }
        }));
      } else {
        return React.createElement(BaseSelect, _extends({
          ref: 'select'
        }, select_attributes, {
          options: options.map(function (o) {
            return { value: o.key, label: o.value };
          }),
          onChange: function onChange(e) {
            _onChange(e ? e : stand_in);
            if (multi) {
              return change(e ? e.map(function (v) {
                return v.value;
              }) : [stand_in.value]);
            } else {
              return change(e ? e.value : stand_in.value);
            }
          }
        }));
      }
    }
  }]);

  return Select;
}(Component);

export default Select;