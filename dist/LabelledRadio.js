var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Select from './Select';

var unique_id = 0;
var id_prefix = 'LabelledRadio';

var LabelledRadio = function (_React$Component) {
  _inherits(LabelledRadio, _React$Component);

  function LabelledRadio() {
    _classCallCheck(this, LabelledRadio);

    return _possibleConstructorReturn(this, (LabelledRadio.__proto__ || Object.getPrototypeOf(LabelledRadio)).apply(this, arguments));
  }

  _createClass(LabelledRadio, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      ++unique_id;
      this.setState({ label_id: id_prefix + unique_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: this.props.className },
        React.createElement(
          'label',
          { htmlFor: this.state.label_id },
          this.props.label
        ),
        this.props.options.map(function (o) {
          return React.createElement(
            'label',
            { key: o.key, htmlFor: _this2.state.label_id + o.key, style: { display: _this2.props.blockStyle ? _this2.props.blockStyle : 'inline-block', marginRight: '10px', marginBottom: '10px' } },
            React.createElement('input', { id: _this2.state.label_id + o.key, type: 'radio', style: { marginBottom: 0 }, checked: _this2.props.value === o.key, onClick: function onClick(e) {
                return _this2.props.onChange(o.key);
              }, onChange: function onChange(e) {}, disabled: _this2.props.disabled }),
            o.value
          );
        })
      );
    }
  }]);

  return LabelledRadio;
}(React.Component);

export default LabelledRadio;