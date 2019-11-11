import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextInput from './TextInput'
import Textarea from './TextArea'
import MentionTextarea from './MentionTextarea'
import Select from './Select'
import DateInput from './DateInput'
import AutosuggestTagsInput from './AutosuggestTagsInput'

let uniqueId = 0;
const ID_PREFIX = '___FORM_LABEL___';

const _validate = (value, props, validate) => {
  let error = null;
  if ((props.required && _.isEmpty(value)) || (props.options && !props.options.filter(o => o.key === value).length)) {
    error = {
      message: (props.label || props.placeholder) + ' is required',
    };
  }
  return _.isFunction(validate) ? validate(value, props, error) : error;
}

class BaseField extends Component {
  constructor(props) {
    super(props);

    this.id = ++uniqueId;

    _.bindAll(this, ['handleChange', 'handleBlur', 'handleFocus']); 
  }

  getValue(e) {
    const getValue = this.props.getValue;
    if (_.isFunction(getValue)) {
      return getValue(e);
    }
    return _.get(e, 'target.value', e);
  }

  handleChange(e) {
    const {
      onFieldChange,
      onChange,
    } = this.props;
    let value = this.getValue(e);
    if(this.props.tags) {
      value = _.uniq(value)
    }

    onFieldChange(value, this.props);
    onChange(value);
  }

  handleBlur(e) {
    const {
      onFieldBlur,
      onBlur,
    } = this.props;
    const value = this.getValue(e);

    onFieldBlur(value, this.props);
    onBlur(value);
  }

  handleFocus(e) {
    const {
      onFieldFocus,
      onFocus,
    } = this.props;
    const value = this.getValue(e);

    onFieldFocus(value, this.props);
    onFocus(value);
  }

  renderLabel(params) {
    const noPaddingLeft = {
      paddingLeft: 0
    };
    const {
      label,
      helpText,
      labelClassName = params == 'radio' ? "small-12 medium-10 columns" : "small-12 medium-4 columns",
      renderLabel,
      labelStyle = { fontSize: 'initial' }
    } = this.props;

    if (_.isFunction(renderLabel)) {
      return renderLabel(label);
    }

    return <div className={labelClassName} style={params == 'radio' ? noPaddingLeft : null}>
      <label style={labelStyle} htmlFor={ID_PREFIX + this.id}>{label}</label>
      { helpText ? <div className="help-text">{helpText}</div> : null }
    </div>
  }

  renderControl(params) {
    const {
      Control,
      error,
      displayLabel,
      required,
      placeholder = this.props.required ? 'Required Field' : '',
      onFieldChange,
      onFieldFocus,
      onFieldBlur,
      children,
      controlClassName = params == 'radio' ? 'small-12 medium-2 columns' : 'small-12 medium-8 columns',
      containerStyle,
      prefix,
      ...props
    } = this.props;

    const controlProps = _.omit(props, [
      'validate', 'className', 'field', 'label', 'displayRadio', 'containerClassName', 'getValue', 'setValue']);

    return <div className={
      displayLabel ? controlClassName : this.getContainerClassName()
    } style={displayLabel ? {} : containerStyle}>
      {error ? <div className="field-error">{error.message}</div> : null}
      {prefix}
      <Control {...controlProps} 
        id={ID_PREFIX + this.id}
        placeholder={placeholder}
        onFocus={this.handleFocus} onChange={this.handleChange} 
        onBlur={this.handleBlur}>
        {children}
      </Control>
      {this.renderExtra()}
    </div> 
  }

  renderExtra() {
    return this.props.extra;
  }

  getContainerClassName() {
    const {
      error, className = '', containerClassName = 'field row'
    } = this.props;

    return containerClassName + (error ? ' has-error ' : '') + ' ' + className;
  }

  render() {
    const { containerStyle, displayLabel, displayRadio, rightHelpText } = this.props;
    return !displayLabel ? this.renderControl() :
      displayRadio ? 
      <div className={this.getContainerClassName()} style={containerStyle}>
        {this.renderControl('radio')}
        {this.renderLabel('radio')}
      </div>
      :
      <div className="row">
        <div className={rightHelpText ? 'field small-12 medium-9 columns' : this.getContainerClassName()} style={containerStyle}>
          {this.renderLabel()}
          {this.renderControl()}
        </div>
        {rightHelpText ?
          <div className="small-12 medium-3 columns">
            <p style={{ backgroundColor: '#FFF3D9', padding: '10px', borderRadius: '10px' }}>{rightHelpText}</p>
          </div>
        : null}
      </div>
  }
}

BaseField.defaultProps = {
  onChange: _.identity,
  onBlur: _.identity,
  onFocus: _.identity,
  displayLabel: true,
  displayRadio: false
}


const FormTextInput = (props) => <BaseField {...props} Control={TextInput}/>;
const FormTextarea = (props) => <BaseField {...props} Control={Textarea}/>;
export const createFormSelect = Control => (props) => {
  const {
    getValue = (e) => {
      return _.get(e, 'target.value', _.get(e, 'value', e));
    },
    ...fieldProps
  } = props;
  return <BaseField {...fieldProps} Control={Control} getValue={getValue} onFieldChange={(...args) => {
    props.onFieldChange(...args);
    props.onFieldBlur(...args);
  }}/>;
};
const FormMentionTextarea = (props) => <BaseField {...props} Control={MentionTextarea}/>;
const FormSelect = createFormSelect(Select);
const Radio = ({
  value,
  ...props,
}) => {
  return <input {...props} type="radio" checked={props.checked}/>;
};
const FormRadio = (props) => {
  const {
    getValue = (e) => {return e.target.checked;},
    ...fieldProps
  } = props;
  return <BaseField {...fieldProps} Control={Radio}
    getValue={getValue}
    onFieldChange={(...args) => {
      props.onFieldChange(...args);
      props.onFieldBlur(...args);
    }}/>
};
const FormDateInput = (props) =>  <BaseField {...props} Control={DateInput}/>;

const Checkbox = ({
  value,
  ...props,
}) => {
  return <input {...props} type="checkbox" checked={value == 1}/>;
};
const FormCheckbox = (props) => {
  const {
    getValue = (e) => {return e.target.checked;},
    ...fieldProps
  } = props;
  return <BaseField {...fieldProps} Control={Checkbox}
    getValue={getValue}
    onFieldChange={(...args) => {
      props.onFieldChange(...args);
      props.onFieldBlur(...args);
    }}/>
};
const FormAutosuggestTags = (props) => <BaseField {...props} Control={AutosuggestTagsInput}/>;

class Form extends Component {

  constructor(props) {
    super(props);

    this._errors = {};
    this.state = {
      values: this.getInitialValues(this.props), 
      errors: {
        ...this._errors,
      },
    };

    _.bindAll(this, [
      'submit', 'handleSubmit', 'handleFieldChange', 'handleFieldBlur', 
      'handleFieldFocus', 'reset', 'handleReset', 'validateField',
    ]);
  }

  componentDidMount() {
    const { initialValidate } = this.props

    if(initialValidate) {
      this.validate()
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    const values = this.getInitialValues(props);
    const errors = this._errors;
    let update = false;
    _.each(values, (value, field) => {
      if (value !== this.state.values[field]) {
        update = true;
        if (this.state.errors[field]) {
          errors[field] = null;
        }
      }
    });
    if (update) {
      this.setState({
        values, 
        errors: {
          ...this.state.errors,
          ...errors,
        },
      });
    }
  }

  _forEachField(children, cb) {
    React.Children.forEach(children, (child) => {
      if (_.isObject(child)) {
        if (this.isField(child)) {
          cb(child);
        } else {
          this._forEachField(child.props.children, cb);
        }
      }
    });
  }

  getInitialValues(props) {
    const values = {};
    this._forEachField(props.children, (child) => {
      values[child.props.field] = _.get(
        child.props, 'value', child.props.defaultValue);
    });
    return _.assign(values, props.object);
  }

  isField(element) {
    return !!_.get(element, 'props.field');
  }

  _clone(children) {
    const values = this.state.values;
    const result = React.Children.map(children, (child) => {
      if (!_.isObject(child)) {
        return child;
      } else if (this.isField(child)){
        const childProps = { 
          error: this.state.errors[child.props.field],
          onFieldChange: this.handleFieldChange, 
          onFieldBlur: this.handleFieldBlur, 
          onFieldFocus: this.handleFieldFocus, 
        };
        if (values.hasOwnProperty(child.props.field)) {
          childProps.value = _.isFunction(child.props.setValue) ?
            child.props.setValue(values[child.props.field]) :
            values[child.props.field];
          if (child.props.checked) {
            childProps.checked = child.props.checked;
          }
        }
        child = React.cloneElement(child, childProps);
        this._fields[child.props.field] = child;
        return child;
      } else {
        return React.cloneElement(child, { 
          children: this._clone(child.props.children),
        });
      }
    });
    if (result && 1 === result.length) {
      return result[0];
    }
    return result;
  }

  handleSubmit(e) {
    const {
      onSubmit,
    } = this.props;

    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const errors = this.validate();
    this.setState({errors,});

    if (_.isFunction(onSubmit)) {
      onSubmit(this.state.values, errors);
    }
  }

  handleReset(e) {
    const {
      onReset
    } = this.props;

    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const values = this.getInitialValues(this.props);
    this.setState({
      values, 
      errors: {}
    });
    this._errors = {};

    if (_.isFunction(onReset)) {
      onReset();
    }
  }

  handleFieldChange(value, fieldProps) {
    const field = fieldProps.field;
    const values = this.state.values;
    if (values[field] !== value) {
      this.setState({
        values: {
          ...values,
          [field]: value,
        }
      });
    }
    this.cleanFieldError(field);
    this.props.onFieldChange(value, field);
  }

  handleFieldBlur(value, fieldProps) {
    const {
      field, 
      validate,
    } = fieldProps;
    const error = _validate(value, fieldProps, validate);

    if (!_.isEqual(error, this.state.errors[field])) {
      this._errors[field] = error;
      this.setState({errors: {
        ...this.state.errors,
        ...this._errors,
      }});
    }
    this.props.onFieldBlur(value, field, error);
  }

  handleFieldFocus(value, fieldProps) {
    this.cleanFieldError(fieldProps.field);
  }

  renderChildren(children) {
    this._fields = {};
    return this._clone(children);
  }

  render() {
    const {
      className = '',
      children,
      FormContainer,
      onFieldChange,
      onFieldBlur,
      ...props
    } = this.props;

    return <FormContainer {...props} 
      className={'form ' + className}
      onSubmit={this.handleSubmit}
    >
      {this.renderChildren(children)}
    </FormContainer>
  }

  /*************************** Public Method ***************************/
  submit() {
    this.handleSubmit();
  }

  reset() {
    this.handleReset();
  }

  cleanFieldError(field) {
    const errors = {
      ...this.state.errors,
      ...this._errors
    };
    const error = errors[field];
    if (error) {
      this._errors[field] = null;
      this.setState({
        errors: {
          ...errors,
          [field]: null,
        },
      })
    }
  }

  validateField(field) {
    const { values, errors } = this.state;
    const fieldControl = this._fields[field];
    if (!fieldControl) {
      return;
    }
    const props = fieldControl.props;
    const error = _validate(values[field], props, props.validate)
    if (error !== errors[field]) {
      this._errors[field] = error;
      this.setState({
        errors: {
          ...errors,
          ...this._errors
        },
      });
    }
  }

  validate() {
    const values = this.state.values;
    const errors = this._errors = {};

    _.each(this._fields, (child, field) => {
      const props = child.props;
      errors[field] = _validate(values[field], props, props.validate);
    })
    /* multi fields validate can goes here */
    if (!_.isEqual(errors, this.state.errors)) {
      this.setState({errors});
    }
    return errors;
  }
}

Form.propTypes = {
  onFieldChange: PropTypes.func,
  onFieldBlur: PropTypes.func,
};

Form.defaultProps = {
  FormContainer: 'form',
  onFieldChange: (value, field) => {},
  onFieldBlur: (value, field) => {},
}

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
