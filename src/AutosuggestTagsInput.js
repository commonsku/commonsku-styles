import React, { Component } from 'react'

import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest'

class AutosuggestTagsInput extends Component {

  renderInputFunction({
    tags, shouldRenderSuggestions, getSuggestionValue, renderSuggestion,
  }) {
    return (props) => {
      const inputValue = (props.value || '').trim().toLowerCase();
      let suggestions = _.filter(tags, (tag) => {
        const value = getSuggestionValue(tag)
        return (value || '').toLowerCase().indexOf(inputValue) !== -1;
      });
      const onSuggestionsFetchRequested = ({ value }) => {
      };
      const onSuggestionsClearRequested = () => {
      };
      return (
        <Autosuggest 
          ref={(autosuggest) => {this[props.ref] = autosuggest;}}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          shouldRenderSuggestions={shouldRenderSuggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={props}
          onSuggestionSelected={(e, {suggestion}) => {
            props.addTag(getSuggestionValue(suggestion));
          }}
          focusInputOnSuggestionClick={false}
        />
      );
    };
  }

  render() {
    const {
      shouldRenderSuggestions = (value) => (value || '').length >= 0,
      getSuggestionValue = (suggestion) => (suggestion.label),
      renderSuggestion = (sg) => <span>{getSuggestionValue(sg)}</span>,
      tags,
      placeholder,
      ...props
    } = this.props;

    const renderInput = this.renderInputFunction({
      shouldRenderSuggestions, getSuggestionValue, renderSuggestion, tags
    });

    return (
      <TagsInput {...props} renderInput={renderInput} inputProps={{ placeholder: placeholder }}/>
    );
  }
}

export default AutosuggestTagsInput;
