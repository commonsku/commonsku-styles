var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';

var AutosuggestTagsInput = function (_Component) {
  _inherits(AutosuggestTagsInput, _Component);

  function AutosuggestTagsInput() {
    _classCallCheck(this, AutosuggestTagsInput);

    return _possibleConstructorReturn(this, (AutosuggestTagsInput.__proto__ || Object.getPrototypeOf(AutosuggestTagsInput)).apply(this, arguments));
  }

  _createClass(AutosuggestTagsInput, [{
    key: 'renderInputFunction',
    value: function renderInputFunction(_ref) {
      var _this2 = this;

      var tags = _ref.tags,
          shouldRenderSuggestions = _ref.shouldRenderSuggestions,
          getSuggestionValue = _ref.getSuggestionValue,
          renderSuggestion = _ref.renderSuggestion;

      return function (props) {
        var inputValue = (props.value || '').trim().toLowerCase();
        var suggestions = _.filter(tags, function (tag) {
          var value = getSuggestionValue(tag);
          return (value || '').toLowerCase().indexOf(inputValue) !== -1;
        });
        var onSuggestionsFetchRequested = function onSuggestionsFetchRequested(_ref2) {
          var value = _ref2.value;
        };
        var onSuggestionsClearRequested = function onSuggestionsClearRequested() {};
        return React.createElement(Autosuggest, {
          ref: function ref(autosuggest) {
            _this2[props.ref] = autosuggest;
          },
          suggestions: suggestions,
          onSuggestionsFetchRequested: onSuggestionsFetchRequested,
          onSuggestionsClearRequested: onSuggestionsClearRequested,
          shouldRenderSuggestions: shouldRenderSuggestions,
          getSuggestionValue: getSuggestionValue,
          renderSuggestion: renderSuggestion,
          inputProps: props,
          onSuggestionSelected: function onSuggestionSelected(e, _ref3) {
            var suggestion = _ref3.suggestion;

            props.addTag(getSuggestionValue(suggestion));
          },
          focusInputOnSuggestionClick: false
        });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$shouldRenderSu = _props.shouldRenderSuggestions,
          shouldRenderSuggestions = _props$shouldRenderSu === undefined ? function (value) {
        return (value || '').length >= 0;
      } : _props$shouldRenderSu,
          _props$getSuggestionV = _props.getSuggestionValue,
          getSuggestionValue = _props$getSuggestionV === undefined ? function (suggestion) {
        return suggestion.label;
      } : _props$getSuggestionV,
          _props$renderSuggesti = _props.renderSuggestion,
          renderSuggestion = _props$renderSuggesti === undefined ? function (sg) {
        return React.createElement(
          'span',
          null,
          getSuggestionValue(sg)
        );
      } : _props$renderSuggesti,
          tags = _props.tags,
          placeholder = _props.placeholder,
          props = _objectWithoutProperties(_props, ['shouldRenderSuggestions', 'getSuggestionValue', 'renderSuggestion', 'tags', 'placeholder']);

      var renderInput = this.renderInputFunction({
        shouldRenderSuggestions: shouldRenderSuggestions, getSuggestionValue: getSuggestionValue, renderSuggestion: renderSuggestion, tags: tags
      });

      return React.createElement(TagsInput, _extends({}, props, { renderInput: renderInput, inputProps: { placeholder: placeholder } }));
    }
  }]);

  return AutosuggestTagsInput;
}(Component);

export default AutosuggestTagsInput;