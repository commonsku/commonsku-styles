var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';

var TextInput = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _.bindAll(_this, ['handleFocus']);
    return _this;
  }

  _createClass(TextInput, [{
    key: 'handleFocus',
    value: function handleFocus(e) {
      if (this.props.selectOnFocus) {
        e.target.select();
      }
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectOnFocus = _props.selectOnFocus,
          props = _objectWithoutProperties(_props, ['selectOnFocus']);

      return React.createElement('input', _extends({}, props, { type: 'text', onFocus: this.handleFocus }));
    }
  }]);

  return TextInput;
}(Component);

export default TextInput;


TextInput.defaultProps = {
  selectOnFocus: false
  //disableDrag: true,
};