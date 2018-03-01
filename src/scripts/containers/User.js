import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Button} from 'react-toolbox';

import {followUser, unfollowUser} from '../actions/EntitiesAUDActions';

import styles from '../../assets/styles/user.css';

const userPlaceholder = {
  id: 0,
  name: '-//-',
  followers_count: 0,
};

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.id] || userPlaceholder,
  token: state.session.token,
  currentUser: state.session.user || {},
});

const mapDispatchToProps = dispatch => ({
  follow: (user, token) => () => dispatch(followUser(user, token)),
  unfollow: (user, token) => () => dispatch(unfollowUser(user, token)),
});


const User = props => (
  <div className={styles.root}>
    <Link to={`/profile/${props.user.id}`}>
      <img src={props.user.avatar_url} alt='avatar' className={styles.avatar} />
    </Link>
    <div className={styles.info}>
      <div className={styles.nameArea}>
        <Link to={`/profile/${props.user.id}`}>
          <span className={styles.name}>{props.user.name}</span>
        </Link>
        {props.currentUser.id === props.user.id &&
          <Link className={styles.editIconArea} to='/profile/edit'>
            <i className={styles.editIcon}>mode_edit</i>
          </Link>
        }
      </div>
      <div className={styles.followersCount}>{props.user.followers_count} followers</div>
    </div>
    {props.token && !!props.user.id && (props.user.id !== props.currentUser.id) && (props.user.is_followed ?
      <Button onClick={props.unfollow(props.user, props.token)} className={styles.followedBtn} icon='done' label='followed' raised primary /> :
      <Button onClick={props.follow(props.user, props.token)} className={styles.followBtn} icon='add' label='follow' raised primary />
    )}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(User);
