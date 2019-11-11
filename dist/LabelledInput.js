var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React from 'react';
import DateInput from './DateInput';

var unique_id = 0;
var id_prefix = 'LabelledInput';

var LabelledInput = function (_React$Component) {
  _inherits(LabelledInput, _React$Component);

  function LabelledInput(props) {
    _classCallCheck(this, LabelledInput);

    var _this = _possibleConstructorReturn(this, (LabelledInput.__proto__ || Object.getPrototypeOf(LabelledInput)).call(this, props));

    _this.state = {};

    _.each(['onChange', 'onBlur', 'onFocus'], function (method) {
      _this[method] = _this[method].bind(_this);
    });
    return _this;
  }

  _createClass(LabelledInput, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      ++unique_id;
      this.setState({ label_id: id_prefix + unique_id });
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.props.onChange(e.target.value);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.props.onBlur(e.target.value);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(e) {
      e.target.select();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          label = _props.label,
          _props$type = _props.type,
          type = _props$type === undefined ? 'text' : _props$type,
          onChange = _props.onChange,
          onBlur = _props.onBlur,
          _props$labelOrientati = _props.labelOrientation,
          labelOrientation = _props$labelOrientati === undefined ? 'top' : _props$labelOrientati,
          props = _objectWithoutProperties(_props, ['className', 'label', 'type', 'onChange', 'onBlur', 'labelOrientation']);

      var label_id = this.state.label_id;


      var input = labelOrientation == 'side' ? React.createElement('input', _extends({ id: label_id
      }, props, {
        type: type,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        className: 'input-group-field custom-input-group-field'
      })) : React.createElement('input', _extends({ id: label_id
      }, props, {
        type: type,
        onChange: this.onChange,
        onBlur: this.onBlur
      }));

      if (type === 'date') {
        input = React.createElement(DateInput, _extends({}, props, { onChange: onChange, onBlur: onBlur }));
      }

      var input_group_class = 'input-group side-input ' + className;

      return labelOrientation === 'side' ? React.createElement(
        'div',
        { className: input_group_class },
        React.createElement(
          'span',
          { className: 'input-group-label', htmlFor: label_id, style: { padding: '0 0.5rem', minWidth: '40px', 'backgroundColor': '#2d424c', color: '#FFF' } },
          label
        ),
        input
      ) : React.createElement(
        'div',
        { className: className },
        React.createElement(
          'label',
          { htmlFor: label_id },
          label
        ),
        input
      );
    }
  }]);

  return LabelledInput;
}(React.Component);

export default LabelledInput;


LabelledInput.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity
};