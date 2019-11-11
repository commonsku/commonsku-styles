var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Select from './Select';

var unique_id = 0;
var id_prefix = 'LabelledSelect';

var LabelledSelect = function (_React$Component) {
  _inherits(LabelledSelect, _React$Component);

  function LabelledSelect() {
    _classCallCheck(this, LabelledSelect);

    return _possibleConstructorReturn(this, (LabelledSelect.__proto__ || Object.getPrototypeOf(LabelledSelect)).apply(this, arguments));
  }

  _createClass(LabelledSelect, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      ++unique_id;
      this.setState({ label_id: id_prefix + unique_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          label = _props.label,
          labelStyle = _props.labelStyle,
          props = _objectWithoutProperties(_props, ['className', 'label', 'labelStyle']);

      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          'label',
          { style: labelStyle, htmlFor: this.state.label_id },
          label
        ),
        React.createElement(Select, { id: this.state.label_id, value: this.props.value, placeholder: this.props.placeholder, defaultValue: this.props.defaultValue, options: this.props.options, change: this.props.onChange, disabled: this.props.disabled, gallery: this.props.gallery })
      );
    }
  }]);

  return LabelledSelect;
}(React.Component);

export default LabelledSelect;