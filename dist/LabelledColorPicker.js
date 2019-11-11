var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

var uniqueId = 0;
var ID_PREFIX = 'LabelledColorPicker';

var DEFAULT_COLOR = '#5ca3b6';

var LabelledColorPicker = function (_Component) {
  _inherits(LabelledColorPicker, _Component);

  function LabelledColorPicker(props) {
    _classCallCheck(this, LabelledColorPicker);

    var _this = _possibleConstructorReturn(this, (LabelledColorPicker.__proto__ || Object.getPrototypeOf(LabelledColorPicker)).call(this, props));

    ++uniqueId;
    _this.state = {
      labelId: '' + ID_PREFIX + uniqueId,
      pickerOpen: false,
      backgroundColor: props.value || DEFAULT_COLOR
    };

    _this.handleClickElsewhere = _this.handleClickElsewhere.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.onChangeComplete = _this.onChangeComplete.bind(_this);
    return _this;
  }

  _createClass(LabelledColorPicker, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.handleClickElsewhere, false);
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({ backgroundColor: nextProps.value || DEFAULT_COLOR });
    }
  }, {
    key: 'handleClickElsewhere',
    value: function handleClickElsewhere(e) {
      var _this2 = this;

      if (this.colorpicker) {
        if (e.target !== this.colorpicker && !this.colorpicker.contains(e.target)) {
          this.setState({ pickerOpen: false }, function () {
            return window.removeEventListener('click', _this2.handleClickElsewhere, false);
          });
        }
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var _this3 = this;

      e.preventDefault();
      e.stopPropagation();
      var pickerOpen = this.state.pickerOpen;
      this.setState(function (prevState) {
        return { pickerOpen: !prevState.pickerOpen };
      }, function () {
        window.removeEventListener('click', _this3.handleClickElsewhere, false);
        if (!pickerOpen) {
          window.addEventListener('click', _this3.handleClickElsewhere, false);
        }
      });
    }
  }, {
    key: 'onChangeComplete',
    value: function onChangeComplete(color) {
      this.props.onChange(color.hex);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          className = _props.className,
          label = _props.label,
          value = _props.value;
      var _state = this.state,
          backgroundColor = _state.backgroundColor,
          labelId = _state.labelId,
          pickerOpen = _state.pickerOpen;


      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          'label',
          { htmlFor: labelId },
          label
        ),
        React.createElement(
          'div',
          { id: labelId, className: 'Select Select--single', style: { margin: '0 0 ' + (pickerOpen ? '0.25' : '1') + 'rem' } },
          React.createElement(
            'div',
            { className: 'Select-control', style: { width: '2rem', backgroundColor: backgroundColor }, onClick: this.handleClick },
            React.createElement(
              'span',
              { className: 'Select-arrow-zone', style: { padding: '5px' } },
              React.createElement('span', { className: 'Select-arrow' })
            )
          )
        ),
        pickerOpen && React.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this4.colorpicker = _ref;
            }, style: { position: 'absolute', zIndex: 1000, background: 'white' } },
          React.createElement(ChromePicker, { color: backgroundColor, onChangeComplete: this.onChangeComplete })
        )
      );
    }
  }]);

  return LabelledColorPicker;
}(Component);

export default LabelledColorPicker;