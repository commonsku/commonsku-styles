var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';

import TextArea from './TextArea';
import Mention from './Mention';

var MentionTextarea = function (_Component) {
  _inherits(MentionTextarea, _Component);

  function MentionTextarea(props) {
    _classCallCheck(this, MentionTextarea);

    var _this = _possibleConstructorReturn(this, (MentionTextarea.__proto__ || Object.getPrototypeOf(MentionTextarea)).call(this, props));

    _this.state = {
      value: _this.props.value,
      mention_users: _this.props.mention_users,
      show_mentions: false,
      mention_index: -1
    };

    _.bindAll(_this, ['handleChange', 'handleKeyDown', 'handleKeyPress', 'handleAddTargetToText', 'onTextareaRef']);
    return _this;
  }

  _createClass(MentionTextarea, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(_ref) {
      var _ref$value = _ref.value,
          value = _ref$value === undefined ? '' : _ref$value,
          _ref$mention_users = _ref.mention_users,
          mention_users = _ref$mention_users === undefined ? [] : _ref$mention_users;

      var state = { value: value };
      if (!_.isEqual(mention_users, this.props.mention_users)) {
        state.mention_users = mention_users;
      }
      this.setState(state);
    }
  }, {
    key: '_closeMentions',
    value: function _closeMentions() {
      this.setState({
        show_mentions: false,
        mention_index: -1
      });
    }

    /* get index between cursor and last @ before cursor */

  }, {
    key: '_getLastAtIndexRange',
    value: function _getLastAtIndexRange(value) {
      var cursor = _.get(this, 'textareaDOM.selectionStart', value.length);
      var indexOfAt = value.slice(0, cursor).lastIndexOf('@');
      return [indexOfAt, cursor];
    }
  }, {
    key: 'handleAddTargetToText',
    value: function handleAddTargetToText(target) {
      var _this2 = this;

      var value = this.state.value || '';

      var _getLastAtIndexRange2 = this._getLastAtIndexRange(value),
          _getLastAtIndexRange3 = _slicedToArray(_getLastAtIndexRange2, 2),
          indexOfAt = _getLastAtIndexRange3[0],
          cursor = _getLastAtIndexRange3[1];

      if (indexOfAt !== -1) {
        value = [value.slice(0, indexOfAt), '@' + target + ' ', value.slice(cursor, value.length)].join('');
      }
      if (value !== this.state.value) {
        this.setState({
          value: value
        }, function () {
          if (_this2.textareaDOM && _this2.textareaDOM.setSelectionRange) {
            // plus length of @ target and space
            var newCursor = indexOfAt + target.length + 2;
            _this2.textareaDOM.setSelectionRange(newCursor, newCursor);
          }
        });
        this.props.onChange(value);
      }
      this._closeMentions();
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      // ios return exact same KeyDown event on 2 and @
      // add this KeyPress hack to make ios response on @
      if (e.key === '@' && !this.state.show_mentions) {
        this.setState({ show_mentions: true });
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var _state = this.state,
          show_mentions = _state.show_mentions,
          _state$mention_users = _state.mention_users,
          mention_users = _state$mention_users === undefined ? [] : _state$mention_users,
          mention_index = _state.mention_index;


      switch (e.keyCode) {
        case 50:
          // @
          if (e.key === '@') {
            // @ is shift + 2, so keyCode 50 is not enough
            this.setState({
              show_mentions: true
            });
          }
          return;
        case 27:
          // escape
          e.preventDefault();
          if (show_mentions) {
            this.setState({
              show_mentions: false
            });
          } else {
            this.setState({
              show_mentions: true,
              mention_users: this.filterMentionUsers(this.state.value || '')
            });
          }
          return;
      }

      if (show_mentions) {
        var mention_user = mention_users[mention_index];
        switch (e.keyCode) {
          case 13: // Enter
          case 32:
            // space
            if (mention_users.length > 0) {
              e.preventDefault();
            }
            if (!mention_user) {
              this.setState({
                mention_index: 0
              });
            } else {
              this.handleAddTargetToText(mention_user.mask);
            }
            return;
          case 38:
            // up arrow
            e.preventDefault();
            this.setState({
              mention_index: mention_index > 0 ? mention_index - 1 : 0
            });
            return;
          case 40:
            // down arrow
            e.preventDefault();
            this.setState({
              mention_index: mention_index < mention_users.length - 1 ? mention_index + 1 : mention_index
            });
            return;
        }
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var value = e.target.value || '';
      var show_mentions = this.state.show_mentions;


      if (show_mentions) {
        var _getLastAtIndexRange4 = this._getLastAtIndexRange(value),
            _getLastAtIndexRange5 = _slicedToArray(_getLastAtIndexRange4, 2),
            indexOfAt = _getLastAtIndexRange5[0],
            cursor = _getLastAtIndexRange5[1];

        if (indexOfAt !== -1) {
          var target = value.slice(indexOfAt + 1, cursor);
          this.setState({
            mention_users: this.filterMentionUsers(target)
          });
        } else {
          this._closeMentions();
        }
      }
      this.setState({
        value: value
      });
      this.props.onChange(value);
    }
  }, {
    key: 'filterMentionUsers',
    value: function filterMentionUsers(value) {
      return _.filter(this.props.mention_users, function (u) {
        return u.contact_first_name.concat(u.contact_last_name).toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
    }
  }, {
    key: 'onTextareaRef',
    value: function onTextareaRef(textarea) {
      this.textareaDOM = textarea ? textarea.getTextareaDOMNode() : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          value = _state2.value,
          show_mentions = _state2.show_mentions,
          mention_index = _state2.mention_index,
          mention_users = _state2.mention_users;


      return React.createElement(
        'div',
        { className: 'mention-textarea-container' },
        React.createElement(TextArea, _extends({}, this.props, {
          value: value,
          ref: this.onTextareaRef,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          onKeyPress: this.handleKeyPress
        })),
        show_mentions ? React.createElement(Mention, { handleAddTargetToText: this.handleAddTargetToText,
          mention_users: mention_users, mention_index: mention_index }) : null
      );
    }
  }]);

  return MentionTextarea;
}(Component);

export default MentionTextarea;


MentionTextarea.defaultProps = {
  value: '',
  onChange: _.identity
};