import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Button, Tab, Tabs} from 'react-toolbox';

import Stream from './Stream';
import UserLikes from './UserLikes';
import SimilarUsers from './SimilarUsers';

import {followUser, unfollowUser} from '../actions/EntitiesAUDActions';

import styles from '../../assets/styles/profile.css';


const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.id],
  token: state.session.token,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  follow: (user, token) => () => dispatch(followUser(user, token)),
  unfollow: (user, token) => () => dispatch(unfollowUser(user, token)),
});


const User = props => (
  <div className={styles.userInfo}>
    <Link to={`/profile/${props.user.id}`}>
      <img src={props.user.avatar_url} alt='avatar' className={styles.avatar} />
    </Link>
    <div className={styles.info}>
      <Link to={`/profile/${props.user.id}`}>
        <div className={styles.name}>{props.user.name}</div>
      </Link>
      <div className={styles.followersCount}>{props.user.followers_count} followers</div>
    </div>
    {props.token && (props.user.id !== props.currentUser.id) && (props.user.is_followed ?
      <Button onClick={props.unfollow(props.user, props.token)} className={styles.followedBtn} icon='done' label='followed' raised primary /> :
      <Button onClick={props.follow(props.user, props.token)} className={styles.followBtn} icon='add' label='follow' raised primary />
    )}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(User);
