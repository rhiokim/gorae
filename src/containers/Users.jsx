import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {whyDidYouUpdate} from 'why-did-you-update';

import * as UserActions from '../actions/user';
import UserList from '../components/users/UserList';

// if (process.env.NODE_ENV !== 'production') {
//   whyDidYouUpdate(React);
// }

class Users extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  render() {
    const {users} = this.props;
    return (
      <UserList users={users}/>
    );
  }
}

const mapStateToProps = state => {
  return {users: state.userReducer.users};
};

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
