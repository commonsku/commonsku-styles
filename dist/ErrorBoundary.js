var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var ErrorBoundary = function (_Component) {
  _inherits(ErrorBoundary, _Component);

  function ErrorBoundary(props) {
    _classCallCheck(this, ErrorBoundary);

    var _this = _possibleConstructorReturn(this, (ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call(this, props));

    _this.state = { hasError: false };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log({ error: error, info: info });
    }
  }, {
    key: "renderAggressiveError",
    value: function renderAggressiveError() {
      return {/* <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'url("/images/error.jpg")', backgroundSize: 'cover' }}>
                 <img src="/images/repairbot.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', opacity: '0.7' }} />
                 <h4 style={{ fontSize: '40px', fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '40px' }}>{`>>>Error Found<<<`}</h4>
              </div> */};
    }
  }, {
    key: "render",
    value: function render() {
      var wrapper = style.wrapper,
          row = style.row,
          speech = style.speech,
          bot = style.bot;


      if (this.state.hasError) {
        return React.createElement(
          "div",
          { style: wrapper },
          React.createElement(
            "div",
            { className: "row", style: row },
            React.createElement(
              "div",
              { className: "columns small-1" },
              React.createElement("br", null)
            ),
            React.createElement(
              "div",
              { className: "columns medium-6", style: speech },
              "I'm sorry... this page cannot be loaded.",
              React.createElement("br", null),
              React.createElement("br", null),
              React.createElement(
                "a",
                { href: "/" },
                "Back to home"
              )
            ),
            React.createElement(
              "div",
              { className: "columns medium-4 end" },
              React.createElement("img", { src: "https://login.commonsku.com/images/repairbot.png", style: bot })
            )
          )
        );
      }
      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(Component);

export default ErrorBoundary;


var style = {
  wrapper: {
    background: '#E2EBF2',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  row: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  },
  speech: {
    background: 'white',
    maxWidth: '450px',
    textAlign: 'center',
    padding: '100px 50px',
    borderRadius: '10px',
    fontSize: '2em'
  },
  bot: {
    marginTop: '20px'
  }
};