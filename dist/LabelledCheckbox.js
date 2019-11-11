var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

var unique_id = 0;
var id_prefix = 'LabelledCheckbox';

var LabelledCheckbox = function (_React$Component) {
  _inherits(LabelledCheckbox, _React$Component);

  function LabelledCheckbox() {
    _classCallCheck(this, LabelledCheckbox);

    return _possibleConstructorReturn(this, (LabelledCheckbox.__proto__ || Object.getPrototypeOf(LabelledCheckbox)).apply(this, arguments));
  }

  _createClass(LabelledCheckbox, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      ++unique_id;
      this.setState({ label_id: id_prefix + unique_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var checked = !!parseInt(this.props.value, 10);
      var _onChange = this.props.onChange ? this.props.onChange : function (f) {
        return f;
      };
      return React.createElement(
        'div',
        { className: this.props.className, style: this.props.style },
        React.createElement('input', { id: this.state.label_id, type: 'checkbox', disabled: this.props.disabled, checked: checked, onChange: function onChange(e) {
            return _onChange(e.target.checked ? 1 : 0);
          } }),
        React.createElement(
          'label',
          { htmlFor: this.state.label_id },
          this.props.label
        )
      );
    }
  }]);

  return LabelledCheckbox;
}(React.Component);

export default LabelledCheckbox;