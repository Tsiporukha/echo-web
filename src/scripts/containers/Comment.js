import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import fromNow from 'moment-from-now';

import styles from '../../assets/styles/comment.css';

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.id],
  user: state.users[state.comments[ownProps.id].user],
});

const mapDispatchToProps = dispatch => ({
});


const Comment = props => (
  <div className={styles.root}>
    <Link to={`/profile/${props.user.id}`}>
      <img src={props.user.avatar_url} alt='avatar' className={styles.avatar} />
    </Link>
    <div className={styles.info}>
      <div>
        <Link to={`/profile/${props.user.id}`}>
          <span className={styles.name}>{props.user.name}</span>
        </Link>
        <span className={styles.time}>{fromNow(new Date(props.comment.created_at))}</span>
      </div>
      <div className={styles.commentBody}>{props.comment.body}</div>
    </div>
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Comment);
