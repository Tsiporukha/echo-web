import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from 'react-toolbox/lib/button';

import {followUser, unfollowUser} from '../actions/EntitiesAUDActions';
import {clearSession} from '../actions/SessionActions';

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

  clearSession: () => dispatch(clearSession()),
});


const getFollowersLabel = count => `${count} follower${count % 10 === 1 ? '' : 's'}`;

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
        {/* {props.currentUser.id === props.user.id &&
          <Link className={styles.editIconArea} to='/settings'>
            <i className={styles.editIcon}>mode_edit</i>
          </Link>
        } */}
      </div>
      <div className={styles.followersCount}>{getFollowersLabel(props.user.followers_count)}</div>
    </div>
    {props.token && !!props.user.id && (props.user.id !== props.currentUser.id) && (props.user.is_followed ?
      <Button onClick={props.unfollow(props.user, props.token)} className={styles.followedBtn} icon='done' label='followed' raised primary /> :
      <Button onClick={props.follow(props.user, props.token)} className={styles.followBtn} icon='add' label='follow' raised primary />
    )}
    {props.token && (props.user.id === props.currentUser.id) &&
      <Button icon='exit_to_app' className={styles.logoutBtn} raised onClick={props.clearSession}>Log out</Button>}
  </div>
);

User.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  token: PropTypes.string,

  follow: PropTypes.func,
  unfollow: PropTypes.func,
  clearSession: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(User);
