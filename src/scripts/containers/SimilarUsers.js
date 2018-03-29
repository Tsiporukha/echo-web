import React, {Component} from 'react';
import {connect} from 'react-redux';

import User from './User';

import {addUsers, followUser, unfollowUser} from '../actions/EntitiesAUDActions';

import {reduceToObject} from '../lib/base';
import {getSimilar} from '../lib/ebApi/users';

import styles from '../../assets/styles/profile.css';


const mapStateToProps = (state, ownProps) => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  addUsers: users => dispatch(addUsers(reduceToObject(users))),
  follow: (user, token) => dispatch(followUser(user, token)),
  unfollow: (user, token) => dispatch(unfollowUser(user, token)),
});


const initialState = {
  users: [],
};

class SimilarUsers extends Component {
  initialLoad = (userId = this.props.userId, token = this.props.token) => getSimilar(userId, token)
    .then(({results}) => Promise.resolve(this.props.addUsers(results)).then(_ => this.setState({users: results.map(usr => usr.id)})));

  reinitOnUserChange = (nextProps, props) => nextProps.userId !== props.userId ?
    this.setState(initialState, _ => this.initialLoad(nextProps.userId, nextProps.token)) : false;


  state = {...initialState};

  componentDidMount = () => this.initialLoad(this.props.userId, this.props.token);

  componentWillReceiveProps = nextProps => this.reinitOnUserChange(nextProps, this.props);

  render() {
    return (
      !!this.state.users.length &&
      <div className={styles.similarUsers}>
        <div className={styles.head}>SIMILAR USERS</div>
        {this.state.users.map(userId => <User key={userId} id={userId} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarUsers);
