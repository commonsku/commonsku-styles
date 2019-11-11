var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';

var Mention = function (_Component) {
  _inherits(Mention, _Component);

  function Mention(props) {
    _classCallCheck(this, Mention);

    var _this = _possibleConstructorReturn(this, (Mention.__proto__ || Object.getPrototypeOf(Mention)).call(this, props));

    _this.state = {
      indexed_user_id: _this.getIndexedUserId(_this.props),
      username: ''
    };
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Mention, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        indexed_user_id: this.getIndexedUserId(nextProps)
      });
    }
  }, {
    key: 'getIndexedUserId',
    value: function getIndexedUserId(props) {
      var mention_index = props.mention_index,
          _props$mention_users = props.mention_users,
          mention_users = _props$mention_users === undefined ? [] : _props$mention_users;

      var orig = _.get(this.state, 'indexed_user_id', '');
      return _.get(mention_users, mention_index + '.user_id', orig);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e, username) {
      this.props.handleAddTargetToText(username);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          mention_users = _props.mention_users,
          mention_index = _props.mention_index;

      var chosen = {
        'backgroundColor': '#EDF2F4'
      };
      return React.createElement(
        'ul',
        { className: 'tag-results' },
        mention_users.map(function (u) {
          return React.createElement(
            'li',
            { className: 'tag-user', key: u.user_id,
              onClick: function onClick(e) {
                e.preventDefault();_this2.handleClick(_this2, u.mask);
              },
              style: _this2.state.indexed_user_id == u.user_id ? chosen : null },
            React.createElement('img', { src: u.user_image_paths && u.user_image_paths.original.match(/https?:\/\//) ? '' + u.user_image_paths.original : u.user_image_paths && !u.user_image_paths.original.match(/https?:\/\//) ? '/' + u.user_image_paths.original : '/images/404.png',
              width: '48', height: '48' }),
            React.createElement(
              'a',
              { href: '#', className: 'tag-select' },
              u.contact_first_name,
              ' ',
              u.contact_last_name,
              React.createElement('br', null),
              React.createElement(
                'span',
                { className: 'username' },
                '@',
                u.mask
              )
            )
          );
        })
      );
    }
  }]);

  return Mention;
}(Component);

export default Mention;