var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import AutosizeTextArea from 'react-autosize-textarea';

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TextArea, [{
    key: 'getTextareaDOMNode',
    value: function getTextareaDOMNode() {
      return this.textarea ? findDOMNode(this.textarea) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          _props$onChange = _props.onChange,
          _onChange = _props$onChange === undefined ? _.identity : _props$onChange,
          _props$onFieldChange = _props.onFieldChange,
          onFieldChange = _props$onFieldChange === undefined ? _.identity : _props$onFieldChange,
          props = _objectWithoutProperties(_props, ['children', 'onChange', 'onFieldChange']);

      return React.createElement(
        AutosizeTextArea,
        _extends({}, props, {
          ref: function ref(textarea) {
            _this2.textarea = textarea;
          },
          onChange: function onChange() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            onFieldChange(args[0].target.value);
            return _onChange.apply(undefined, args);
          }
        }),
        children
      );
    }
  }]);

  return TextArea;
}(Component);

export default TextArea;