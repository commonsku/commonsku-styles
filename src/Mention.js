import _ from 'lodash'
import React, { Component } from 'react'

export default class Mention extends Component {

  constructor(props) {
    super(props);
    this.state = {
      indexed_user_id: this.getIndexedUserId(this.props),
      username: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ 
      indexed_user_id: this.getIndexedUserId(nextProps) 
    });
  }

  getIndexedUserId(props) {
    const {
      mention_index, mention_users = [],
    } = props;
    const orig = _.get(this.state, 'indexed_user_id', '');
    return _.get(mention_users, mention_index + '.user_id', orig);
  }

  handleClick(e, username) {
    this.props.handleAddTargetToText(username);
  }

  render() {
    const { mention_users, mention_index, } = this.props;
    const chosen = {
      'backgroundColor' : '#EDF2F4'
    }
    return (
      <ul className="tag-results">
        {mention_users.map(u => 
          <li className="tag-user" key={u.user_id} 
            onClick={e => {
              e.preventDefault(); this.handleClick(this, u.mask); 
            }} 
            style={this.state.indexed_user_id == u.user_id ? chosen : null}>                   
            <img src={u.user_image_paths && u.user_image_paths.original.match(/https?:\/\//) 
              ? `${u.user_image_paths.original}` 
                : u.user_image_paths && !u.user_image_paths.original.match(/https?:\/\//) 
                  ? `/${u.user_image_paths.original}` 
                    : '/images/404.png'} 
              width="48" height="48" />      
            <a href="#" className="tag-select">
              {u.contact_first_name} {u.contact_last_name}
              <br />
              <span className="username">@{u.mask}</span>
            </a>  
          </li>
        )}
      </ul>
    );
  } 
}
