var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';
import Textarea from './TextArea';
import MentionTextarea from './MentionTextarea';
import Select from './Select';
import DateInput from './DateInput';
import AutosuggestTagsInput from './AutosuggestTagsInput';

var uniqueId = 0;
var ID_PREFIX = '___FORM_LABEL___';

var _validate = function _validate(value, props, validate) {
  var error = null;
  if (props.required && _.isEmpty(value) || props.options && !props.options.filter(function (o) {
    return o.key === value;
  }).length) {
    error = {
      message: (props.label || props.placeholder) + ' is required'
    };
  }
  return _.isFunction(validate) ? validate(value, props, error) : error;
};

var BaseField = function (_Component) {
  _inherits(BaseField, _Component);

  function BaseField(props) {
    _classCallCheck(this, BaseField);

    var _this = _possibleConstructorReturn(this, (BaseField.__proto__ || Object.getPrototypeOf(BaseField)).call(this, props));

    _this.id = ++uniqueId;

    _.bindAll(_this, ['handleChange', 'handleBlur', 'handleFocus']);
    return _this;
  }

  _createClass(BaseField, [{
    key: 'getValue',
    value: function getValue(e) {
      var getValue = this.props.getValue;
      if (_.isFunction(getValue)) {
        return getValue(e);
      }
      return _.get(e, 'target.value', e);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _props = this.props,
          onFieldChange = _props.onFieldChange,
          onChange = _props.onChange;

      var value = this.getValue(e);
      if (this.props.tags) {
        value = _.uniq(value);
      }

      onFieldChange(value, this.props);
      onChange(value);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var _props2 = this.props,
          onFieldBlur = _props2.onFieldBlur,
          onBlur = _props2.onBlur;

      var value = this.getValue(e);

      onFieldBlur(value, this.props);
      onBlur(value);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      var _props3 = this.props,
          onFieldFocus = _props3.onFieldFocus,
          onFocus = _props3.onFocus;

      var value = this.getValue(e);

      onFieldFocus(value, this.props);
      onFocus(value);
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel(params) {
      var noPaddingLeft = {
        paddingLeft: 0
      };
      var _props4 = this.props,
          label = _props4.label,
          helpText = _props4.helpText,
          _props4$labelClassNam = _props4.labelClassName,
          labelClassName = _props4$labelClassNam === undefined ? params == 'radio' ? "small-12 medium-10 columns" : "small-12 medium-4 columns" : _props4$labelClassNam,
          renderLabel = _props4.renderLabel,
          _props4$labelStyle = _props4.labelStyle,
          labelStyle = _props4$labelStyle === undefined ? { fontSize: 'initial' } : _props4$labelStyle;


      if (_.isFunction(renderLabel)) {
        return renderLabel(label);
      }

      return React.createElement(
        'div',
        { className: labelClassName, style: params == 'radio' ? noPaddingLeft : null },
        React.createElement(
          'label',
          { style: labelStyle, htmlFor: ID_PREFIX + this.id },
          label
        ),
        helpText ? React.createElement(
          'div',
          { className: 'help-text' },
          helpText
        ) : null
      );
    }
  }, {
    key: 'renderControl',
    value: function renderControl(params) {
      var _props5 = this.props,
          Control = _props5.Control,
          error = _props5.error,
          displayLabel = _props5.displayLabel,
          required = _props5.required,
          _props5$placeholder = _props5.placeholder,
          placeholder = _props5$placeholder === undefined ? this.props.required ? 'Required Field' : '' : _props5$placeholder,
          onFieldChange = _props5.onFieldChange,
          onFieldFocus = _props5.onFieldFocus,
          onFieldBlur = _props5.onFieldBlur,
          children = _props5.children,
          _props5$controlClassN = _props5.controlClassName,
          controlClassName = _props5$controlClassN === undefined ? params == 'radio' ? 'small-12 medium-2 columns' : 'small-12 medium-8 columns' : _props5$controlClassN,
          containerStyle = _props5.containerStyle,
          prefix = _props5.prefix,
          props = _objectWithoutProperties(_props5, ['Control', 'error', 'displayLabel', 'required', 'placeholder', 'onFieldChange', 'onFieldFocus', 'onFieldBlur', 'children', 'controlClassName', 'containerStyle', 'prefix']);

      var controlProps = _.omit(props, ['validate', 'className', 'field', 'label', 'displayRadio', 'containerClassName', 'getValue', 'setValue']);

      return React.createElement(
        'div',
        { className: displayLabel ? controlClassName : this.getContainerClassName(), style: displayLabel ? {} : containerStyle },
        error ? React.createElement(
          'div',
          { className: 'field-error' },
          error.message
        ) : null,
        prefix,
        React.createElement(
          Control,
          _extends({}, controlProps, {
            id: ID_PREFIX + this.id,
            placeholder: placeholder,
            onFocus: this.handleFocus, onChange: this.handleChange,
            onBlur: this.handleBlur }),
          children
        ),
        this.renderExtra()
      );
    }
  }, {
    key: 'renderExtra',
    value: function renderExtra() {
      return this.props.extra;
    }
  }, {
    key: 'getContainerClassName',
    value: function getContainerClassName() {
      var _props6 = this.props,
          error = _props6.error,
          _props6$className = _props6.className,
          className = _props6$className === undefined ? '' : _props6$className,
          _props6$containerClas = _props6.containerClassName,
          containerClassName = _props6$containerClas === undefined ? 'field row' : _props6$containerClas;


      return containerClassName + (error ? ' has-error ' : '') + ' ' + className;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          containerStyle = _props7.containerStyle,
          displayLabel = _props7.displayLabel,
          displayRadio = _props7.displayRadio,
          rightHelpText = _props7.rightHelpText;

      return !displayLabel ? this.renderControl() : displayRadio ? React.createElement(
        'div',
        { className: this.getContainerClassName(), style: containerStyle },
        this.renderControl('radio'),
        this.renderLabel('radio')
      ) : React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: rightHelpText ? 'field small-12 medium-9 columns' : this.getContainerClassName(), style: containerStyle },
          this.renderLabel(),
          this.renderControl()
        ),
        rightHelpText ? React.createElement(
          'div',
          { className: 'small-12 medium-3 columns' },
          React.createElement(
            'p',
            { style: { backgroundColor: '#FFF3D9', padding: '10px', borderRadius: '10px' } },
            rightHelpText
          )
        ) : null
      );
    }
  }]);

  return BaseField;
}(Component);

BaseField.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity,
  onFocus: _.identity,
  displayLabel: true,
  displayRadio: false
};

var FormTextInput = function FormTextInput(props) {
  return React.createElement(BaseField, _extends({}, props, { Control: TextInput }));
};
var FormTextarea = function FormTextarea(props) {
  return React.createElement(BaseField, _extends({}, props, { Control: Textarea }));
};
var createFormSelect = function createFormSelect(Control) {
  return function (props) {
    var _props$getValue = props.getValue,
        getValue = _props$getValue === undefined ? function (e) {
      return _.get(e, 'target.value', _.get(e, 'value', e));
    } : _props$getValue,
        fieldProps = _objectWithoutProperties(props, ['getValue']);

    return React.createElement(BaseField, _extends({}, fieldProps, { Control: Control, getValue: getValue, onFieldChange: function onFieldChange() {
        props.onFieldChange.apply(props, arguments);
        props.onFieldBlur.apply(props, arguments);
      } }));
  };
};
export { createFormSelect };
var FormMentionTextarea = function FormMentionTextarea(props) {
  return React.createElement(BaseField, _extends({}, props, { Control: MentionTextarea }));
};
var FormSelect = createFormSelect(Select);
var Radio = function Radio(_ref) {
  var value = _ref.value,
      props = _objectWithoutProperties(_ref, ['value']);

  return React.createElement('input', _extends({}, props, { type: 'radio', checked: props.checked }));
};
var FormRadio = function FormRadio(props) {
  var _props$getValue2 = props.getValue,
      getValue = _props$getValue2 === undefined ? function (e) {
    return e.target.checked;
  } : _props$getValue2,
      fieldProps = _objectWithoutProperties(props, ['getValue']);

  return React.createElement(BaseField, _extends({}, fieldProps, { Control: Radio,
    getValue: getValue,
    onFieldChange: function onFieldChange() {
      props.onFieldChange.apply(props, arguments);
      props.onFieldBlur.apply(props, arguments);
    } }));
};
var FormDateInput = function FormDateInput(props) {
  return React.createElement(BaseField, _extends({}, props, { Control: DateInput }));
};

var Checkbox = function Checkbox(_ref2) {
  var value = _ref2.value,
      props = _objectWithoutProperties(_ref2, ['value']);

  return React.createElement('input', _extends({}, props, { type: 'checkbox', checked: value == 1 }));
};
var FormCheckbox = function FormCheckbox(props) {
  var _props$getValue3 = props.getValue,
      getValue = _props$getValue3 === undefined ? function (e) {
    return e.target.checked;
  } : _props$getValue3,
      fieldProps = _objectWithoutProperties(props, ['getValue']);

  return React.createElement(BaseField, _extends({}, fieldProps, { Control: Checkbox,
    getValue: getValue,
    onFieldChange: function onFieldChange() {
      props.onFieldChange.apply(props, arguments);
      props.onFieldBlur.apply(props, arguments);
    } }));
};
var FormAutosuggestTags = function FormAutosuggestTags(props) {
  return React.createElement(BaseField, _extends({}, props, { Control: AutosuggestTagsInput }));
};

var Form = function (_Component2) {
  _inherits(Form, _Component2);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this2 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this2._errors = {};
    _this2.state = {
      values: _this2.getInitialValues(_this2.props),
      errors: _extends({}, _this2._errors)
    };

    _.bindAll(_this2, ['submit', 'handleSubmit', 'handleFieldChange', 'handleFieldBlur', 'handleFieldFocus', 'reset', 'handleReset', 'validateField']);
    return _this2;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var initialValidate = this.props.initialValidate;


      if (initialValidate) {
        this.validate();
      }
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(props) {
      var _this3 = this;

      var values = this.getInitialValues(props);
      var errors = this._errors;
      var update = false;
      _.each(values, function (value, field) {
        if (value !== _this3.state.values[field]) {
          update = true;
          if (_this3.state.errors[field]) {
            errors[field] = null;
          }
        }
      });
      if (update) {
        this.setState({
          values: values,
          errors: _extends({}, this.state.errors, errors)
        });
      }
    }
  }, {
    key: '_forEachField',
    value: function _forEachField(children, cb) {
      var _this4 = this;

      React.Children.forEach(children, function (child) {
        if (_.isObject(child)) {
          if (_this4.isField(child)) {
            cb(child);
          } else {
            _this4._forEachField(child.props.children, cb);
          }
        }
      });
    }
  }, {
    key: 'getInitialValues',
    value: function getInitialValues(props) {
      var values = {};
      this._forEachField(props.children, function (child) {
        values[child.props.field] = _.get(child.props, 'value', child.props.defaultValue);
      });
      return _.assign(values, props.object);
    }
  }, {
    key: 'isField',
    value: function isField(element) {
      return !!_.get(element, 'props.field');
    }
  }, {
    key: '_clone',
    value: function _clone(children) {
      var _this5 = this;

      var values = this.state.values;
      var result = React.Children.map(children, function (child) {
        if (!_.isObject(child)) {
          return child;
        } else if (_this5.isField(child)) {
          var childProps = {
            error: _this5.state.errors[child.props.field],
            onFieldChange: _this5.handleFieldChange,
            onFieldBlur: _this5.handleFieldBlur,
            onFieldFocus: _this5.handleFieldFocus
          };
          if (values.hasOwnProperty(child.props.field)) {
            childProps.value = _.isFunction(child.props.setValue) ? child.props.setValue(values[child.props.field]) : values[child.props.field];
            if (child.props.checked) {
              childProps.checked = child.props.checked;
            }
          }
          child = React.cloneElement(child, childProps);
          _this5._fields[child.props.field] = child;
          return child;
        } else {
          return React.cloneElement(child, {
            children: _this5._clone(child.props.children)
          });
        }
      });
      if (result && 1 === result.length) {
        return result[0];
      }
      return result;
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var onSubmit = this.props.onSubmit;


      if (e && e.preventDefault) {
        e.preventDefault();
      }

      var errors = this.validate();
      this.setState({ errors: errors });

      if (_.isFunction(onSubmit)) {
        onSubmit(this.state.values, errors);
      }
    }
  }, {
    key: 'handleReset',
    value: function handleReset(e) {
      var onReset = this.props.onReset;


      if (e && e.preventDefault) {
        e.preventDefault();
      }

      var values = this.getInitialValues(this.props);
      this.setState({
        values: values,
        errors: {}
      });
      this._errors = {};

      if (_.isFunction(onReset)) {
        onReset();
      }
    }
  }, {
    key: 'handleFieldChange',
    value: function handleFieldChange(value, fieldProps) {
      var field = fieldProps.field;
      var values = this.state.values;
      if (values[field] !== value) {
        this.setState({
          values: _extends({}, values, _defineProperty({}, field, value))
        });
      }
      this.cleanFieldError(field);
      this.props.onFieldChange(value, field);
    }
  }, {
    key: 'handleFieldBlur',
    value: function handleFieldBlur(value, fieldProps) {
      var field = fieldProps.field,
          validate = fieldProps.validate;

      var error = _validate(value, fieldProps, validate);

      if (!_.isEqual(error, this.state.errors[field])) {
        this._errors[field] = error;
        this.setState({ errors: _extends({}, this.state.errors, this._errors) });
      }
      this.props.onFieldBlur(value, field, error);
    }
  }, {
    key: 'handleFieldFocus',
    value: function handleFieldFocus(value, fieldProps) {
      this.cleanFieldError(fieldProps.field);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      this._fields = {};
      return this._clone(children);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props8 = this.props,
          _props8$className = _props8.className,
          className = _props8$className === undefined ? '' : _props8$className,
          children = _props8.children,
          FormContainer = _props8.FormContainer,
          onFieldChange = _props8.onFieldChange,
          onFieldBlur = _props8.onFieldBlur,
          props = _objectWithoutProperties(_props8, ['className', 'children', 'FormContainer', 'onFieldChange', 'onFieldBlur']);

      return React.createElement(
        FormContainer,
        _extends({}, props, {
          className: 'form ' + className,
          onSubmit: this.handleSubmit
        }),
        this.renderChildren(children)
      );
    }

    /*************************** Public Method ***************************/

  }, {
    key: 'submit',
    value: function submit() {
      this.handleSubmit();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.handleReset();
    }
  }, {
    key: 'cleanFieldError',
    value: function cleanFieldError(field) {
      var errors = _extends({}, this.state.errors, this._errors);
      var error = errors[field];
      if (error) {
        this._errors[field] = null;
        this.setState({
          errors: _extends({}, errors, _defineProperty({}, field, null))
        });
      }
    }
  }, {
    key: 'validateField',
    value: function validateField(field) {
      var _state = this.state,
          values = _state.values,
          errors = _state.errors;

      var fieldControl = this._fields[field];
      if (!fieldControl) {
        return;
      }
      var props = fieldControl.props;
      var error = _validate(values[field], props, props.validate);
      if (error !== errors[field]) {
        this._errors[field] = error;
        this.setState({
          errors: _extends({}, errors, this._errors)
        });
      }
    }
  }, {
    key: 'validate',
    value: function validate() {
      var values = this.state.values;
      var errors = this._errors = {};

      _.each(this._fields, function (child, field) {
        var props = child.props;
        errors[field] = _validate(values[field], props, props.validate);
      });
      /* multi fields validate can goes here */
      if (!_.isEqual(errors, this.state.errors)) {
        this.setState({ errors: errors });
      }
      return errors;
    }
  }]);

  return Form;
}(Component);

Form.propTypes = {
  onFieldChange: PropTypes.func,
  onFieldBlur: PropTypes.func
};

Form.defaultProps = {
  FormContainer: 'form',
  onFieldChange: function onFieldChange(value, field) {},
  onFieldBlur: function onFieldBlur(value, field) {}
};

Form.BaseField = BaseField;
Form.TextInput = FormTextInput;
Form.Textarea = FormTextarea;
Form.MentionTextarea = FormMentionTextarea;
Form.Select = FormSelect;
Form.Radio = FormRadio;
Form.DateInput = FormDateInput;
Form.Checkbox = FormCheckbox;
Form.AutosuggestTags = FormAutosuggestTags;

export default Form;