var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React from 'react';
import TextArea from 'react-autosize-textarea';

var unique_id = 0;
var id_prefix = 'LabelledTextArea';

var LabelledTextArea = function (_React$Component) {
  _inherits(LabelledTextArea, _React$Component);

  function LabelledTextArea() {
    _classCallCheck(this, LabelledTextArea);

    return _possibleConstructorReturn(this, (LabelledTextArea.__proto__ || Object.getPrototypeOf(LabelledTextArea)).apply(this, arguments));
  }

  _createClass(LabelledTextArea, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      ++unique_id;
      this.setState({ label_id: id_prefix + unique_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$onChange = _props.onChange,
          _onChange = _props$onChange === undefined ? _.identity : _props$onChange,
          _props$onBlur = _props.onBlur,
          _onBlur = _props$onBlur === undefined ? _.identity : _props$onBlur,
          value = _props.value,
          props = _objectWithoutProperties(_props, ['onChange', 'onBlur', 'value']);

      return React.createElement(
        'div',
        { className: this.props.className },
        React.createElement(
          'label',
          { htmlFor: this.state.label_id },
          this.props.label
        ),
        React.createElement(TextArea, _extends({ id: this.state.label_id
        }, props, {
          value: value || '',
          onChange: function onChange(e) {
            return _onChange(e.target.value);
          },
          onBlur: function onBlur(e) {
            return _onBlur(e.target.value);
          } }))
      );
    }
  }]);

  return LabelledTextArea;
}(React.Component);

export default LabelledTextArea;