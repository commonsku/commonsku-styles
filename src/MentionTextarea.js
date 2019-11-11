import _ from 'lodash'
import React, { Component } from 'react'

import TextArea from './TextArea'
import Mention from './Mention'

export default class MentionTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      mention_users: this.props.mention_users,
      show_mentions: false,
      mention_index: -1,
    };

    _.bindAll(this, [
      'handleChange', 'handleKeyDown', 'handleKeyPress',
      'handleAddTargetToText', 'onTextareaRef'
    ]);
  }

  UNSAFE_componentWillReceiveProps({value = '', mention_users = []}) {
    const state = {value};
    if (!_.isEqual(mention_users, this.props.mention_users)) {
      state.mention_users = mention_users;
    }
    this.setState(state);
  }

  _closeMentions() {
    this.setState({
      show_mentions: false,
      mention_index: -1,
    });
  }

  /* get index between cursor and last @ before cursor */
  _getLastAtIndexRange(value) {
    const cursor = _.get(this, 'textareaDOM.selectionStart', value.length);
    const indexOfAt = value.slice(0, cursor).lastIndexOf('@');
    return [indexOfAt, cursor];
  }

  handleAddTargetToText(target) {
    let value = this.state.value || '';
    const [indexOfAt, cursor] = this._getLastAtIndexRange(value);

    if (indexOfAt !== -1) {
      value = [
        value.slice(0, indexOfAt), 
        '@' + target + ' ',
        value.slice(cursor, value.length),
      ].join('');
    }    
    if (value !== this.state.value) {
      this.setState({ 
        value,
      }, () => {
        if (this.textareaDOM && this.textareaDOM.setSelectionRange) {
          // plus length of @ target and space
          const newCursor = indexOfAt + target.length + 2; 
          this.textareaDOM.setSelectionRange(newCursor, newCursor);
        }
      });
      this.props.onChange(value);
    }
    this._closeMentions();
  } 

  handleKeyPress(e) {
    // ios return exact same KeyDown event on 2 and @
    // add this KeyPress hack to make ios response on @
    if (e.key === '@' && !this.state.show_mentions) {
      this.setState({show_mentions: true});
    }
  }

  handleKeyDown(e) {
    const {
      show_mentions,
      mention_users = [],
      mention_index,
    } = this.state;

    switch (e.keyCode) {
      case 50:  // @
        if (e.key === '@') { // @ is shift + 2, so keyCode 50 is not enough
          this.setState({ 
            show_mentions: true,
          });
        }
        return;
      case 27: // escape
        e.preventDefault();
        if (show_mentions) {
          this.setState({
            show_mentions: false,
          });
        } else {
          this.setState({
            show_mentions: true,
            mention_users: this.filterMentionUsers(this.state.value || ''),
          });
        }
        return;
    }

    if (show_mentions) {
      const mention_user = mention_users[mention_index];
      switch(e.keyCode) {
        case 13: // Enter
        case 32: // space
          if (mention_users.length > 0) {
            e.preventDefault();
          }
          if (!mention_user) {
            this.setState({
              mention_index: 0,
            });
          } else {
            this.handleAddTargetToText(mention_user.mask);
          }
          return;
        case 38: // up arrow
          e.preventDefault();
          this.setState({ 
            mention_index: mention_index > 0 ? mention_index - 1 : 0
          });
          return;
        case 40: // down arrow
          e.preventDefault();
          this.setState({ 
            mention_index: mention_index < mention_users.length - 1 ? 
              mention_index + 1 : mention_index
          });
          return;
      }
    }
  }

  handleChange(e) {
    const value = e.target.value || '';
    const {
      show_mentions,
    } = this.state;

    if (show_mentions) {
      const [indexOfAt, cursor] = this._getLastAtIndexRange(value);
      if (indexOfAt !== -1) {
        const target = value.slice(indexOfAt + 1, cursor);
        this.setState({
          mention_users: this.filterMentionUsers(target),
        });
      } else {
        this._closeMentions();
      }
    }
    this.setState({
      value,
    });
    this.props.onChange(value);
  }

  filterMentionUsers(value) {
    return _.filter(this.props.mention_users, u => {
      return u.contact_first_name.concat(u.contact_last_name)
        .toLowerCase().indexOf(value.toLowerCase()) > -1
    });
  }

  onTextareaRef(textarea) {
    this.textareaDOM = textarea ? textarea.getTextareaDOMNode() : null;
  }

  render() {
    const {
      value,
      show_mentions,
      mention_index,
      mention_users,
    } = this.state;
    
    return <div className="mention-textarea-container">
      <TextArea {...this.props} 
        value={value}
        ref={this.onTextareaRef} 
        onChange={this.handleChange} 
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
      ></TextArea>
      {show_mentions ? 
        <Mention handleAddTargetToText={this.handleAddTargetToText} 
          mention_users={mention_users} mention_index={mention_index}/> : null}
    </div>;
  }
}

MentionTextarea.defaultProps = {
  value: '',
  onChange: _.identity,
};
