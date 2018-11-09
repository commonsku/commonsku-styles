import _ from 'lodash'
import React, { Component } from 'react'
import BaseSelect, { Creatable, Async } from 'react-select'

const LARGE_DROPDOWN_CUTOFF = 0;

class Select extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value, 
      error: this.props.error
    };
  }

  componentWillReceiveProps(nextProps) {
   this.setState({ value: nextProps.value, error: nextProps.error });
  }

  getValue() {
    return this.refs.select.value;
  }

  render() {
    const { 
      id, style, value, defaultValue, options, disabled, error, gallery, className,
      change = _.identity,
      onChange = _.identity, 
      clearable = clearable ? clearable : false,
      searchable = this.props.options ? this.props.options.length > LARGE_DROPDOWN_CUTOFF : true,
      placeholder,
      creatable = false,
      async = false
    } = this.props;

    const width = Math.max.apply(null, (options || []).map(o => (o.value || []).length)) || 0;
    const isLong = options ? options.length > LARGE_DROPDOWN_CUTOFF : true;

    const menuStyle = Object.assign(isLong ? { maxHeight: '300px' } : {}, this.props.menuStyle);
    const menuContainerStyle = Object.assign(isLong ? { maxHeight: '302px' } : {}, { minWidth: Math.min(500, width * 12) + 'px', zIndex: 2 }, this.props.menuContainerStyle);

    const errorStyle = {
      border: 'solid red'
    }

    const galleryStyle = {
      background: '#81828c',
      color: '#FFF',
      height: '50px'
    }

    let select_attributes = { 
      id, wrapperStyle: style, clearable, searchable, className,
      menuStyle, menuContainerStyle, placeholder 
    };
    if (this.state.value) {
      select_attributes.value = this.state.value;
    }
    if (defaultValue) {
      select_attributes.defaultValue = defaultValue;
    }
    if (disabled) {
      select_attributes.disabled = true;
    }
    if (this.state.error) {
      select_attributes.style = _.merge(style || {}, errorStyle);
    }
    if (gallery) {
      select_attributes.style = _.merge(style || {}, galleryStyle);
    }
    const stand_in = {
      label: placeholder,
      value: '',
    };

    if (creatable) {
      const {
        isOptionUnique,
        isValidNewOption,
        newOptionCreator,
        onNewOptionClick,
        shouldKeyDownEventCreateNewOption,
        promptTextCreator
      } = this.props;
      return (
        <Creatable
          ref="select"
          {...select_attributes}
          options={options.map(o => ({ value: o.key, label: o.value }))}
          onChange={(e) => {
            onChange(e ? e : stand_in);
            return change(e ? e.value : stand_in.value);
          }}
          isOptionUnique={isOptionUnique}
          isValidNewOption={isValidNewOption}
          newOptionCreator={newOptionCreator}
          onNewOptionClick={onNewOptionClick}
          shouldKeyDownEventCreateNewOption={shouldKeyDownEventCreateNewOption}
          promptTextCreator={promptTextCreator}
        />
      );
    } else if (async) {
      const {
        loadOptions,
        filterOptions
      } = this.props;
      return (
        <Async
          ref="select"
          {...select_attributes}
          loadOptions={loadOptions}
          filterOptions={filterOptions}
          onChange={(e) => {
            onChange(e ? e : stand_in);
            return change(e ? e.value : stand_in.value);
          }}
        />
      );
    } else {
      return (
        <BaseSelect
          ref="select"
          {...select_attributes}
          options={options.map(o => ({ value: o.key, label: o.value }))}
          onChange={(e) => {
            onChange(e ? e : stand_in);
            return change(e ? e.value : stand_in.value);
          }}
        />
      );
    }
  }
}

export default Select;
