import React, {Component} from 'react';
import {connect} from 'react-redux';

import moment from 'moment';

import styles from '../../assets/styles/comment.css';

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.id],
  user: state.users[state.comments[ownProps.id].user],
});

const mapDispatchToProps = dispatch => ({
});


const Comment = props => (
  <div className={styles.root}>
    <img src={props.user.avatar_url} alt='avatar' className={styles.avatar} />
    <div className={styles.info}>
      <div>
        <span className={styles.name}>{props.user.name}</span>
        <span className={styles.time}>{moment(props.comment.created_at).fromNow()}</span>
      </div>
      <div className={styles.commentBody}>{props.comment.body}</div>
    </div>
  </div>
)


export default connect(mapStateToProps, mapDispatchToProps)(Comment);
