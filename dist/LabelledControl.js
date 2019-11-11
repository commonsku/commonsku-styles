var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var unique_id = 0;
var ID_PREFIX = 'LabelledControl';

var LabelledControl = function (_Component) {
  _inherits(LabelledControl, _Component);

  function LabelledControl(props) {
    _classCallCheck(this, LabelledControl);

    var _this = _possibleConstructorReturn(this, (LabelledControl.__proto__ || Object.getPrototypeOf(LabelledControl)).call(this, props));

    _this.labelId = '' + ID_PREFIX + ++unique_id;
    return _this;
  }

  _createClass(LabelledControl, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          label = _props.label,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['className', 'label', 'children']);

      var childrenWithId = React.Children.map(children, function (child) {
        return React.cloneElement(child, { id: _this2.labelId });
      });
      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          'label',
          { htmlFor: this.labelId },
          label
        ),
        childrenWithId
      );
    }
  }]);

  return LabelledControl;
}(Component);

export default LabelledControl;