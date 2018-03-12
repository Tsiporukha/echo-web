import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import fromNow from 'moment-from-now';

import styles from '../../assets/styles/comment.css';

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.id],
  user: state.users[state.comments[ownProps.id].user],
});


const Comment = props => (
  <div className={styles.root}>
    <Link className={styles.avatar} to={`/profile/${props.user.id}`}>
      <img src={props.user.avatar_url} alt='avatar' />
    </Link>
    <div className={styles.info}>
      <div>
        <Link className={styles.name} to={`/profile/${props.user.id}`}>
          {props.user.name}
        </Link>
        <span className={styles.time}>{fromNow(new Date(props.comment.created_at))}</span>
      </div>
      <div className={styles.commentBody}>{props.comment.body}</div>
    </div>
  </div>
);

Comment.propTypes = {
  user: PropTypes.object,
  comment: PropTypes.object,
};


export default connect(mapStateToProps)(Comment);
